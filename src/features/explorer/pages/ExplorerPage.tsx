import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useTree } from "@/app/tree/tree-context";
import { NodeDetails } from "@/features/explorer/components/NodeDetails";
import { TreePanel } from "@/features/explorer/components/TreePanel";
import { createExpanded, expandToPath } from "@/features/explorer/lib/expandedPaths";
import { SearchPanel } from "@/features/search/components/SearchPanel";
import { findNode } from "@/shared/tree/lookup";
import { decodeNodePath, pathKey } from "@/shared/tree/paths";
import { searchNodes } from "@/shared/tree/searchNodes";

export function ExplorerPage() {
  const { tree } = useTree();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const splat = params["*"] ?? "";
  const segments = decodeNodePath(splat);
  const located = tree ? findNode(tree, segments) : null;
  const query = searchParams.get("q") ?? "";
  const search = searchParams.toString();
  const activeKey = located ? pathKey(located.segments) : null;

  const [expanded, setExpanded] = useState<Set<string>>(() =>
    tree ? createExpanded(tree, located?.segments ?? []) : new Set<string>(),
  );
  const [trackedKey, setTrackedKey] = useState(activeKey);

  if (trackedKey !== activeKey) {
    setTrackedKey(activeKey);
    if (activeKey !== null) {
      setExpanded(expandToPath(expanded, activeKey));
    }
  }

  const hits = useMemo(
    () => (tree ? searchNodes(tree, query) : []),
    [tree, query],
  );

  function onQueryChange(value: string) {
    setSearchParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value === "") next.delete("q");
        else next.set("q", value);
        return next;
      },
      { replace: true },
    );
  }

  function onToggle(key: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  if (!tree) {
    return (
      <section className="empty-state">
        <h1>Brak zapisanego drzewa</h1>
        <p>Najpierw wklej albo wgraj JSON na stronie importu.</p>
        <Link to="/" className="button button-primary">
          Przejdź do importu
        </Link>
      </section>
    );
  }

  return (
    <div className="explorer">
      <TreePanel
        root={tree}
        activeSegments={located ? located.segments : null}
        search={search}
        expanded={expanded}
        onToggle={onToggle}
      />
      <div className="explorer-main">
        <SearchPanel
          query={query}
          rootName={tree.name}
          hits={hits}
          activeSegments={located ? located.segments : null}
          search={search}
          onQueryChange={onQueryChange}
        />
        {located ? (
          <NodeDetails rootName={tree.name} located={located} search={search} />
        ) : (
          <section className="empty-state compact">
            <h1>Nie znaleziono węzła</h1>
            <p>Ta ścieżka nie istnieje w aktualnym drzewie.</p>
          </section>
        )}
      </div>
    </div>
  );
}
