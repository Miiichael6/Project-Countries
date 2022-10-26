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

  useEffect(() => {
    dispatch(getAllCountries());
    return () => {
      dispatch(getAllCountries([]));
    };
  }, [dispatch]);

  const indexOfLastCountries = currentPage * countryPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countryPerPage; //* 10 - 10 = 0 / 20 - 10, etc etc
  let currentCountries;

  if (currentPage === 1) {
    currentCountries = data.slice(
      indexOfFirstCountries, // 
      indexOfLastCountries - 1 // 
    ); // ? 40, 49 = [...,    ,...] * [1  ...   9]
  } else {
    currentCountries = data.slice(
      indexOfFirstCountries,
      indexOfLastCountries
    ); // ? 40, 50 = [...,    ,...] [40  ...   50]
  }

  const paginate = (e, pageNumber) => {
    // e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const setToFirstPage = () => {
    setCurrentPage(1);
  }

  return (
    <div>
      <SearchBar setToFirstPage={setToFirstPage}/>
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
