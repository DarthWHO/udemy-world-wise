import { useEffect, useState } from "react";

import useURLPosition from "../hooks/useURLPosition";
import styles from "../styles/Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import Flag from "./Flag";
import Message from "./Message";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_API_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useURLPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState(null);

  useEffect(() => {
    async function fetchCityData() {
      if (!lat || !lng) return;

      try {
        setGeoCodingError(null);
        setIsLoadingGeocoding(true);
        const res = await fetch(
          `${BASE_API_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "No country found for the provided coordinates, please select somewhere else"
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setCountryCode(data.countryCode || "");
        setEmoji(convertToEmoji(data.countryCode || ""));
      } catch (err) {
        console.error(err);
        setGeoCodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (geoCodingError) return <Message message={geoCodingError} />;  

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={isLoadingGeocoding ? "Getting location..." : cityName}
        />
        <span className={styles.flag}>
          {emoji ? <Flag flag={emoji} /> : null}
        </span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={() => {}}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
