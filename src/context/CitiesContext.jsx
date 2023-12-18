import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

const reducer = function (state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((el) => el.id != action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("UnKnown Action Type!!");
  }
};

const CitiesProvider = function ({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async function () {
      dispatch({ type: "loading" });
      try {
        const data = await fetch(`${BASE_URL}/cities`);
        const response = await data.json();
        dispatch({ type: "cities/loaded", payload: response });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: `The Error Message: There is an Error loading the cities...`,
        });
      }
    };

    fetchCities();
  }, []);

  const getCity = async function (id) {
    if (+id === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const data = await fetch(`${BASE_URL}/cities/${id}`);
      const response = await data.json();
      dispatch({ type: "city/loaded", payload: response });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `The Error Message: There is an Error loading the city...`,
      });
    }
  };

  const createCity = async function (newCity) {
    dispatch({ type: "loading" });
    try {
      const data = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      dispatch({ type: "city/created", payload: response });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `The Error Message: There is an Error adding the city...`,
      });
    }
  };

  const deleteCity = async function (id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: `The Error Message: There is an Error deleting the city...`,
      });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = function () {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside the CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };
