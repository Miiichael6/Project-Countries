import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteActivity, getAllActivities } from "../actions/actionsMain";
import ATV from "../styles/Activities.module.css";
import deleteIMG from "../imgs/deleteIMG.svg";

const Activities = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.reducerMain.allActivities);

  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  const handleDelete = (id) => {
    const areYouSure$ = window.confirm(
      "Estas Seguro(a) de borrar esta actividad? , esto la borrará en todos los paises relacionados"
    );
    if (areYouSure$) {
      dispatch(deleteActivity(id));
    }
  };

  return (
    <>
      <div className={ATV.ActivitiesContainer}>
        {state.length > 0 ? (
          state.map((i) => (
            <div key={i.id} className={ATV.ActivityCard}>
              <div className={ATV.ContentCard}>
                <h3>{i.nombre}</h3>
                <p>
                  <b>dificultad:</b> {i.dificultad}/5
                </p>
                <p>
                  <b>duracion:</b> {i.duracion} hora(s)
                </p>
                <p>
                  <b>Temporada: </b>
                  {i.temporada === "Otonio" ? "Otoño" : i.temporada}
                </p>
                <button onClick={() => handleDelete(i.id)}>
                  <b>
                    <img src={deleteIMG} alt="delete" />
                  </b>
                </button>
              </div>
            </div>
          ))
        ) : (
          <h2>Sin Actividades</h2>
        )}
      </div>
    </>
  );
};

export default Activities;
