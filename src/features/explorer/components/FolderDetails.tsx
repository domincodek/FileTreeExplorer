import { Link } from "react-router-dom";
import { formatBytes } from "@/shared/formatBytes";
import { subtreeFileSize } from "@/shared/tree/metrics";
import { formatNodePath, toNodeLocation } from "@/shared/tree/paths";
import type { FolderNode } from "@/shared/tree/types";
import { PathTrail } from "@/features/explorer/components/PathTrail";
import { FileGlyph, FolderGlyph } from "@/shared/ui/icons";

type FolderDetailsProps = {
  node: FolderNode;
  rootName: string;
  segments: string[];
  search: string;
};

export function FolderDetails({
  node,
  rootName,
  segments,
  search,
}: FolderDetailsProps) {
  return (
    <article className="details">
      <p className="kicker">{segments.length === 0 ? "Korzeń" : "Folder"}</p>
      <h1>{node.name}</h1>
      <dl className="meta">
        <div>
          <dt>Nazwa</dt>
          <dd>{node.name}</dd>
        </div>
        <div>
          <dt>Liczba bezpośrednich dzieci</dt>
          <dd>{node.children.length}</dd>
        </div>
        <div>
          <dt>Całkowity rozmiar plików</dt>
          <dd>{formatBytes(subtreeFileSize(node))}</dd>
        </div>
        <div>
          <dt>Pełna ścieżka</dt>
          <dd>
            <PathTrail rootName={rootName} segments={segments} search={search} />
            <code className="path-code">{formatNodePath(rootName, segments)}</code>
          </dd>
        </div>
      </dl>
      <section className="children-section">
        <h2>Dzieci</h2>
        {node.children.length === 0 ? (
          <p className="muted">Ten folder jest pusty.</p>
        ) : (
          <ul className="child-list">
            {node.children.map((child) => {
              const childSegments = [...segments, child.name];
              return (
                <li key={child.name}>
                  <Link to={toNodeLocation(childSegments, search)}>
                    {child.type === "folder" ? <FolderGlyph /> : <FileGlyph />}
                    <span className="child-name">{child.name}</span>
                    <span className="child-meta">
                      {child.type === "file" ? formatBytes(child.size) : "folder"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </article>
  );
}
