import { useId } from "react";
import { Link } from "react-router-dom";
import { formatNodePath, pathKey, samePath, toNodeLocation } from "@/shared/tree/paths";
import type { SearchHit } from "@/shared/tree/searchNodes";
import { FileGlyph, FolderGlyph } from "@/shared/ui/icons";

type SearchPanelProps = {
  query: string;
  rootName: string;
  hits: SearchHit[];
  activeSegments: string[] | null;
  search: string;
  onQueryChange: (value: string) => void;
};

export function SearchPanel({
  query,
  rootName,
  hits,
  activeSegments,
  search,
  onQueryChange,
}: SearchPanelProps) {
  const inputId = useId();
  const needle = query.trim();

  return (
    <section className="search-panel" aria-label="Wyszukiwanie">
      <label htmlFor={inputId}>Szukaj po nazwie</label>
      <input
        id={inputId}
        type="search"
        value={query}
        autoComplete="off"
        placeholder="np. Button"
        onChange={(event) => onQueryChange(event.target.value)}
      />
      {needle !== "" ? (
        <div className="search-results">
          <p className="search-count">{formatResultCount(hits.length)}</p>
          {hits.length === 0 ? null : (
            <ul>
              {hits.map((hit) => {
                const active =
                  activeSegments !== null && samePath(activeSegments, hit.segments);
                return (
                  <li key={`hit:${pathKey(hit.segments)}`}>
                    <Link
                      to={toNodeLocation(hit.segments, search)}
                      className={active ? "is-active" : undefined}
                      aria-current={active ? "page" : undefined}
                    >
                      {hit.node.type === "folder" ? <FolderGlyph /> : <FileGlyph />}
                      <span className="hit-copy">
                        <span className="hit-name">{hit.node.name}</span>
                        <span className="hit-path">
                          {formatNodePath(rootName, hit.segments)}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}

function formatResultCount(count: number): string {
  if (count === 0) return "Brak wyników";
  if (count === 1) return "1 wynik";
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} wyniki`;
  }
  return `${count} wyników`;
}
