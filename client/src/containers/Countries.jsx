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
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countryPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllCountries());
    setLoading(false);

    return () => {
      dispatch(getAllCountries([]))
    }
  }, [dispatch]);

  const indexOfLastCountries = currentPage * countryPerPage;
  const indexOfFirstCountries = indexOfLastCountries - countryPerPage;
  const currentCountries = data.slice(
    indexOfFirstCountries,
    indexOfLastCountries
  );

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
        total={data.length}
        paginate={paginate}
      />
      {<DisplayAllCountries loading={loading} data={currentCountries} />}
    </div>
  );
};

export default Countries;
