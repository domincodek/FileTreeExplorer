const STORAGE_KEY = "filetree-explorer:tree";

export function loadStoredTree(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveStoredTree(raw: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      return;
    }
  }
}

export function clearStoredTree(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}
