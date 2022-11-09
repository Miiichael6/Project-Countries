import React, { useEffect, useState } from "react";
import Country from "./Country";
import Loader from "../components/Loader";
import Sections from "../styles/Sections.module.css";
import { useSelector } from "react-redux";
const stylee = { color: "#fff", marginTop: "17rem" };

const DisplayAllCountries = ({ data }) => {
  const [loader, setLoader] = useState(false);
  const countries = useSelector((state) => state.reducerMain.allCountries);

  useEffect(() => {
    if (data.length < 1) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 5000);
    } else setLoader(false);
  }, [data.length]);

  if (data.length === 0 && countries.length !== 0) {
    data = countries;
  }

  return (
    <section id={"Section"} className={Sections.SectionCoutriesLoad}>
      {loader && <Loader />}
      {data.length === 0 && !loader && (
        <h1 style={stylee}>No se Encontró el/los Pais(es)</h1>
      )}
      {data.length &&
        data.map((i) => (
          <Country
            key={i.id}
            id={i.id}
            area={i.area}
            capital={i.capital}
            continente={i.continente}
            img_bandera={i.img_bandera}
            nombre={i.nombre}
            nombre_spa={i.nombre_spa}
            poblacion={i.poblacion}
            sub_region={i.sub_region}
          />
        ))}
    </section>
  );
};

export default DisplayAllCountries;