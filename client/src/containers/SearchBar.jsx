import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchCountries } from "../actions/actionsMain";
import S from "../styles/Search.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [error, setError] = useState(true);

  const handleError = (text) => {
    let validate = new RegExp("^[áéíóúÁÉIÓÚña-zA-Z ]+$");
    if (!validate.test(text)) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handlerChange = (e) => {
    handleError(e.target.value);
    setSearch(e.target.value);
  };

  useEffect(() => {}, [error, search, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) dispatch(searchCountries(search));
    setSearch("");
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={`${S.SearchBarStyles}`}>
      <div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Busca un Pais..."
          className={`${S.InputSearch} ${error && search.length > 0 ? S.errors : S.sucess}`}
          value={search}
          onChange={(e) => handlerChange(e)}
          autoComplete="off"
        />
        <div>
          {error && search.length > 0 && <p>solo Letras son permitidas</p>}
        </div>
      </div>
      <br />
      <div>
        <button type="submit" disabled={error} className={S.ButtonSearch}>
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
