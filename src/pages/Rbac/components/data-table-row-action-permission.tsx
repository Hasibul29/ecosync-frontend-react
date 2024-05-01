import { IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";

import { Permissions } from "@/hooks/useRbacRoles";
import { useState } from "react";
import { DeletePermission } from "../Permission/DeletePermission";

interface Props {
  row: Row<Permissions>;
}

export function DataTableRowActionsPermission({ row }: Props) {
  
  const [showDeletePermissionDialog, setShowDeletePermissionDialog] = useState(false)

  return (
    <>
    <DeletePermission open={showDeletePermissionDialog} onOpenChange={setShowDeletePermissionDialog} permissionData={row.original}></DeletePermission>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => {setShowDeletePermissionDialog(true)}}
      >
        <IconTrash className="h-5 w-5 text-red-500" />
      </Button>
    </>
  );
}
