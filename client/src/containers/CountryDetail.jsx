import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getCountryDetail } from "../actions/actionsMain";
import ActivitiesDetailList from "../components/ActivitiesDetailList";
import Loader from "../components/Loader";
import CD from "../styles/CountryDetail.module.css";

const CountryDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.reducerMain.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(id));

    return () => {
      dispatch(getCountryDetail({}));
    };
  }, [id, dispatch]);

  console.log(countryDetail.activities);

  return (
    <>
      <div className={`${CD.CountryDetailContain}`}>
        {countryDetail.nombre ? (
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
        ) : (
          <Loader />
        )}
        <Link to={"/countries"} className={`${CD.Return}`}>
          Regresar
        </Link>
      </div>
      <div className={`${CD.CountryActivities}`}>
        <div className={`${CD.CountryActTitle}`}>
        <h2>Actividades</h2>
        </div>
        <ActivitiesDetailList countryDetail={countryDetail}/>
      </div>
    </>
  );
};

export default CountryDetail;
