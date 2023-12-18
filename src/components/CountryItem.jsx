import PropTypes from "prop-types";
import styles from "./CountryItem.module.css";

CountryItem.propTypes = {
  country: PropTypes.object,
};

function CountryItem({ country }) {
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

  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
