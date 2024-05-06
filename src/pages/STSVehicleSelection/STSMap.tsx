import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import useUserStore from "@/store";

function MyLocation() {
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
        {/* <Marker position={[23.705335046644926, 90.52195741396255]}></Marker>
        <Marker position={[24.705335046644926, 90.52195741396255]}></Marker> */}
        {/* <RoutingMachine position={"topright"}/> */}
      </MapContainer>
    </div>
    </>
  );
}




const createRoutineMachineLayer = () => {
  const { user } = useUserStore();

  const lat = user.stsManager?.latitude;
  const lng = user.stsManager?.longitude;
  const instance = L.Routing.control({
    show:false,
    waypoints: [
      L.latLng( lat ?? 23.693969600764312, lng ?? 90.48080785993155),
      L.latLng(23.693969600764312, 90.48080785993155)
    ],
    lineOptions: {
      styles: [{ color: "#6FA1EC", weight: 5 }],
      extendToWaypoints: true,
      addWaypoints: true,
      missingRouteTolerance: 5
    },
    altLineOptions: {
      styles: [{ color: "red", weight: 5 }],
      extendToWaypoints: true,
      addWaypoints: true,
      missingRouteTolerance: 5
    },
    showAlternatives: true,
    fitSelectedRoutes: true,
  });
  
  instance.on('routeselected', function(e) {
    const route = e.route
    console.log(route)
 })
  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default MyLocation;