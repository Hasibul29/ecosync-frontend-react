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
import { Landfill } from "@/hooks/useLandfill";
import useLandfillDelete from "@/hooks/useLandfillDelete";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  landfillData: Landfill;
}

export function DeleteLandfill({ open, onOpenChange, landfillData }: Props) {
  const deleteLandfill = useLandfillDelete(landfillData.id ?? "", onOpenChange);
  const onSubmit = () => {
    deleteLandfill.mutate({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete Landfill
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
              loading={deleteLandfill.isPending}
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
