import { DollarSign } from "lucide-react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import useStats, { LandfillLocation, StsLocation } from "@/hooks/useStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { data, isLoading, error } = useStats();
  return (
    <>
      <div className="w-64 mt-5">
        <div className="mt-5">
          <Component />
        </div>
      </div>
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <p>Loading.....</p>
      ) : (
        <MyLocation
          landfillLocation={data?.data?.landfillLocation ?? []}
          stsLocation={data?.data?.stsLocation ?? []}
        />
      )}
    </>
  );
};

interface Props {
  landfillLocation: LandfillLocation[];
  stsLocation: StsLocation[];
}

function MyLocation({ landfillLocation, stsLocation }: Props) {
  return (
    <>
      <div>
        <MapContainer
          center={[23.705335046644926, 90.52195741396255]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {landfillLocation.map((location) => (
            <Marker
              key={location.latitude.toString() + location.longitude.toString()}
              position={[location.latitude, location.longitude]}
              
            ></Marker>
          ))}
          {stsLocation.map((location) => (
            <Marker
              key={location.latitude.toString() + location.longitude.toString()}
              position={[location.latitude, location.longitude]}
            ></Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Dashboard;

function Component() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}
