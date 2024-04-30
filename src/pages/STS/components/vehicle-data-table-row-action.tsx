import { Row } from "@tanstack/react-table";
import { Button } from "@/components/custom/button";
import { useState } from "react";
import { Vehicle } from "@/hooks/useVehicle";
import { DeleteSTSVehicle } from "../STSDeleteVehicle";
import { IconTrash } from "@tabler/icons-react";

interface DataTableRowActionsProps {
  row: Row<Vehicle>;
}

export function VehicleDataTableRowActions({ row }: DataTableRowActionsProps) {
  const [showDeleteVehicleDialog, setShowDeleteVehicleDialog] = useState(false);

  return (
    <>
      <DeleteSTSVehicle
        open={showDeleteVehicleDialog}
        onOpenChange={setShowDeleteVehicleDialog}
        vehicleData={row.original}
      />
      <Button
        variant="ghost"
        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        onClick={() => {
          setShowDeleteVehicleDialog(true);
        }}
      >
        <IconTrash className="h-5 w-5 text-red-500" />
      </Button>
    </>
  );
}
