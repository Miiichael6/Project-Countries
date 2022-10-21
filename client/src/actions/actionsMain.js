import {
  ADD_COUNTRY_ACTIVITY,
  DELETE_COUNTRY_ACTIVITY,
  FILTER_ALL_MY_COUNTRIES,
  FILTER_BY_ACTIVITIES,
  GET_ALL_ACTIVITIES,
  GET_ALL_COUNTRIES,
  GET_COUNTRY_DETAIL,
  SEARCH_COUNTRIES,
  WAY_TO_ORDER_COUNTRIES,
} from "../types/typesMain";

export function getAllCountries() {
  return async function (dispatch) {
    try {
      const res = await fetch(`http://localhost:3001/countries`);
      const data = await res.json();
      return dispatch({ type: GET_ALL_COUNTRIES, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCountryDetail(id) {
  return async function (dispatch) {
    try {
      const res = await fetch(`http://localhost:3001/countries/${id}`);
      const data = await res.json();
      return dispatch({ type: GET_COUNTRY_DETAIL, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function searchCountries(data) {
  return async function (dispatch) {
    try {
      const res = await fetch(`http://localhost:3001/countries?name=${data}`);
      const value = await res.json();
      return dispatch({ type: SEARCH_COUNTRIES, payload: value });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addCountryActivity(data) {
  return async function (dispatch) {
    const response = await fetch("http://localhost:3001/activities", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return { type: ADD_COUNTRY_ACTIVITY, payload: response };
  };
}

export function filterAllMyCountries(data) {
  return {
    type: FILTER_ALL_MY_COUNTRIES,
    payload: data,
  };
}

export function wayToOrderCountries(way) {
  return {
    type: WAY_TO_ORDER_COUNTRIES,
    payload: way,
  };
}

// ***********************************************

export function getAllActivities() {
  return async function (dispatch) {
    try {
      const res = await fetch(`http://www.localhost:3001/activities`);
      const value = await res.json();
      return dispatch({ type: GET_ALL_ACTIVITIES, payload: value });
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function filterByActivities(activity) {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload: activity,
  };
}

export function deleteActivity(id) {
  return async function (dispatch) {
    await fetch(`http://www.localhost:3001/activities/${id}`, {
      method: "DELETE",
    });
    return dispatch({ type: DELETE_COUNTRY_ACTIVITY, payload: id });
  }
}
