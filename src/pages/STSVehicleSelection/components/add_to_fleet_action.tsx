import { Button } from "@/components/custom/button";
import useSTSFleetAddVehicle from "@/hooks/useSTSFleetAddVehicle";
import { SuggestedVehicle } from "@/hooks/useSTSVehicleSelecton";
import useUserStore from "@/store";
import { Row } from "@tanstack/react-table";

interface AddToFleetActionProps {
  vehicles: Row<SuggestedVehicle>[];
  onSuccess?: () => void;
}

const AddToFleetAction = ({ vehicles, onSuccess }: AddToFleetActionProps) => {
  const { user } = useUserStore();
  const addVehicle = useSTSFleetAddVehicle(user.stsId ?? "");

  const onSubmit = () => {
    const vehicleList = vehicles.map((v) => v.original);
    addVehicle.mutate({
      vehicles: vehicleList,
    }, {
      onSuccess: () => {
        onSuccess?.();
      }
    });
  };

  return <Button loading={addVehicle.isPending} onClick={() => onSubmit()}>Add To Fleet</Button>;
};

export default AddToFleetAction;
