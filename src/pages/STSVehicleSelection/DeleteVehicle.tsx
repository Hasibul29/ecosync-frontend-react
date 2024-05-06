import { Button } from "@/components/custom/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSTSFleetVehicleDelete from "@/hooks/useSTSFleetVehicleDelete";
import { Vehicle } from "@/hooks/useVehicle";
import useUserStore from "@/store";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  vehicleData: Vehicle;
}

export function DeleteVehicle({ open, onOpenChange, vehicleData }: Props) {
  const { user } = useUserStore();
  const vehicleDelete = useSTSFleetVehicleDelete(user.stsId ?? "",vehicleData.vehicleNumber ?? "", onOpenChange);
  const onSubmit = () => {
    vehicleDelete.mutate({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete Vehicle
            data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              loading={vehicleDelete.isPending}
              onClick={() => onSubmit()}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
