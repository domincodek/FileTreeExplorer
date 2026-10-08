import type { FolderNode } from "@/shared/tree/types";
import { TreeNodeRow } from "@/features/explorer/components/TreeNodeRow";

type TreePanelProps = {
  root: FolderNode;
  activeSegments: string[] | null;
  search: string;
  expanded: ReadonlySet<string>;
  onToggle: (key: string) => void;
};

export function TreePanel({
  root,
  activeSegments,
  search,
  expanded,
  onToggle,
}: TreePanelProps) {
  return (
    <nav className="tree-panel" aria-label="Drzewo plików">
      <p className="tree-panel-label">Drzewo</p>
      <TreeNodeRow
        node={root}
        segments={[]}
        depth={0}
        activeSegments={activeSegments}
        search={search}
        expanded={expanded}
        onToggle={onToggle}
      />
    </nav>
  );
}
