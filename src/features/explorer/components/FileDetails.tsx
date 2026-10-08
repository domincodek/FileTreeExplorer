import { formatBytes } from "@/shared/formatBytes";
import { formatNodePath } from "@/shared/tree/paths";
import type { FileNode } from "@/shared/tree/types";
import { PathTrail } from "@/features/explorer/components/PathTrail";

type FileDetailsProps = {
  node: FileNode;
  rootName: string;
  segments: string[];
  search: string;
};

export function FileDetails({ node, rootName, segments, search }: FileDetailsProps) {
  return (
    <article className="details">
      <p className="kicker">Plik</p>
      <h1>{node.name}</h1>
      <dl className="meta">
        <div>
          <dt>Nazwa</dt>
          <dd>{node.name}</dd>
        </div>
        <div>
          <dt>Rozmiar</dt>
          <dd>{formatBytes(node.size)}</dd>
        </div>
        <div>
          <dt>Pełna ścieżka</dt>
          <dd>
            <PathTrail rootName={rootName} segments={segments} search={search} />
            <code className="path-code">{formatNodePath(rootName, segments)}</code>
          </dd>
        </div>
      </dl>
    </article>
  );
}
