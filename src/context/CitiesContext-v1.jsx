import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

const CitiesProvider = function ({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async function () {
      try {
        setIsLoading(true);
        const data = await fetch(`${BASE_URL}/cities`);
        const response = await data.json();
        setCities(response);
      } catch (error) {
        console.log(`The Error Message: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async function (id) {
    try {
      setIsLoading(true);
      const data = await fetch(`${BASE_URL}/cities/${id}`);
      const response = await data.json();
      setCurrentCity(response);
    } catch (error) {
      console.log(`The Error Message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async function (newCity) {
    try {
      setIsLoading(true);
      const data = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      setCities((cities) => [...cities, response]);
    } catch (error) {
      console.log(`The Error Message: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async function (id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((el) => el.id !== id));
    } catch (error) {
      console.log(`The Error Message: An error deleting the city`);
    } finally {
      setIsLoading(false);
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
