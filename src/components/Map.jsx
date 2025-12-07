import { useNavigate, useSearchParams } from "react-router-dom";

import styles from "../styles/Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div
      className={styles.mapContainer}
      onClick={() => {
        navigate("form");
      }}
    >
      <div className={styles.map}>
        {lat} {lng}
      </div>
    </div>
  );
}

export default Map;
