import React from "react";
import { Link } from "react-router-dom";
import Pag from "../styles/Paginacion.module.css";

const Paginacion = ({
  currentPage,
  handlePrev,
  handleNext,
  dataLength,
  paginate,
  next,
  prev,
}) => {
  const pageNumbers = []; // ?  [1, 2, 3, 4, ..., 24, 25]
  // ?                        original 250 / 10 = 25  i <= 25
  // * dependiendo de dataLength, cambiará y se dividirá entre 10
  // * redondeando hacia arriba
  // * hacia arriba
  let longitud = Math.ceil(dataLength / 10);

  for (let i = 1; i <= longitud; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={`${Pag.PaginacionContainer}`}>
      <ul className={`${Pag.ListaDePaginacion}`}>
        {pageNumbers.map((i) => (
          <li key={i}>
            <Link
              className={Pag}
              to={"/countries"}
              onClick={(e) => paginate(e, i)}
            >
              {i}
            </Link>
          </li>
        ))}
      </ul>
      <div className={Pag.BotonesDeNavegacion}>
        {prev && (
          <button className={Pag.ButtomOfPaginado} onClick={() => handlePrev()}>
            Prev
          </button>
        )}
        <h3>{currentPage}</h3>
        {next && (
          <button className={Pag.ButtomOfPaginado} onClick={() => handleNext()}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Paginacion;
