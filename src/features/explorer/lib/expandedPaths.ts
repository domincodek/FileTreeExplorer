import type { FolderNode } from "@/shared/tree/types";

export function createExpanded(root: FolderNode, segments: readonly string[]): Set<string> {
  const expanded = new Set<string>([""]);
  for (const child of root.children) {
    if (child.type === "folder") expanded.add(child.name);
  }
  for (let index = 0; index < segments.length; index += 1) {
    expanded.add(segments.slice(0, index + 1).join("/"));
  }
  return expanded;
}

export function expandToPath(current: Set<string>, activeKey: string): Set<string> {
  const next = new Set(current);
  next.add("");
  const parts = activeKey === "" ? [] : activeKey.split("/");
  for (let index = 0; index < parts.length; index += 1) {
    next.add(parts.slice(0, index + 1).join("/"));
  }
  return next.size === current.size ? current : next;
}
