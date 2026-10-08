import { Link } from "react-router-dom";
import { formatNodePath, toNodeLocation } from "@/shared/tree/paths";

type PathTrailProps = {
  rootName: string;
  segments: readonly string[];
  search: string;
};

export function PathTrail({ rootName, segments, search }: PathTrailProps) {
  return (
    <p className="path-trail">
      {segments.length === 0 ? (
        <span>{rootName}</span>
      ) : (
        <Link to={toNodeLocation([], search)}>{rootName}</Link>
      )}
      {segments.map((segment, index) => {
        const crumb = segments.slice(0, index + 1);
        const last = index === segments.length - 1;
        return (
          <span key={formatNodePath(rootName, crumb)}>
            <span className="path-sep" aria-hidden="true">
              /
            </span>
            {last ? (
              <span>{segment}</span>
            ) : (
              <Link to={toNodeLocation(crumb, search)}>{segment}</Link>
            )}
          </span>
        );
      })}
    </p>
  );
}
