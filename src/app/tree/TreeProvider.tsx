import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { clearStoredTree, loadStoredTree, saveStoredTree } from "@/app/tree/storage";
import { TreeContext } from "@/app/tree/tree-context";
import type { TreeContextValue } from "@/app/tree/tree-context";
import { parseTreeJson } from "@/shared/tree/parseTreeJson";
import type { FolderNode } from "@/shared/tree/types";

type StoredTree = {
  tree: FolderNode;
  source: string;
};

function readInitialTree(): StoredTree | null {
  const raw = loadStoredTree();
  if (raw === null) return null;
  const parsed = parseTreeJson(raw);
  if (!parsed.ok) {
    clearStoredTree();
    return null;
  }
  return { tree: parsed.tree, source: raw };
}

export function TreeProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredTree | null>(readInitialTree);

  const replaceTree = useCallback(
    (raw: string): { ok: true } | { ok: false; error: string } => {
      const parsed = parseTreeJson(raw);
      if (!parsed.ok) return parsed;
      saveStoredTree(raw);
      setStored({ tree: parsed.tree, source: raw });
      return { ok: true };
    },
    [],
  );

  const clearTree = useCallback(() => {
    clearStoredTree();
    setStored(null);
  }, []);

  const value = useMemo<TreeContextValue>(
    () => ({
      tree: stored?.tree ?? null,
      source: stored?.source ?? null,
      replaceTree,
      clearTree,
    }),
    [stored, replaceTree, clearTree],
  );

  return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
}
