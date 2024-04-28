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
import { DeleteRole } from "../DeleteRole";
import { Roles } from "@/hooks/useRbacRoles";
import { useNavigate } from "react-router-dom";
import { useRoleStore } from "@/store";

interface DataTableRowActionsProps {
  row: Row<Roles>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const [showDeleteRolesDialog, setShowDeleteRolesDialog] = useState(false)
    const navigate = useNavigate();
    const {setRole} = useRoleStore();


  return (
    <>
    <DeleteRole open={showDeleteRolesDialog} onOpenChange={setShowDeleteRolesDialog} roleData={row.original} />
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
        <DropdownMenuItem onClick={() => {navigate("roles",{ state : { ...row.original}});setRole(row.original) }} >View Details</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.id ?? "");
          }}
        >
          Copy Role Id
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
        <DropdownMenuItem onClick={() => {setShowDeleteRolesDialog(true)}}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
