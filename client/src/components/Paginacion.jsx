import React from "react";
import { Link } from "react-router-dom";
import Pag from "../styles/Paginacion.module.css";

const Paginacion = ({ countryPerPage, dataLength, paginate }) => {
  const pageNumbers = []; // ?  [1, 2, 3, 4, ..., 24, 25]
  // ?                        original 250 / 10 = 25  i <= 25
  // * dependiendo de dataLength, cambiará y se dividirá entre 10
  // * redondeando hacia arriba
  // * hacia arriba
  let longitud = Math.ceil(dataLength / countryPerPage);
  let longTotal =
    countryPerPage === 9 && dataLength === 250 ? longitud - 3 : longitud;

  for (let i = 1; i <= longTotal; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${Pag.PaginacionContainer}`}>
      <ul className={`${Pag.ListaDePaginacion}`}>
        {pageNumbers.map((i) => (
          <li key={i}>
            <Link
              className={Pag.pagina_1}
              to={"/countries"}
              onClick={(e) => paginate(e, i)}
            >
              {i}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paginacion;
