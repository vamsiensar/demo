import { useCities } from "../context/CitiesContext";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";

function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add your first by clicking on the map" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((el) => (
        <CityItem key={el.id} city={el} />
      ))}
    </ul>
  );
}

export default CityList;
