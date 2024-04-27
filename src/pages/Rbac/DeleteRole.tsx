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
import useRbacDeleteRole from "@/hooks/useRbacDeleteRole";
import { Roles } from "@/hooks/useRbacRoles";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  roleData: Roles;
}

export function DeleteRole({ open, onOpenChange, roleData }: Props) {
  const deleteRole = useRbacDeleteRole(roleData.id ?? "", onOpenChange);
  const onSubmit = () => {
    deleteRole.mutate({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Role?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete role <span>"{roleData.name}"</span>.
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
