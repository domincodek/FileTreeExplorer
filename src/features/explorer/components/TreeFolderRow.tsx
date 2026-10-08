import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { TreeNodeRow } from "@/features/explorer/components/TreeNodeRow";
import { pathKey, samePath, toNodeLocation } from "@/shared/tree/paths";
import type { FolderNode } from "@/shared/tree/types";
import { ChevronGlyph, FolderGlyph } from "@/shared/ui/icons";

type TreeFolderRowProps = {
  node: FolderNode;
  segments: string[];
  depth: number;
  activeSegments: string[] | null;
  search: string;
  expanded: ReadonlySet<string>;
  onToggle: (key: string) => void;
};

export function TreeFolderRow({
  node,
  segments,
  depth,
  activeSegments,
  search,
  expanded,
  onToggle,
}: TreeFolderRowProps) {
  const key = pathKey(segments);
  const open = expanded.has(key);
  const active = activeSegments !== null && samePath(activeSegments, segments);

  return (
    <div className="tree-branch">
      <div className="tree-row" style={{ "--depth": String(depth) } as CSSProperties}>
        <button
          type="button"
          className="tree-toggle"
          aria-expanded={open}
          aria-label={open ? `Zwiń folder ${node.name}` : `Rozwiń folder ${node.name}`}
          onClick={() => onToggle(key)}
        >
          <ChevronGlyph expanded={open} />
        </button>
        <Link
          to={toNodeLocation(segments, search)}
          className={active ? "tree-link is-active" : "tree-link"}
          aria-current={active ? "page" : undefined}
        >
          <FolderGlyph />
          <span className="tree-name">{node.name}</span>
        </Link>
      </div>
      {open
        ? node.children.map((child) => (
            <TreeNodeRow
              key={child.name}
              node={child}
              segments={[...segments, child.name]}
              depth={depth + 1}
              activeSegments={activeSegments}
              search={search}
              expanded={expanded}
              onToggle={onToggle}
            />
          ))
        : null}
    </div>
  );
}
