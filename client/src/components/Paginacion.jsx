import React from "react";
import { NavLink } from "react-router-dom";
import Pag from "../styles/Paginacion.module.css";

const Paginacion = ({ countryPerPage, dataLength, paginate }) => {
  const pageNumbers = []; // ?  [1, 2, 3, 4, ..., 24, 25]

  // ?                        original 250 / 10 = 25  i <= 25
  // * dependiendo de dataLength, cambiará y se dividirá entre 10
  // * redondeando
  // * hacia arriba
  for (let i = 1; i <= Math.ceil(dataLength / countryPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${Pag.PaginacionContainer}`}>
      <ul className={`${Pag.ListaDePaginacion}`}>
        {pageNumbers.map((i) => (
          <li key={i}>
            <NavLink
              exact
              className={(act) => (act ? "active" : "desactive")}
              to={"/countries"}
              onClick={(e) => paginate(e, i)}
            >
              {i}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginacion;
