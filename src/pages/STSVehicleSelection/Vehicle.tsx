import BreadCrumb from "@/components/bread-crumb";
import { DataTable } from "./components/data-tables";
import { columns } from "./components/columns";
import { DataTableSkeleton } from "@/components/DataTableSkeleton";
import useSTSVehicleSelection from "@/hooks/useSTSVehicleSelecton";
import useUserStore from "@/store";
import useSTSSelectedFleet from "@/hooks/useSTSSelectedFleet";
import { columnsSelectedFleet } from "./components/columns-selected-fleet";
import { DataTableSlectedFleet } from "./components/data-tables-selected-fleet";
import MyLocation from "./STSMap";
import LandfillList from "./components/LandfillList";
import { useState } from "react";

interface Destination{
  latitude:number
  longitude:number
}

const STSVehicleSelection = () => {
  const breadcrumbItems = [{ title: "Vehicles", link: "/dashboard/vehicles" }];
  const { user } = useUserStore();
  const { data, isLoading, error } = useSTSVehicleSelection(user.stsId ?? "");
  const {
    data: selectedFleet,
    isLoading: isLoadingSelectedFleet,
    error: errorSelectedFleet,
  } = useSTSSelectedFleet(user.stsId ?? "");

 const [destination,setDestination] = useState<Destination>({latitude: 0, longitude: 0});

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Vehicle Selection</h1>
      </div>
      <div>
        {error && <p>{error.message}</p>}
        {isLoading ? (
          <DataTableSkeleton columnCount={3} rowCount={10} />
        ) : (
          <DataTable columns={columns} data={data?.data ?? []} />
        )}
      </div>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Today's Fleet</h1>
      </div>
      <div className="flex">
        <div className="flex-1">
          {errorSelectedFleet && <p>{errorSelectedFleet.message}</p>}
          {isLoadingSelectedFleet ? (
            <DataTableSkeleton columnCount={3} rowCount={10} />
          ) : (
            <DataTableSlectedFleet
              columns={columnsSelectedFleet}
              data={selectedFleet?.data?.vehicles ?? []}
            />
          )}
        </div>
        <div className="min-w-[600px] ml-4">
          <div className="mb-4">
            <LandfillList onChange={(latitude,longitude) => setDestination({latitude,longitude})} />
          </div>
          <MyLocation
            originLat={user.stsManager?.latitude ?? 23.705335046644926}
            originLng={user.stsManager?.longitude ?? 90.52195741396255}
            destinationLat={destination.latitude}
            destinationLng={destination.longitude}
          />
        </div>
      </div>
    </>
  );
};

export default STSVehicleSelection;
