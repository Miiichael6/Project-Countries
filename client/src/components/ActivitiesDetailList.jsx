import React from "react";
import ADL from "../styles/ActivityDetailList.module.css";

const ActivitiesDetailList = ({ countryDetail }) => {
  return (
    <div className={`${ADL.ActivitiesListData}`}>
      {countryDetail.activities && countryDetail.activities.length > 0 ? (
        countryDetail.activities.map((i) => (
          <div key={i.id} className={`${ADL.Activity}`}>
            <h3>{i.nombre}</h3>
            <p>duracion: {i.duracion} horas</p>
            <p>dificultad: {i.dificultad}/5</p>
            <p>Temporada: {i.temporada}</p>
            {console.log(i)}
          </div>
        ))
      ) : (
        <h3>sin actividades aun</h3>
      )}
    </div>
  );
};

export default ActivitiesDetailList;
