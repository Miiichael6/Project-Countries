import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAllMyCountries,
  filterByActivities,
  getAllActivities,
  wayToOrderCountries,
} from "../actions/actionsMain";
import F from "../styles/Form.module.css";
// import { getOrderCountries, searchCountries } from "../actions/actionsMain";

const Form = ({setCurrentPage}) => {
  const dispatch = useDispatch();
  const activities = useSelector(
    (state) => state.reducerMain.allActivitiesCopy
  );

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const handlerChangeOrder = (e) => {
    dispatch(wayToOrderCountries(e.target.value));
    setCurrentPage(1)
  };

  const handlerChangeFilter = (e) => {
    dispatch(filterAllMyCountries(e.target.value));
    setCurrentPage(1)
  };

  const handlerFilterByActivity = (e) => {
    dispatch(filterByActivities(e.target.value));
  };

  return (
    <div className={`${F.FormasDeOrdenamiento}`}>
      <div>
        <label htmlFor="continent">Continente: </label>
        <br />
        <select id="continent" onChange={(e) => handlerChangeFilter(e)}>
          <option value="">---</option>
          <option value="">Todos</option>
          <option value="Asia">Asia</option>
          <option value="Oceania">Oceania</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Africa">Africa</option>
          <option value="South America">South America</option>
        </select>
      </div>
      <div>
        <label htmlFor="ordernamiento">orden: </label>
        <br />
        <select id="ordenamiento" onChange={(e) => handlerChangeOrder(e)}>
          <option value="">---</option>
          <option value="a-z">A-Z</option>
          <option value="a-z-desc">Z-A</option>
          <option value="population">Mayor-Menor Poblacion</option>
          <option value="population-desc">Menor-Mayor Poblacion</option>
        </select>
      </div>
      <div>
        <label htmlFor="activity">Actividad</label>
        <br />
        <select
          name="activity"
          id="activity"
          onChange={(e) => handlerFilterByActivity(e)}
        >
          <option value="">---</option>
          {activities.map((i) => (
            <option key={i.id} value={i.nombre}>
              {i.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Form;
