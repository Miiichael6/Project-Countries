import React from "react";
import LCTA from "../styles/ListCountriesToAdd.module.css";

const ListCountriesAdd = ({ countries, deleteCountry, countriesAct }) => {
  return (
    <div className={`${LCTA.ListOdCountries}`}>
      {countries.map((i, index) => (
        <div className={LCTA.CountriesAdded} key={i}>
          <img
          className={LCTA.CountryIMG}
            src={countriesAct[index].img_bandera}
            alt={countriesAct[index].nombre}
            onClick={() => deleteCountry(i)}
          />
        </div>
      ))}
    </div>
  );
};

export default ListCountriesAdd;
