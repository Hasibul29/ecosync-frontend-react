import { Row } from "@tanstack/react-table";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { DeleteVehicle } from "../DeleteVehicle";
import { SuggestedVehicle } from "@/hooks/useSTSVehicleSelecton";

interface DataTableRowActionsProps {
  row: Row<SuggestedVehicle>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
    const [showDeleteVehicleDialog, setShowDeleteVehicleDialog] = useState(false)

    return (
      <>
      <DeleteVehicle open={showDeleteVehicleDialog} onOpenChange={setShowDeleteVehicleDialog} vehicleData={row.original}></DeleteVehicle>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          onClick={() => {setShowDeleteVehicleDialog(true)}}
        >
          <IconTrash className="h-5 w-5 text-red-500" />
        </Button>
      </>
    );
  }
  
