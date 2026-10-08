import type { FolderNode, TreeNode } from "@/shared/tree/types";

export type LocatedNode = {
  node: TreeNode;
  segments: string[];
};

export function findNode(root: FolderNode, segments: readonly string[]): LocatedNode | null {
  let current: TreeNode = root;

  for (let index = 0; index < segments.length; index += 1) {
    if (current.type !== "folder") return null;
    const segment = segments[index];
    const child: TreeNode | undefined = current.children.find(
      (entry) => entry.name === segment,
    );
    if (!child) return null;
    current = child;
  }

  return { node: current, segments: [...segments] };
}
