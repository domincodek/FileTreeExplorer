export function ChevronGlyph({ expanded }: { expanded: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={expanded ? "chevron is-open" : "chevron"}
    >
      <path
        d="M6 3.5 11 8 6 12.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FolderGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="glyph">
      <path
        fill="currentColor"
        d="M3.5 7.2A2.2 2.2 0 0 1 5.7 5h4.1l1.7 1.8h6.8A2.2 2.2 0 0 1 20.5 9v8.2a2.2 2.2 0 0 1-2.2 2.2H5.7a2.2 2.2 0 0 1-2.2-2.2V7.2Z"
      />
    </svg>
  );
}

export function FileGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="glyph">
      <path
        fill="currentColor"
        d="M7 3.5h6.1L19 9.3V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 6 20V5c0-.8.5-1.5 1-1.5Z"
      />
      <path fill="currentColor" opacity="0.45" d="M13.1 4.1 18.7 9.5h-5.6V4.1Z" />
    </svg>
  );
}
