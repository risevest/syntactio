/**
 * oxlint-compatible rewrite of eslint-plugin-react-native rules.
 *
 * Uses oxlint's createOnce API for better performance.
 * The original plugin's Components.detect() wrapper uses context.getScope()
 * (ESLint v8 API) which crashes under oxlint's JS Plugin API.
 *
 * Rules reimplemented:
 *   - react-native/no-unused-styles
 *   - react-native/no-inline-styles
 *   - react-native/no-color-literals
 */

interface StyleNode {
  type: string;
  key?: { name: string };
  value?: { type: string; value?: unknown };
}

interface StyleSheetsMap {
  [name: string]: StyleNode[];
}

class StyleSheets {
  private styleSheets: StyleSheetsMap = {};

  add(name: string, props: StyleNode[]): void {
    this.styleSheets[name] = props;
  }

  markAsUsed(ref: string): void {
    const [sheet, prop] = ref.split(".");
    if (this.styleSheets[sheet]) {
      this.styleSheets[sheet] = this.styleSheets[sheet].filter(
        (p) => p.key?.name !== prop
      );
    }
  }

  getUnusedReferences(): StyleSheetsMap {
    return this.styleSheets;
  }
}

const COLOR_RE = /color/i;
const HEX_RE = /^#([0-9a-f]{3,8})$/i;
const RGB_RE = /^(rgba?|hsla?)\s*\(/i;
const NAMED_COLORS = new Set([
  "aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque",
  "black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue",
  "chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan",
  "darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkgrey",
  "darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred",
  "darksalmon","darkseagreen","darkslateblue","darkslategray","darkslategrey",
  "darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dimgrey",
  "dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro",
  "ghostwhite","gold","goldenrod","gray","green","greenyellow","grey",
  "honeydew","hotpink","indianred","indigo","ivory","khaki","lavender",
  "lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan",
  "lightgoldenrodyellow","lightgray","lightgreen","lightgrey","lightpink",
  "lightsalmon","lightseagreen","lightskyblue","lightslategray","lightslategrey",
  "lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon",
  "mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen",
  "mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred",
  "midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy",
  "oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod",
  "palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru",
  "pink","plum","powderblue","purple","rebeccapurple","red","rosybrown",
  "royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna",
  "silver","skyblue","slateblue","slategray","slategrey","snow","springgreen",
  "steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat",
  "white","whitesmoke","yellow","yellowgreen",
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Node = any;

function isStyleAttribute(node: Node): boolean {
  return (
    node.type === "JSXAttribute" &&
    node.name?.name?.toLowerCase().includes("style")
  );
}

function isStyleSheetDeclaration(node: Node, settings: Record<string, unknown>): boolean {
  const names = (settings?.["react-native/style-sheet-object-names"] as string[]) ?? ["StyleSheet"];
  return (
    node?.type === "CallExpression" &&
    node.callee?.object &&
    names.includes(node.callee.object.name) &&
    node.callee.property?.name === "create"
  );
}

function getStyleSheetName(node: Node): string | undefined {
  return node?.parent?.id?.name;
}

function getStyleDeclarations(node: Node): Node[] {
  if (node?.type === "CallExpression" && node.arguments?.[0]?.properties) {
    return node.arguments[0].properties.filter((p: Node) => p.type === "Property");
  }
  return [];
}

function getPotentialStyleRef(node: Node): string | undefined {
  if (
    node?.object?.type === "Identifier" &&
    node.object.name &&
    node.property?.type === "Identifier" &&
    node.property.name &&
    node.parent.type !== "MemberExpression"
  ) {
    return `${node.object.name}.${node.property.name}`;
  }
}

function collectObjectExpressions(node: Node): { expression: Node; node: Node }[] {
  if (!node) return [];
  if (node.type === "JSXExpressionContainer" && node.expression) {
    return collectObjectExpressions(node.expression);
  }
  if (node.type === "ArrayExpression") {
    return node.elements.flatMap(collectObjectExpressions);
  }
  if (node.type === "ObjectExpression") {
    const hasLiteral = node.properties.some(
      (p: Node) =>
        p.value &&
        (p.value.type === "Literal" ||
          (p.value.type === "UnaryExpression" &&
            p.value.argument?.type === "Literal"))
    );
    return hasLiteral ? [{ expression: node, node }] : [];
  }
  return [];
}

function isColorValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return HEX_RE.test(value) || RGB_RE.test(value) || NAMED_COLORS.has(value.toLowerCase());
}

function collectColorLiterals(node: Node): { expression: Record<string, unknown>; node: Node }[] {
  if (!node) return [];
  if (
    node.type === "JSXExpressionContainer" &&
    node.expression?.type === "ArrayExpression"
  ) {
    return node.expression.elements.flatMap(collectColorLiterals);
  }
  if (node.type !== "ObjectExpression") return [];
  const found: Record<string, unknown> = {};
  let hasColor = false;
  for (const p of node.properties) {
    if (!p.key || !p.value) continue;
    const keyName: string | undefined = p.key.name ?? (p.key.value && String(p.key.value));
    if (!keyName || !COLOR_RE.test(keyName)) continue;
    if (p.value.type === "Literal" && isColorValue(p.value.value)) {
      found[keyName] = p.value.value;
      hasColor = true;
    }
  }
  return hasColor ? [{ expression: found, node }] : [];
}

// --- Plugin ---

export default {
  meta: {
    name: "react-native-compat",
  },
  rules: {
    "no-unused-styles": {
      createOnce(context: Node) {
        let sheets: StyleSheets;
        let refs: Set<string>;
        return {
          Program() {
            sheets = new StyleSheets();
            refs = new Set();
          },
          MemberExpression(node: Node) {
            const ref = getPotentialStyleRef(node);
            if (ref) refs.add(ref);
          },
          CallExpression(node: Node) {
            if (isStyleSheetDeclaration(node, context.settings)) {
              sheets.add(getStyleSheetName(node)!, getStyleDeclarations(node));
            }
          },
          "Program:exit"() {
            refs.forEach((r) => sheets.markAsUsed(r));
            const unused = sheets.getUnusedReferences();
            for (const [sheetName, props] of Object.entries(unused)) {
              for (const prop of props) {
                context.report({
                  node: prop,
                  message: "Unused style detected: {{sheet}}.{{prop}}",
                  data: { sheet: sheetName, prop: prop.key!.name },
                });
              }
            }
          },
        };
      },
    },

    "no-inline-styles": {
      createOnce(context: Node) {
        let expressions: { expression: Node; node: Node }[];
        return {
          Program() {
            expressions = [];
          },
          JSXAttribute(node: Node) {
            if (isStyleAttribute(node)) {
              expressions = expressions.concat(collectObjectExpressions(node.value));
            }
          },
          "Program:exit"() {
            for (const style of expressions) {
              if (style) {
                context.report({
                  node: style.node,
                  message: "Inline style detected",
                });
              }
            }
          },
        };
      },
    },

    "no-color-literals": {
      createOnce(context: Node) {
        let literals: { expression: Record<string, unknown>; node: Node }[];
        return {
          Program() {
            literals = [];
          },
          CallExpression(node: Node) {
            if (isStyleSheetDeclaration(node, context.settings)) {
              for (const style of getStyleDeclarations(node)) {
                literals = literals.concat(collectColorLiterals(style.value));
              }
            }
          },
          JSXAttribute(node: Node) {
            if (isStyleAttribute(node)) {
              literals = literals.concat(collectColorLiterals(node.value));
            }
          },
          "Program:exit"() {
            for (const lit of literals) {
              if (lit) {
                const keys = Object.keys(lit.expression);
                context.report({
                  node: lit.node,
                  message: "Color literal in style: use a constant instead of {{keys}}",
                  data: { keys: keys.join(", ") },
                });
              }
            }
          },
        };
      },
    },
  },
};
