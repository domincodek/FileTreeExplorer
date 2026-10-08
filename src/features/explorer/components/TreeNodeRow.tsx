import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { TreeFolderRow } from "@/features/explorer/components/TreeFolderRow";
import { samePath, toNodeLocation } from "@/shared/tree/paths";
import type { TreeNode } from "@/shared/tree/types";
import { FileGlyph } from "@/shared/ui/icons";

type TreeNodeRowProps = {
  node: TreeNode;
  segments: string[];
  depth: number;
  activeSegments: string[] | null;
  search: string;
  expanded: ReadonlySet<string>;
  onToggle: (key: string) => void;
};

export function TreeNodeRow({
  node,
  segments,
  depth,
  activeSegments,
  search,
  expanded,
  onToggle,
}: TreeNodeRowProps) {
  if (node.type === "folder") {
    return (
      <TreeFolderRow
        node={node}
        segments={segments}
        depth={depth}
        activeSegments={activeSegments}
        search={search}
        expanded={expanded}
        onToggle={onToggle}
      />
    );
  }

  const active = activeSegments !== null && samePath(activeSegments, segments);

  return (
    <div className="tree-row" style={{ "--depth": String(depth) } as CSSProperties}>
      <span className="tree-spacer" aria-hidden="true" />
      <Link
        to={toNodeLocation(segments, search)}
        className={active ? "tree-link is-active" : "tree-link"}
        aria-current={active ? "page" : undefined}
      >
        <FileGlyph />
        <span className="tree-name">{node.name}</span>
      </Link>
    </div>
  );
}
