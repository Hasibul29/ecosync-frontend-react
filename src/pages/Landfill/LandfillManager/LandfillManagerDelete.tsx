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
import useLandfillManagerDelete from "@/hooks/useLandfillManagerDelete";
import { User, useLandfillStore } from "@/store";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  userData: User;
}

export function LandfillDeleteManager({ open, onOpenChange, userData }: Props) {
  const { landfill } = useLandfillStore();

  const deleteManager = useLandfillManagerDelete(
    landfill.id ?? "",
    userData.id ?? "",
    onOpenChange
  );

  const onSubmit = () => {
    deleteManager.mutate({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove permission?</DialogTitle>
          <DialogDescription>
            Are you sure that you want to remove{" "}
            <span>"{userData.email}"</span>?.
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
              loading={deleteManager.isPending}
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
