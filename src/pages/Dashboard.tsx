import { DollarSign } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useStats, { LandfillData, StsData } from "@/hooks/useStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import L from "leaflet";
import markerIcon from "../assets/marker.svg";
import { Bar, BarChart, Label, ResponsiveContainer, XAxis, YAxis } from "recharts"


const Dashboard = () => {
  const { data, isLoading, error } = useStats();
  
  return (
    <>
      <div className=" mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
        <div className="mt-5">
          <Component title="Active Vehicles" value={data?.data?.totalVehicle ?? 0} > <DollarSign className="h-4 w-4 text-muted-foreground" /></Component>
        </div>
        <div className="mt-5">
          <Component title="Active STS" value={data?.data?.totalSts ?? 0} > <DollarSign className="h-4 w-4 text-muted-foreground" /></Component>
        </div>
        <div className="mt-5">
          <Component title="Active Landfill" value={data?.data?.totalLandfill ?? 0} > <DollarSign className="h-4 w-4 text-muted-foreground" /></Component>
        </div>
        <div className="mt-5">
          <Component title="Active Worker" value={data?.data?.totalUser ?? 0} > <DollarSign className="h-4 w-4 text-muted-foreground" /></Component>
        </div>
      </div>
      <ResponsiveContainer width={600} height={450}>
      <BarChart data={ [{ name : "Gurbadge Collected" ,  total : data?.data?.totalGurbadgeCollected},{ name : "Gurbadge Disposed" ,  total : data?.data?.totalGurbadgeDisposed}]}>
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
        ><Label value="Weight in Tonnes" angle={-90} position="insideLeft" /></YAxis>
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
      {error && <p>{error.message}</p>}
      {isLoading ? (
        <p>Loading.....</p>
      ) : (
        <MyLocation
          landfill={data?.data?.landfill ?? [] }
          sts={data?.data?.sts ?? [] }
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
    iconRetinaUrl:markerIcon,
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
              key={location?.latitude?.toString() + location?.longitude?.toString()}
              position={[location.latitude, location.longitude]}
              icon={marker}
              riseOnHover={true}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}
              
            ><Popup>{location.name}<br/>Capacity : {location.capacity}</Popup></Marker>
          ))}
          {sts.map((location) => (
            <Marker
              key={location.latitude.toString() + location.longitude.toString()}
              position={[location.latitude, location.longitude]}
              riseOnHover={true}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
              }}
            ><Popup>{location.name}<br/>Capacity : {location.capacity}</Popup></Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}

export default Dashboard;

interface ComponentProps {
  children?: React.ReactNode;
  title : string;
  value : number;
}

function Component({ title, value , children }: ComponentProps) {
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
