const KILOBYTE = 1024;
const MEGABYTE = 1024 * 1024;

export function formatBytes(size: number): string {
  if (size < KILOBYTE) return `${size} B`;
  if (size < MEGABYTE) return `${formatUnit(size / KILOBYTE)} KB`;
  return `${formatUnit(size / MEGABYTE)} MB`;
}

function formatUnit(value: number): string {
  if (value >= 10) return String(Math.round(value));
  const rounded = Math.round(value * 10) / 10;
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}
