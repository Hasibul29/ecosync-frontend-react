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
import { STS } from "@/hooks/useSTS";
import useSTSDelete from "@/hooks/useSTSDelete";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  stsData: STS;
}

export function DeleteSTS({ open, onOpenChange, stsData }: Props) {
  const deleteSTS = useSTSDelete(stsData.id ?? "", onOpenChange);
  const onSubmit = () => {
    deleteSTS.mutate({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete STS
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
              loading={deleteSTS.isPending}
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
