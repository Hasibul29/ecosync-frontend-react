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
import useSTSDeleteVehicle from "@/hooks/useSTSDeleteVehicle";
import { Vehicle } from "@/hooks/useVehicle";
import { useSTSStore } from "@/store";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  vehicleData: Vehicle;
}

export function DeleteSTSVehicle({ open, onOpenChange, vehicleData }: Props) {
  const { sts } = useSTSStore();

  const deleteVehicle = useSTSDeleteVehicle(
    sts.id ?? "",
    vehicleData.id ?? "",
    onOpenChange
  );

  const onSubmit = () => {
    deleteVehicle.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove permission?</DialogTitle>
          <DialogDescription>
            Are you sure that you want to remove{" "}
            <span>"{vehicleData.vehicleNumber}"</span>?.
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
              loading={deleteVehicle.isPending}
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
