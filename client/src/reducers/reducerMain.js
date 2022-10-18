import {
  FILTER_ALL_MY_COUNTRIES,
  FILTER_BY_ACTIVITIES,
  GET_ALL_ACTIVITIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  SEARCH_COUNTRIES,
  WAY_TO_ORDER_COUNTRIES,
} from "../types/typesMain";

const initialState = {
  allActivities: [],
  allActivitiesCopy: [],
  allCountries: [],
  allCountriesCopy: [],
  countryDetail: {},
};

export default function reducerMain(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
        allCountriesCopy: action.payload,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: { ...action.payload[0] },
      };
    case SEARCH_COUNTRIES:
      return {
        ...state,
        allCountries: action.payload,
      };
    case FILTER_ALL_MY_COUNTRIES:
      const myCountries = state.allCountriesCopy;
      const paisesFiltrados =
        action.payload === ""
          ? myCountries
          : myCountries.filter((i) => i.continente === action.payload);
      return {
        ...state,
        allCountries: paisesFiltrados,
      };
    case WAY_TO_ORDER_COUNTRIES:
      const dataNormal = state.allCountries;
      let dataCopy = JSON.parse(JSON.stringify(dataNormal));
      if (action.payload === "a-z") {
        return {
          ...state,
          allCountries: dataCopy.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          ),
        };
      } else if (action.payload === "population") {
        return {
          ...state,
          allCountries: dataCopy.sort((a, b) => b.poblacion - a.poblacion),
        };
      } else if (action.payload === "a-z-desc") {
        return {
          ...state,
          allCountries: dataCopy.sort((a, b) =>
            b.nombre.localeCompare(a.nombre)
          ),
        };
      } else if (action.payload === "population-desc") {
        return {
          ...state,
          allCountries: dataCopy.sort((a, b) => a.poblacion - b.poblacion),
        };
      } else {
        return { ...state, allCountries: state.allCountriesCopy };
      }

    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        allActivities: action.payload,
        allActivitiesCopy: action.payload,
      };
    case FILTER_BY_ACTIVITIES:
      const dataOriCopy = JSON.parse(JSON.stringify(state.allCountriesCopy));
      const allCountryFiltered = action.payload
        ? dataOriCopy.filter((i) => {
            const activityNames = i.activities.map((i) => i.nombre);
            const existe = activityNames.includes(action.payload);
            return existe ? i : null;
          })
        : dataOriCopy;

      return {
        ...state,
        allCountries: allCountryFiltered,
      };

    default:
      return { ...state };
  }
}
