import type { TreeNode } from "@/shared/tree/types";

export function subtreeFileSize(node: TreeNode): number {
  if (node.type === "file") return node.size;
  return node.children.reduce((sum, child) => sum + subtreeFileSize(child), 0);
}
