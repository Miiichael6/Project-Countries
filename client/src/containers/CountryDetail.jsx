import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllCountries, getCountryDetail } from "../actions/actionsMain";
import ActivitiesDetailList from "../components/ActivitiesDetailList";
import Loader from "../components/Loader";
import CD from "../styles/CountryDetail.module.css";

const CountryDetail = () => {
  const [, setLoader] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.reducerMain.countryDetail);
  const allCountries = useSelector((state) =>
    state.reducerMain.allCountriesCopy.map((i) => i.id)
  );
  console.log(allCountries);

  useEffect(() => {
    setLoader(true);
    dispatch(getCountryDetail(id));
    dispatch(getAllCountries());
    setLoader(false);

    return () => {
      dispatch(getAllCountries([]));
      dispatch(getCountryDetail({}));
    };
  }, [dispatch, id]);

  if (
    allCountries.length > 1 &&
    !allCountries.includes(id) &&
    (id.length !== 3 || !allCountries.includes(id))
    //en caso de que sea igual a 3 pero que no exista en la db
  ) {
    return (
      <div className={CD.ErrorNotFound}>
        <h1 style={{ color: "red" }}>Pais No existente</h1>
        <h3>
          ID incorrecto el id debe de tener solamente <br />3 digitos o
          posiblemente no existe pais con el codigo escrito
        </h3>
        <Link to={"/countries"} className={`${CD.Return}`}>
          Regresar
        </Link>
      </div>
    );
  }

  if (countryDetail.nombre && allCountries.includes(id)) {
    return (
      <div>
        <div className={`${CD.CountryDetailContain}`}>
          {countryDetail.nombre && (
            <div className={`${CD.ImgAndTextContainer}`}>
              <div className={CD.Container1}>
                <h1>{countryDetail.nombre_spa}</h1>
                <div className={CD.ImgCountryContain}>
                  <img
                    src={countryDetail.img_bandera}
                    alt={countryDetail.nombre}
                  />
                </div>
              </div>
              <div className={CD.Container2}>
                <h2>
                  <b>Continent:</b> {countryDetail.continente}
                </h2>
                <p>
                  <b>código:</b> {countryDetail.id.toUpperCase()}
                </p>
                <p>
                  <b>Population:</b> {countryDetail.poblacion}
                </p>
                <p>
                  <b>Area:</b> {countryDetail.area} km<sup>2</sup>
                </p>
                <p>
                  <b>capital:</b> {countryDetail.capital}
                </p>
                <p>
                  <b>subregion:</b> {countryDetail.sub_region}
                </p>
              </div>
            </div>
          )}
          <Link to={"/countries"} className={`${CD.Return}`}>
            Regresar
          </Link>
        </div>
        <div className={`${CD.CountryActivities}`}>
          <div className={`${CD.CountryActTitle}`}>
            <h2>Actividades</h2>
          </div>
          <ActivitiesDetailList countryDetail={countryDetail} />
        </div>
      </div>
    );
  } else {
    return (
      <div className={CD.loaderPosition}>
        <Loader />
      </div>
    );
  }
};

export default CountryDetail;
