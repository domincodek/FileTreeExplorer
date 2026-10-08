import type { FolderNode, TreeNode } from "@/shared/tree/types";

export type SearchHit = {
  node: TreeNode;
  segments: string[];
};

export function searchNodes(root: FolderNode, query: string): SearchHit[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") return [];

  const hits: SearchHit[] = [];

  const visit = (node: TreeNode, segments: string[]) => {
    if (node.name.toLowerCase().includes(needle)) {
      hits.push({ node, segments });
    }
    if (node.type === "folder") {
      for (const child of node.children) {
        visit(child, [...segments, child.name]);
      }
    }
  };

  visit(root, []);
  return hits;
}
