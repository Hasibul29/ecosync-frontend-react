import { IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";

import { Permissions } from "@/hooks/useRbacRoles";
import useRbacDeleteRolePermission from "@/hooks/useRbacDeleteRolePermission";

interface Props {
  row: Row<Permissions>;
  roleid:string
}

export function DataTableRowActionsPermission({ row ,roleid}: Props) {

  const deletePermission = useRbacDeleteRolePermission(roleid,row.original.id);

  const onSubmit = () => {
    deletePermission.mutate({});
  }

  return (
    <>
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => onSubmit()}
      >
        <IconTrash className="h-5 w-5 text-red-500" />
        <span className="sr-only">Open menu</span>
      </Button>
    </>
  );
}
