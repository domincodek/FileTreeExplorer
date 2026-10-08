export function encodeNodePath(segments: readonly string[]): string {
  return segments.map((segment) => encodeURIComponent(segment)).join("/");
}

export function decodeNodePath(nodePath: string): string[] {
  if (nodePath === "") return [];
  return nodePath.split("/").filter((segment) => segment.length > 0);
}

export function pathKey(segments: readonly string[]): string {
  return segments.join("/");
}

export function formatNodePath(rootName: string, segments: readonly string[]): string {
  if (segments.length === 0) return rootName;
  return segments.join("/");
}

export function samePath(left: readonly string[], right: readonly string[]): boolean {
  return (
    left.length === right.length &&
    left.every((segment, index) => segment === right[index])
  );
}

export function toNodeLocation(
  segments: readonly string[],
  search: string,
): { pathname: string; search: string } {
  const pathname =
    segments.length === 0 ? "/tree" : `/tree/${encodeNodePath(segments)}`;
  return {
    pathname,
    search: search === "" ? "" : `?${search}`,
  };
}
