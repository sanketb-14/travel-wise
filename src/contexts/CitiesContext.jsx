import { createContext, useReducer, useEffect, useContext } from "react";
const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

const initialState = {
  cities: [],
  isLoading: false,
  selectCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "isLoading":
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
        selectCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return "unknown action type";
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, selectCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [isLoading, setIsLoading] = useState(false);
  // const [selectCity,setSelectCity] = useState({})

  useEffect(function () {
    async function fetchCity() {
      try {
        const result = await fetch(`${BASE_URL}/cities`);
        const data = await result.json();
        dispatch({
          type: "cities/loaded",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "there was error in loading data",
        });
      }
    }
    fetchCity();
  }, []);

  async function getCity(id) {
    dispatch({ type: "isLoading" });
    try {
      const result = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await result.json();
      dispatch({
        type: "city/loaded",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was error in loading a select city data",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "isLoading" });
    try {
      const result = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await result.json();
      dispatch({
        type: "city/created",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error creating city",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "isLoading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "city/deleted",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "there was an error in deleting a city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        selectCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("context not found in cities provider");
  return context;
};
export { CitiesProvider, useCities };
