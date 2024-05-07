import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { MapContainer, TileLayer } from "react-leaflet";
import locationIcon from '../../assets/location.svg';

interface Props {
  originLat: number;
  originLng: number;
  destinatonLat: number;
  detinationLng: number;
}

function MyLocation({
  originLat,
  originLng,
  destinatonLat,
  detinationLng,
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
      show: false,
      waypoints: [
        L.latLng(destinatonLat, detinationLng),
        L.latLng(originLat, originLng),
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
          L.latLng(destinatonLat, detinationLng),
          L.latLng(originLat, originLng),
        ],
        {
          createMarker: function (i, wp) {
            if( i==1) return L.marker(wp.latLng, { icon: myIcon2 });
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
      const route = e.route;
      console.log(route);
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
          {/* {destinatonLat && <Marker position={[originLat, originLng]} icon={myIcon}></Marker>} */}
          <RoutingMachine />
        </MapContainer>
      </div>
    </>
  );
}

export default MyLocation;
