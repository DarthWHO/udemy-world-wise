import { useSearchParams, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";

import useGeolocation from "../hooks/useGeoLocation";
import { useCities } from "../hooks/useCities";
import styles from "../styles/Map.module.css";
import Button from "./Button";

function Map() {
  const {
    isLoading: isLoadingLocation,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation({ lat: 50.92641355593055, lng: -113.96976470947266 });
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([
    geoLocationPosition.lat,
    geoLocationPosition.lng,
  ]);
  const [searchParams] = useSearchParams();

  const mapLat = Number(searchParams.get("lat"));
  const mapLng = Number(searchParams.get("lng"));

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng, setMapPosition]);

  useEffect(() => {
    if (geoLocationPosition) {
      setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingLocation ? "Loading..." : "Use My Location"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={[50.92641355593055, -113.96976470947266]}>
          <Popup>
            The Tibbos, Canada <br /> Happiness!
          </Popup>
        </Marker>
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              {city.cityName}, {city.country} <br /> {city.notes}
            </Popup>
          </Marker>
        ))}
        <ChangeMapPosition position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeMapPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
