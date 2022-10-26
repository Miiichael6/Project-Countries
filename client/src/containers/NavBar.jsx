import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCountries } from "../actions/actionsMain";
import N from "../styles/NavBar.module.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.props.getAllCountries();
  }

  render() {
    return (
      <header>
        <div className={`${N.LogoLyric}`}>
          <h3 onClick={() => this.handleShow()}>
            <Link to={"/countries"}>CountryApp</Link>
          </h3>
        </div>
        <div className={`${N.LogoWorld}`}>
          <Link to={"/countries"}>
            <img
              src="https://cdn.shopify.com/s/files/1/0254/0516/1520/files/logo.gif?v=1613717913"
              alt="world"
              onClick={() => this.handleShow()}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: () => dispatch(getAllCountries()),
  };
};

export default connect(null, mapDispatchToProps)(NavBar);
