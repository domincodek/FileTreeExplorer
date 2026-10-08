import { createContext, useContext } from "react";
import type { FolderNode } from "@/shared/tree/types";

export type TreeContextValue = {
  tree: FolderNode | null;
  source: string | null;
  replaceTree: (raw: string) => { ok: true } | { ok: false; error: string };
  clearTree: () => void;
};

export const TreeContext = createContext<TreeContextValue | null>(null);

export function useTree(): TreeContextValue {
  const value = useContext(TreeContext);
  if (!value) {
    throw new Error("useTree must be used within TreeProvider");
  }
  return value;
}
