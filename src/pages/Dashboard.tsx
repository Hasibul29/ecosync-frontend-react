import { AlertCircle, DollarSign } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useStats, { LandfillData, StsData } from "@/hooks/useStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import L from "leaflet";
import markerIcon from "../assets/marker.svg";
import {
  Bar,
  BarChart,
  Label,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Dashboard = () => {
  const { data, isLoading, error } = useStats();

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.response?.data.message}</AlertDescription>
        </Alert>
      )}
      <div className=" max-w-5xl grid grid-cols-1 gap-4 min-[550px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div className="mt-5 min-w-[250px]">
          <Component
            title="Active Vehicles"
            value={data?.data?.totalVehicle ?? 0}
          >
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </Component>
        </div>
        <div className="mt-5 min-w-[250px]">
          <Component title="Active STS" value={data?.data?.totalSts ?? 0}>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </Component>
        </div>
        <div className="mt-5 min-w-[250px]">
          <Component
            title="Active Landfill"
            value={data?.data?.totalLandfill ?? 0}
          >
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </Component>
        </div>
        <div className="mt-5 min-w-[250px]">
          <Component title="Active Worker" value={data?.data?.totalUser ?? 0}>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </Component>
        </div>
        <div className="mt-5 min-w-[250px]">
          <Component title="Total Garbage Collected" value={data?.data?.totalGurbadgeCollected ?? 0}>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </Component>
        </div>
        <div className="mt-5 min-w-[250px]">
          <Component title="Total Garbage Disposed" value={data?.data?.totalGurbadgeDisposed ?? 0}>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </Component>
        </div>
      </div>
      <Card className="max-w-[550px]">
        <CardContent className="pt-10">
          <ResponsiveContainer width="100%" height={450}>
            <BarChart
              data={[
                {
                  name: "Garbage Collected",
                  total: data?.data?.totalGurbadgeCollected,
                },
                {
                  name: "Garbage Disposed",
                  total: data?.data?.totalGurbadgeDisposed,
                },
              ]}
            >
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              >
                <Label
                  value="Weight in Tonnes"
                  angle={-90}
                  position="insideLeft"
                />
              </YAxis>
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="flex items-center my-5 mt-5">
        <h1 className="text-lg font-semibold md:text-2xl">STS and Landfill Locations</h1>
      </div>
      {isLoading ? (
        <p>Loading.....</p>
      ) : (
        <MyLocation
          landfill={data?.data?.landfill ?? []}
          sts={data?.data?.sts ?? []}
        />
      )}
    </>
  );
};

interface Props {
  landfill: LandfillData[];
  sts: StsData[];
}

function MyLocation({ landfill, sts }: Props) {
  const marker = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });
  return (
    <>
      <div>
        <MapContainer
          center={[23.705335046644926, 90.52195741396255]}
          zoom={10}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {landfill.map((location) => (
            <Marker
              key={
                location?.latitude?.toString() + location?.longitude?.toString()
              }
              position={[location.latitude, location.longitude]}
              icon={marker}
              riseOnHover={true}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}
            >
              <Popup>
                {location.name}
                <br />
                Capacity : {location.capacity}
              </Popup>
            </Marker>
          ))}
          {sts.map((location) => (
            <Marker
              key={location.latitude.toString() + location.longitude.toString()}
              position={[location.latitude, location.longitude]}
              riseOnHover={true}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}
            >
              <Popup>
                {location.name}
                <br />
                Capacity : {location.capacity}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Dashboard;

interface ComponentProps {
  children?: React.ReactNode;
  title: string;
  value: number;
}

function Component({ title, value, children }: ComponentProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
