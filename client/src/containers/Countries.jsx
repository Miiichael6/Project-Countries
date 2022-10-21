import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCountries } from "../actions/actionsMain";
import Paginacion from "../components/Paginacion";
import DisplayAllCountries from "./DisplayAllCountries";
import Form from "./Form";
import SearchBar from "./SearchBar";

const Countries = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.reducerMain.allCountries);
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage] = useState(10);
  const [firstPage, setFirstPage] = useState(0);

  useEffect(() => {
    dispatch(getAllCountries());
    return () => {
      dispatch(getAllCountries([]));
    };
  }, [dispatch]);

  const indexOfLastCountries = currentPage * countryPerPage; //? 1 * 10
  const indexOfFirstCountries = indexOfLastCountries - countryPerPage; //*
  let currentCountries;
  if (firstPage === 0) {
    setTimeout(() => {
      setFirstPage(1)
    }, 300)
    currentCountries = data.slice(currentPage, countryPerPage - 1);
    // setFirstPage(1);
  } else {
    currentCountries = data.slice(indexOfFirstCountries, indexOfLastCountries);
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <SearchBar />
      <Form />
      <Paginacion
        countryPerPage={countryPerPage}
        dataLength={data.length}
        paginate={paginate}
      />
      {<DisplayAllCountries data={currentCountries} />}
    </div>
  );
};

export default Countries;
