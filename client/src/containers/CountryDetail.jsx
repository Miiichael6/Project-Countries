import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../actions/actionsMain";
import ActivitiesDetailList from "../components/ActivitiesDetailList";
import Loader from "../components/Loader";
import CD from "../styles/CountryDetail.module.css";

const CountryDetail = () => {
  const [loader, setLoader] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.reducerMain.countryDetail);

  useEffect(() => {
    setLoader(true);
    dispatch(getCountryDetail(id));
    setLoader(false);

    return () => {
      dispatch(getCountryDetail({}));
    };
  }, [id, dispatch]);

  const none = id.length < 4 && Object.entries(countryDetail).length > 1;

  return (
    <>
      {loader && (
        <div style={{ marginLeft: "25%" }}>
          <Loader />
        </div>
      )}
      {id.length < 4 && Object.entries(countryDetail).length > 1 && (
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
                    <b>codigo:</b> {countryDetail.id.toUpperCase()}
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
      )}
      {!none && (
        <div style={{ color: "white", textAlign: "center" }}>
          <h1 style={{ marginTop: "15rem", marginBottom: "2rem" }}>
            No se encontró el pais
          </h1>
          <h3 style={{ color: "#f2f2f2" }}>id incorrecto</h3>
          <Link to={"/countries"} className={`${CD.Return}`}>
            Regresar
          </Link>
        </div>
      )}
    </>
  );
};

export default CountryDetail;
