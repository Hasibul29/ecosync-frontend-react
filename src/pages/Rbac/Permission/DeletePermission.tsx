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
import useRbacDeleteRolePermission from "@/hooks/useRbacDeleteRolePermission";
import { Permissions } from "@/hooks/useRbacRoles";
import { useRoleStore } from "@/store";

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  permissionData: Permissions;
}

export function DeletePermission({
  open,
  onOpenChange,
  permissionData,
}: Props) {
  const { role } = useRoleStore();

  const deletePermission = useRbacDeleteRolePermission(
    role.id ?? "",
    permissionData.id
  );

  const onSubmit = () => {
    deletePermission.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove permission?</DialogTitle>
          <DialogDescription>
            Are you sure that you want to remove{" "}
            <span>"{permissionData.name}"</span>?.
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
              loading={deletePermission.isPending}
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
