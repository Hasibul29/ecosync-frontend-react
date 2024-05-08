import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import locationIcon from "../../assets/location.svg";
import { MapData } from "./STSVehicleSelection";

interface Props {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  routeDataRef:React.MutableRefObject<MapData | null>
}

function MyLocation({
  originLat,
  originLng,
  destinationLat,
  destinationLng,
  routeDataRef
}: Props) {
  const myIcon2 = new L.Icon({
    iconUrl: locationIcon,
    iconRetinaUrl: locationIcon,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });
  const myIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
  });

  const createRoutineMachineLayer = () => {
    const instance = L.Routing.control({
      show: true,
      waypoints: [
        L.latLng(originLat, originLng),
        L.latLng(destinationLat, destinationLng),
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 5 }],
        extendToWaypoints: true,
        addWaypoints: true,
        missingRouteTolerance: 5,
      },
      altLineOptions: {
        styles: [{ color: "red", weight: 5 }],
        extendToWaypoints: true,
        addWaypoints: true,
        missingRouteTolerance: 5,
      },
      showAlternatives: true,
      fitSelectedRoutes: true,
      plan: L.Routing.plan(
        [
          L.latLng(originLat, originLng),
          L.latLng(destinationLat, destinationLng),
        ],
        {
          createMarker: function (i, wp) {
            if (i == 0)
              return L.marker(wp.latLng, { draggable: false, icon: myIcon2 });
            if (
              wp.latLng.lat == destinationLat &&
              wp.latLng.lng == destinationLng
            )
              return L.marker(wp.latLng, { draggable: false, icon: myIcon });
            return L.marker(wp.latLng, {
              draggable: true,
              icon: myIcon,
            });
          },
          routeWhileDragging: true,
        }
      ),
    });

    instance.on("routeselected", function (e) {
      const route = e.route as RouteInterface;
      const newData = {
        totalTime: route.summary.totalTime,
        totalDistance: route.summary.totalDistance,
        wayPoints: {
          origin: {
            latitude: route.inputWaypoints[0].latLng.lat,
            longitude: route.inputWaypoints[0].latLng.lng,
          },
          destination: {
            latitude: route.inputWaypoints[1].latLng.lat,
            longitude: route.inputWaypoints[1].latLng.lng,
          },
        },
        createdAt: new Date(),
        routeList: [
          ...route.coordinates.map((c) => ({
            latitude: c.lat,
            longitude: c.lng,
          })),
        ],
      };
      routeDataRef.current = newData;
    });
    return instance;
  };
  const RoutingMachine = createControlComponent(createRoutineMachineLayer);


  return (
    <>
      <div>
        <MapContainer
          center={[originLat, originLng]}
          zoom={13}
          scrollWheelZoom={true}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!destinationLat && (
            <Marker position={[originLat, originLng]} icon={myIcon2}></Marker>
          )}
          {destinationLat && <RoutingMachine/>}
        </MapContainer>
      </div>
    </>
  );
}

export default MyLocation;

interface RouteInterface {
  coordinates: Coordinate[];
  summary: Summary;
  inputWaypoints: InputWaypoint[];
}

interface Coordinate {
  lat: number;
  lng: number;
}

interface Summary {
  totalDistance: number;
  totalTime: number;
}

interface InputWaypoint {
  latLng: LatLng;
}

interface LatLng {
  lat: number;
  lng: number;
}
