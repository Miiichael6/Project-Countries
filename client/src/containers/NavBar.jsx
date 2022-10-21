import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries } from "../actions/actionsMain";
import N from "../styles/NavBar.module.css";
// import Form from "./Form";
// import SearchBar from "./SearchBar";
// import { Link } from 'react-router-dom'

const NavBar = () => {
  const dispatch = useDispatch();
  // const state = useSelector(state => state.reducerMain.allCountries)

  const handleShow = () => {
    dispatch(getAllCountries());
  };

  return (
    <header>
      <div className={`${N.LogoLyric}`}>
        <h3 onClick={() => handleShow()}>
          <Link to={"/countries"}>CountryApp</Link>
        </h3>
      </div>
      <div className={`${N.LogoWorld}`}>
        <Link to={"/countries"}>
          <img
            src="https://cdn.shopify.com/s/files/1/0254/0516/1520/files/logo.gif?v=1613717913"
            alt="world"
            onClick={() => handleShow()}
          />
        </Link>
      </div>
      <div className={`${N.CreateActivity}`}>
        <Link to={"/activities"}>Actividades</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/create/countries"}>Crear Actividad</Link>
      </div>
    </header>
  );
};

export default NavBar;
