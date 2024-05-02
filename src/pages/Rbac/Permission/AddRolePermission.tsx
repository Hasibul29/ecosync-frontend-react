import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/custom/button";
import { useEffect, useState } from "react";
import useRbacPermissions from "@/hooks/useRbacPermission";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useRbacAddRolePermissions from "@/hooks/useRbacAddRolePermission";
import { Permissions } from "@/hooks/useRbacRoles";
import { useRoleStore } from "@/store";

interface Props {
  permissions: Permissions[];
}

const schema = z.object({
  permissionIdList: z.string().array(),
});

const AddRolePermission = ({ permissions }: Props) => {
  const { role } = useRoleStore();
  const { data, error, isError } = useRbacPermissions();
  const [open, onOpenChange] = useState(false);
  const addRolePermission = useRbacAddRolePermissions(
    role.id ?? "",
    onOpenChange
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      permissionIdList: permissions.map((permission) => permission.id) ?? [],
    },
  });

  useEffect(() => {
    form.reset({
      permissionIdList: permissions.map((permission) => permission.id) ?? [],
    });
  }, [permissions]);

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
    addRolePermission.mutate(data);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onOpenChange(!open);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2" /> Add Permission
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className=" md:max-w-2xl sm:max-w-[485px]"
      >
        <DialogHeader>
          <DialogTitle>Add Permissions</DialogTitle>
          <DialogDescription>
            Select from existing permissions.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 gap-1">
                <div className="colums-1">
                  {isError && <p className="text-red-400">{error.message}</p>}
                  <FormField
                    control={form.control}
                    name="permissionIdList"
                    render={({ field: { onChange, value } }) => (
                      <FormItem>
                        <FormLabel>Permissions</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-3 gap-6 md:grid-cols-4">
                            {data?.data?.map((permission) => (
                              <span
                                key={permission.id}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  id={permission.id}
                                  value={value}
                                  checked={value.includes(permission.id)}
                                  onCheckedChange={(isChecked) => {
                                    onChange(
                                      isChecked
                                        ? [...value, permission.id]
                                        : value.filter(
                                            (item) => item !== permission.id
                                          )
                                    );
                                  }}
                                />
                                <Label htmlFor={permission.id}>
                                  {permission.name}
                                </Label>
                              </span>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2 pt-10 sm:space-x-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button loading={addRolePermission.isPending} disabled={!form.formState.isDirty}>Register</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddRolePermission;
