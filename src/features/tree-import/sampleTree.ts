import type { FolderNode } from "@/shared/tree/types";

export const sampleTree: FolderNode = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        { name: "index.ts", type: "file", size: 1024 },
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Button.tsx", type: "file", size: 512 },
            { name: "Tree.tsx", type: "file", size: 2480 },
            {
              name: "icons",
              type: "folder",
              children: [{ name: "SearchIcon.tsx", type: "file", size: 128 }],
            },
          ],
        },
        { name: "App.tsx", type: "file", size: 2048 },
      ],
    },
    {
      name: "public",
      type: "folder",
      children: [{ name: "favicon.svg", type: "file", size: 860 }],
    },
    { name: "docs", type: "folder", children: [] },
    { name: "package.json", type: "file", size: 300 },
    { name: "archive.bin", type: "file", size: 2500000 },
  ],
};

export const sampleTreeJson = JSON.stringify(sampleTree, null, 2);
