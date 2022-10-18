import React from "react";
import { NavLink } from "react-router-dom";
import Pag from "../styles/Paginacion.module.css";

const Paginacion = ({ countryPerPage, total, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total / countryPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${Pag.PaginacionContainer}`}>
        <ul className={`${Pag.ListaDePaginacion}`}>
          {pageNumbers.map((i) => (
            <li key={i}>
              <NavLink exact to="/countries" onClick={(e) => paginate(e, i)}
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
                {i}
              </NavLink>
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Paginacion;
