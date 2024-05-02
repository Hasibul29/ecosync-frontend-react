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
import UpdateLandfill from "../UpdateLandfill";
import { DeleteLandfill } from "../DeleteLandfill";
import { Landfill } from "@/hooks/useLandfill";

interface DataTableRowActionsProps {
  row: Row<Landfill>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {

    const [showUpdateLandfillDialog, setShowUpdateLandfillDialog] = useState(false)
    const [showDeleteLandfillDialog, setShowDeleteLandfillDialog] = useState(false)



  return (
    <>
    <UpdateLandfill open={showUpdateLandfillDialog} onOpenChange={setShowUpdateLandfillDialog} landfillData={row.original} />
    <DeleteLandfill open={showDeleteLandfillDialog} onOpenChange={setShowDeleteLandfillDialog} landfillData={row.original} />
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
        <DropdownMenuItem onClick={() => {setShowUpdateLandfillDialog(true)}} >Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.id ?? "");
          }}
        >
          Copy Landfill Id
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
        <DropdownMenuItem onClick={() => {setShowDeleteLandfillDialog(true)}}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
