import type { FolderNode, TreeNode } from "@/shared/tree/types";

export type ParseResult =
  | { ok: true; tree: FolderNode }
  | { ok: false; error: string };

export function parseTreeJson(raw: string): ParseResult {
  let data: unknown;
  try {
    data = JSON.parse(raw);
  } catch {
    return { ok: false, error: "To nie jest poprawny JSON." };
  }

  const parsed = parseNode(data, "Korzeń");
  if (!parsed.ok) return parsed;
  if (parsed.node.type !== "folder") {
    return { ok: false, error: "Korzeń musi być folderem." };
  }
  return { ok: true, tree: parsed.node };
}

type NodeResult = { ok: true; node: TreeNode } | { ok: false; error: string };

function parseNode(value: unknown, location: string): NodeResult {
  if (!isRecord(value)) {
    return { ok: false, error: `${location} musi być obiektem.` };
  }

  if (typeof value.name !== "string" || value.name.trim() === "") {
    return { ok: false, error: `${location} wymaga niepustej nazwy.` };
  }

  if (value.name.includes("/") || value.name.includes("\\")) {
    return {
      ok: false,
      error: `${location} — nazwa nie może zawierać ukośnika.`,
    };
  }

  if (value.type === "file") {
    if (!isByteSize(value.size)) {
      return {
        ok: false,
        error: `${location} — plik wymaga całkowitego, nieujemnego rozmiaru.`,
      };
    }
    return {
      ok: true,
      node: { name: value.name, type: "file", size: value.size },
    };
  }

  if (value.type === "folder") {
    if (!Array.isArray(value.children)) {
      return {
        ok: false,
        error: `${location} — folder wymaga tablicy children.`,
      };
    }

    const children: TreeNode[] = [];
    const names = new Set<string>();
    for (let index = 0; index < value.children.length; index += 1) {
      const child = parseNode(
        value.children[index],
        `${location}.children[${index}]`,
      );
      if (!child.ok) return child;
      if (names.has(child.node.name)) {
        return {
          ok: false,
          error: `${location} ma zduplikowaną nazwę „${child.node.name}”.`,
        };
      }
      names.add(child.node.name);
      children.push(child.node);
    }

    return { ok: true, node: { name: value.name, type: "folder", children } };
  }

  return {
    ok: false,
    error: `${location} — type musi być „file” albo „folder”.`,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isByteSize(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}
