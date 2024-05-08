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
import { useRef, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Destination {
  latitude: number;
  longitude: number;
}
export interface MapData {
  totalDistance: number;
  totalTime: number;
  wayPoints: {
    origin: LocationLatLng;
    destination: LocationLatLng;
  };
  routeList: LocationLatLng[];
  createdAt: Date;
}
export interface LocationLatLng {
  latitude: number;
  longitude: number;
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

  const [destination, setDestination] = useState<Destination>({
    latitude: 0,
    longitude: 0,
  });
  const routeDataRef = useRef<MapData | null>(null);

  return (
    <>
      <BreadCrumb items={breadcrumbItems} />
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Vehicle Selection</h1>
      </div>
      <div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error.response?.data.message}</AlertDescription>
          </Alert>
        )}
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
          {errorSelectedFleet && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorSelectedFleet.response?.data.message}
              </AlertDescription>
            </Alert>
          )}
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
            <LandfillList
              onChange={(latitude, longitude) =>
                setDestination({ latitude, longitude })
              }
            />
            { destination.latitude !== 0 && <span className="ml-4"><Button onClick={() => console.log(routeDataRef.current)}>Save</Button></span>}
            {/* { destination.latitude !== 0 &&  <p>Distance: {((routeDataRef.current?.totalDistance?? 0) / 1000.0).toFixed(2)} km | Time: {((routeDataRef.current?.totalTime?? 0)/60).toFixed(2)} min</p>} */}
          </div>
          <MyLocation
            originLat={user.stsManager?.latitude ?? 23.705335046644926}
            originLng={user.stsManager?.longitude ?? 90.52195741396255}
            destinationLat={destination.latitude}
            destinationLng={destination.longitude}
            routeDataRef={routeDataRef}
          />
        </div>
      </div>
    </>
  );
};

export default STSVehicleSelection;
