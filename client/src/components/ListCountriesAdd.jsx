import React from "react";
import LCTA from "../styles/ListCountriesToAdd.module.css";

const ListCountriesAdd = ({ countries, deleteCountry, countriesAct }) => {
  return (
    <div className={`${LCTA.ListOdCountries}`}>
      {countries.map((i, index) => (
        <div className={LCTA.CountriesAdd} key={i}>
          <img
            src={countriesAct[index].img_bandera}
            alt={countriesAct[index].nombre}
          />
          <button onClick={() => deleteCountry(i)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default ListCountriesAdd;
