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

// import UpdateVehicle from "../UpdateVehicle";
// import { DeleteVehicle } from "../DeleteVehicle";
import { Vehicle } from "@/hooks/useVehicle";

interface DataTableRowActionsProps {
  row: Row<Vehicle>;
}

export function VehicleDataTableRowActions({ row }: DataTableRowActionsProps) {

    const [showUpdateVehicleDialog, setShowUpdateVehicleDialog] = useState(false)
    const [showDeleteVehicleDialog, setShowDeleteVehicleDialog] = useState(false)



  return (
    <>
    {/* <UpdateVehicle open={showUpdateVehicleDialog} onOpenChange={setShowUpdateVehicleDialog} vehicleData={row.original} />
    <DeleteVehicle open={showDeleteVehicleDialog} onOpenChange={setShowDeleteVehicleDialog} vehicleData={row.original} /> */}
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
        <DropdownMenuItem onClick={() => {setShowUpdateVehicleDialog(true)}} >Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(row.original.id ?? "");
          }}
        >
          Copy Vehicle Id
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
        <DropdownMenuItem onClick={() => {setShowDeleteVehicleDialog(true)}}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
}
