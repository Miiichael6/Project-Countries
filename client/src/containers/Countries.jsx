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
  const [next, setNext] = useState(true);
  const [prev, setPrev] = useState(true);

  useEffect(() => {
    dispatch(getAllCountries());
    return () => dispatch(getAllCountries());
  }, [dispatch]);

  const indexOfLastCountries = currentPage * countryPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countryPerPage; // 10 - 10 = 0 / 20 - 10, etc etc
  let currentCountries;

  // Logica de 1 en el primero 9 y 10 en los demas
  if (currentPage === 1) {
    currentCountries = data.slice(
      indexOfFirstCountries, //
      indexOfLastCountries - 1 //
    ); //  40, 49 = [...,    ,...] * [1  ...   9]
  } else {
    currentCountries = data.slice(indexOfFirstCountries, indexOfLastCountries); //  40, 50 = [...,    ,...] [40  ...   50]
  }

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  const setToFirstPage = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    if (currentPage === 1) setPrev(false);
    else setPrev(true);
    if (currentPage === Math.ceil(data.length / 10)) setNext(false);
    else setNext(true);
  }, [currentPage, data.length]);

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPrev(true);
      setCurrentPage(currentPage - 1);
    } else {
      setPrev(false);
      return;
    }
  };
  const handleNext = () => {
    if (currentPage < data.length / 10) {
      setNext(true);
      setCurrentPage(currentPage + 1);
    } else {
      setNext(false);
      return;
    }
  };

  // explicar la paginacion
  return (
    <div>
      <SearchBar setToFirstPage={setToFirstPage} />
      <Form setCurrentPage={setCurrentPage} />
      <Paginacion
        handlePrev={handlePrev}
        handleNext={handleNext}
        countryPerPage={countryPerPage}
        dataLength={data.length}
        paginate={paginate}
        next={next}
        prev={prev}
        currentPage={currentPage}
      />
      {<DisplayAllCountries data={currentCountries} />}
    </div>
  );
};

export default Countries;
