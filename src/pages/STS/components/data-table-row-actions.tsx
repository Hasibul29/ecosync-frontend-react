import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import UpdateSTS from "../UpdateSTS";
import { DeleteSTS } from "../DeleteSTS";
import { STS } from "@/hooks/useSTS";

interface DataTableRowActionsProps {
  row: Row<STS>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {

    const [showUpdateSTSDialog, setShowUpdateSTSDialog] = useState(false)
    const [showDeleteSTSDialog, setShowDeleteSTSDialog] = useState(false)



  return (
    <>
    <UpdateSTS open={showUpdateSTSDialog} onOpenChange={setShowUpdateSTSDialog} stsData={row.original} />
    <DeleteSTS open={showDeleteSTSDialog} onOpenChange={setShowDeleteSTSDialog} stsData={row.original} />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => {setShowUpdateSTSDialog(true)}} >Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.id ?? "");
          }}
        >
          Copy STS Id
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(row.original));
          }}
        >
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {setShowDeleteSTSDialog(true)}}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
