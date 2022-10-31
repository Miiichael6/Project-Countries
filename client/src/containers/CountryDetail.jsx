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
  }, []);

  if (id.length !== 3) {
    return (
      <div className={CD.ErrorNotFound}>
        <h1>Pais No existente</h1>
        <h3>
          ID incorrecto el id debe de tener solamente <br />3 digitos
        </h3>
        <Link to={"/countries"} className={`${CD.Return}`}>
          Regresar
        </Link>
      </div>
    );
  }

  return (
    <>
      {loader && (
        <div style={{ marginLeft: "38%" }}>
          <Loader />
        </div>
      )}
      {id.length === 3 && Object.entries(countryDetail).length > 1 && (
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
    </>
  );
};

// Hola Antony Muy buenas Tardes, me acabo de Percatar que se Sacaron de mi grupo, hubo un inconveniente con lo del tema de mi PI ,la luz se fue en todo mi vecindario y no pude dar mi defensa , le llamé a un compañero mío para que pueda hacer visible mi problema y le Avisó a Cecilia Morlacchi, ya que yo hice todo mi PI, y me considero con todas las capacidades de poder seguir con el PF, pero por dicho problema de Electricidad Sin previo aviso de la Compañía de Luz se me hizo injusto que no pueda dar mi defensa. Cecilia , Mi Evaluadora dijo que haría visible mi Caso y que se lo llevaría  a la directiva y me daría una respuesta hasta el lunes. ya que el tema de la electricidad fue algo imprevisto. no sé si podría recuperarlo.
export default CountryDetail;
