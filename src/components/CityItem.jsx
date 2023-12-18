import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

CityItem.propTypes = {
  city: PropTypes.object,
};

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function flagEmojiToPNG(flag) {
    if (!/^[a-zA-Z]+$/.test(flag)) {
      flag = Array.from(flag, (codeUnit) =>
        String.fromCharCode(codeUnit.codePointAt() - 127397).toLowerCase()
      ).join("");
    } else {
      flag = flag.toLowerCase();
    }
    return <img src={`https://flagcdn.com/24x18/${flag}.png`} alt="flag" />;
  }

  const handleClickFunction = function (e) {
    e.preventDefault();
    deleteCity(id);
  };

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClickFunction}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
