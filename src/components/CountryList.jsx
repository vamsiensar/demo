import { useCities } from "../context/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first by clicking on the map" />;

  const countries = cities.reduce(
    (acc, el) =>
      // !acc.find((ac) => ac.country === el.country)
      !acc.map((el) => el.country).includes(el.country)
        ? [...acc, { emoji: el.emoji, country: el.country }]
        : acc,
    []
  );

  return (
    <ul className={styles.countryList}>
      {countries.map((el) => (
        <CountryItem country={el} key={el.country} />
      ))}
    </ul>
  );
}

export default CountryList;
