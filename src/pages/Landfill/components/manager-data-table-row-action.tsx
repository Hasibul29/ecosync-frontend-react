import { Row } from "@tanstack/react-table";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { User } from "@/store";
import { STSDeletemanager } from "../STSManager/STSDeleteManager";

interface DataTableRowActionsProps {
  row: Row<User>;
}

export function ManagerDataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showDeleteManagerDialog, setShowDeleteManagerDialog] = useState(false);

  return (
    <>
      <STSDeletemanager
        open={showDeleteManagerDialog}
        onOpenChange={setShowDeleteManagerDialog}
        userData={row.original}
      />
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => {
          setShowDeleteManagerDialog(true);
        }}
      >
        <IconTrash className="h-5 w-5 text-red-500" />
      </Button>
    </>
  );
}
