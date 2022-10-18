import React from "react";
import { Link } from "react-router-dom";
import C from "../styles/Country.module.css";

const Country = ({ id, nombre, nombre_spa, img_bandera, continente }) => {
  return (
    <figure className={`${C.CountryContainer}`}>
      <Link to={`countries/${id}`}>
      <div className={C.CountryImgContainer}>
        <img src={img_bandera} alt={nombre} />
      </div>
      <div className={`${C.TextCountry}`}>
        <h3>
          <Link to={`countries/${id}`}>{nombre_spa}</Link>
        </h3>
        <p>{continente}</p>
      </div>
      </Link>
    </figure>
  );
};

export default Country;
