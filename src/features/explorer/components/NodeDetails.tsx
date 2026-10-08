import { FileDetails } from "@/features/explorer/components/FileDetails";
import { FolderDetails } from "@/features/explorer/components/FolderDetails";
import type { LocatedNode } from "@/shared/tree/lookup";

type NodeDetailsProps = {
  rootName: string;
  located: LocatedNode;
  search: string;
};

export function NodeDetails({ rootName, located, search }: NodeDetailsProps) {
  if (located.node.type === "file") {
    return (
      <FileDetails
        node={located.node}
        rootName={rootName}
        segments={located.segments}
        search={search}
      />
    );
  }

  return (
    <FolderDetails
      node={located.node}
      rootName={rootName}
      segments={located.segments}
      search={search}
    />
  );
}
