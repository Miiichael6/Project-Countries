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
import axios from "axios";

// const host = "http://localhost:3001";

export function getAllCountries() {
  return async function (dispatch) {
    return axios
      .get(`/countries`)
      .then((res) => res.data)
      .then((data) => dispatch({ type: GET_ALL_COUNTRIES, payload: data }))
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getCountryDetail(id) {
  return function (dispatch) {
    return axios
      .get(`/countries/${id}`)
      .then((res) => res.data)
      .then((data) => dispatch({ type: GET_COUNTRY_DETAIL, payload: data }))
      .catch((err) => {
        console.log(err);
      });
  };
}

export function searchCountries(data) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/countries?name=${data}`);
      const value = await res.data;
      return dispatch({ type: SEARCH_COUNTRIES, payload: value });
    } catch (err) {
      console.log(err);
    }
  };
}

export function addCountryActivity(data) {
  return async function (dispatch) {
    const response = await axios.post(`/activities`, data);
    return dispatch({ type: ADD_COUNTRY_ACTIVITY, payload: response });
  };
}

// ***********************************************

export function getAllActivities() {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/activities`);
      const value = await res.data;
      return dispatch({ type: GET_ALL_ACTIVITIES, payload: value });
    } catch (err) {
      console.log(err.message);
    }
  };
}

export function deleteActivity(id) {
  return async function (dispatch) {
    axios.delete(`/activities/${id}`);

    return dispatch({ type: DELETE_COUNTRY_ACTIVITY, payload: id });
  };
}

export function filterByActivities(activity) {
  return {
    type: FILTER_BY_ACTIVITIES,
    payload: activity,
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
