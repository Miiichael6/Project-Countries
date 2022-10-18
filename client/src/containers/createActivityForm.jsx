import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addCountryActivity, getAllCountries } from "../actions/actionsMain";
import ListCountriesAdd from "../components/ListCountriesAdd";
import ACM from "../styles/AddActivity.module.css";

const initialForm = {
  nombre: "",
  temporada: "",
  dificultad: "",
  duracion: "",
  countryId: [],
};

const initialErrorForm = {
  nombreErr: false,
  duracionErr: false,
};

const CreateActivityForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialErrorForm);
  const { nombreErr, duracionErr } = error;
  const { nombre, temporada, dificultad, duracion } = form;
  const paises = useSelector((state) => state.reducerMain.allCountriesCopy);
  const [countriesAct, setCountriesAct] = useState([]);

  const reset = () => {
    setForm({
      nombre: "",
      temporada: "",
      dificultad: "",
      duracion: "",
      countryId: [],
    });
  };

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  const handleError = (name, data) => {
    let validate = new RegExp("^[ áéíóúÁÉIÓÚñÑa-zA-Z]+$");
    if (!validate.test(data) && name === "nombre") {
      setError({
        ...error,
        nombreErr: true,
      });
    } else {
      setError({
        ...error,
        nombreErr: false,
      });
    }

    if (name === "duracion") {
      if (parseInt(data) > 0 && parseInt(data) < 25) {
        setError({ ...error, duracionErr: false });
      } else {
        setError({ ...error, duracionErr: true });
      }
    }
  };

  const handlerChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "nombre") handleError(name, value);
    if (name === "duracion") handleError(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlerPaises = (e) => {
    if (form.countryId.includes(e.target.value)) {
      return alert("Ya existe ese Pais en actividades");
    }

    const findCountry = paises.find((i) => i.id === e.target.value);
    setCountriesAct([...countriesAct, findCountry]);
    console.log();
    setForm({
      ...form,
      countryId: [...form.countryId, e.target.value],
    });
  };

  const deleteCountry = (cod) => {
    const updateData = countriesAct.filter((i) => i.id !== cod);
    setCountriesAct([...updateData]);

    const filtrado = form.countryId.filter((dt) => dt !== cod);
    setForm({
      ...form,
      countryId: filtrado,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    alert("actividad creada");
    dispatch(addCountryActivity(form));
    setForm({
      nombre: "",
      temporada: "",
      dificultad: "",
      duracion: "",
      countryId: [],
    });
  };

  return (
    <div className={ACM.ALLCONTAINER}>
      <div className={ACM.ReturnButtom}>
        <Link to={"/countries"}>Regresar</Link>
      </div>
      <div className={ACM.FormActivityContainer}>
        <form
          onSubmit={(e) => handlerSubmit(e)}
          className={ACM.FormularioAddContainer}
        >
          <div>
            <label htmlFor="nombre">Nombre </label>
            <br />
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => handlerChange(e)}
              autoComplete={"off"}
              required
            />
            <br />
            {nombre.length > 0 && nombreErr && (
              <span>no se permiten numeros ni caracteres especiales</span>
            )}
          </div>
          <div className={ACM.DificultAndDuration}>
            <div>
              <label htmlFor="dificultad">Dificultad: </label>
              <br />
              <select
                name="dificultad"
                id="dificultad"
                onChange={(e) => handlerChange(e)}
                required
                value={dificultad}
              >
                <option value="">---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              <label htmlFor="duracion">Duracion: </label>
              <input
                type="number"
                name="duracion"
                id="duracion"
                value={duracion}
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
                required
              />
            </div>
            <br />
            {duracionErr && <span>valores aceptados : de 1 a 24 horas</span>}
          </div>

          <div>
            <label htmlFor="countryId">Pais </label>
            <br />
            <select
              name="countryId"
              id="countryId"
              value={form.countryId}
              onChange={(e) => handlerPaises(e)}
            >
              <option value="">---</option>
              {paises.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.nombre_spa}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="temporada">Temporada </label>
            <br />
            <select
              name="temporada"
              id="temporada"
              value={temporada}
              onChange={(e) => handlerChange(e)}
              required
            >
              <option value="">---</option>
              <option value="Verano">Verano</option>
              <option value="Otonio">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
          </div>
          <div className={ACM.ButtomsCreateActivity}>
            <input
              type="submit"
              disabled={nombreErr || duracionErr || form.countryId.length < 1}
            />
            <input type="reset" onClick={reset} />
          </div>
            <ListCountriesAdd
              countries={form.countryId}
              deleteCountry={deleteCountry}
              allCountries={paises}
              countriesAct={countriesAct}
            />
        </form>
      </div>
    </div>
  );
};

export default CreateActivityForm;
