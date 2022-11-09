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
  dificultadErr: false,
  temporadaErr: false,
  countryIdErr: false,
};

const CreateActivityForm = () => {
  const dispatch = useDispatch();
  const paises = useSelector((state) => state.reducerMain.allCountriesCopy);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialErrorForm);
  const { nombreErr, duracionErr, dificultadErr, countryIdErr, temporadaErr } =
    error;
  const { nombre, temporada, dificultad, duracion, countryId } = form;
  const [countriesAct, setCountriesAct] = useState([]);
  const [noSelect, setNoSelect] = useState(false);

  // restablece el formulario
  const reset = () => {
    setForm({
      nombre: "",
      temporada: "",
      dificultad: "",
      duracion: "",
      countryId: [],
    });
    setError({
      ...error,
      temporadaErr: false,
      dificultadErr: false,
      countryIdErr: false,
    });
    setNoSelect(false);
    setCountriesAct([]);
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
      data = Number(data);
      if (typeof data === "number") {
        if (data > 0 && data < 25) {
          // horas
          setError({ ...error, duracionErr: false });
        } else {
          setError({ ...error, duracionErr: true });
        }
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

  const handleSelects = (e) => {
    if (!dificultad || countryId.length === 0 || !temporada) {
      setNoSelect(true);
    } else {
      setNoSelect(false);
    }
  };

  const handlerBlur = (e) => {
    // [dificultad , countryId, Temporada] // controladores de error
    let value = e.target.value;
    const name = e.target.name;
    if (!value) setError({ ...error, [`${name}Err`]: true });
    else setError({ ...error, [`${name}Err`]: false });

    if (name === "countryId" && countryId.length > 0) {
      setError({ ...error, [`${name}Err`]: false });
    }
  };

  const handlerPaises = (e) => {
    // verificacion para que no haya actividades repetidas
    if (e.target.value === "") return; // que no añada si esta vacio
    if (form.countryId.includes(e.target.value)) {
      // no repetidos
      return alert("Ya existe ese Pais en actividades");
    }

    const findCountry = paises.find((i) => i.id === e.target.value);
    setCountriesAct([...countriesAct, findCountry]); // lista de paises
    setForm({
      ...form,
      countryId: [...form.countryId, e.target.value],
    });
  };

  const deleteCountry = (cod) => {
    // eliminar paises de el estado y de el formulario
    const deletedData = countriesAct.filter((i) => i.id !== cod);
    setCountriesAct([...deletedData]);

    const filtrado = form.countryId.filter((dt) => dt !== cod);
    setForm({
      ...form,
      countryId: filtrado,
    });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!dificultad || !countryId.length || !temporada || !nombre || !duracion)
      handleSelects();
    else {
      alert("actividad creada");
      dispatch(addCountryActivity(form));
      setForm({
        nombre: "",
        temporada: "",
        dificultad: "",
        duracion: "",
        countryId: [],
      });
      setError({
        ...error,
        temporadaErr: false,
        dificultadErr: false,
        countryIdErr: false,
      });
      setNoSelect(false);
      setCountriesAct([]);
    }
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
              placeholder="Escribe una Actividad"
              onChange={(e) => handlerChange(e)}
              autoComplete={"off"}
              className={`${nombreErr ? ACM.incorrectNom : ACM.correctNom}`}
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
                // required
                onBlur={(e) => handlerBlur(e)}
                value={dificultad}
              >
                <option value="">---</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {dificultadErr && <span>Elige una dificultad</span>}
            </div>
            <div>
              <label htmlFor="duracion">Duracion: </label>
              <input
                type="text"
                name="duracion"
                id="duracion"
                value={duracion}
                onChange={(e) => handlerChange(e)}
                autoComplete="off"
                placeholder="hora(s)"
                className={duracionErr ? ACM.incorrectDur : ACM.correctDur}
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
              onBlur={(e) => handlerBlur(e)}
              onChange={(e) => handlerPaises(e)}
            >
              <option value="">---</option>
              {paises
                .sort((a, b) => a.nombre_spa.localeCompare(b.nombre_spa))
                .map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.nombre_spa}
                  </option>
                ))}
            </select>
            {countryIdErr && <span>Elige almenos un pais</span>}
          </div>

          <div>
            <label htmlFor="temporada">Temporada </label>
            <br />
            <select
              name="temporada"
              id="temporada"
              value={temporada}
              onChange={(e) => handlerChange(e)}
              onBlur={(e) => handlerBlur(e)}
            >
              <option value="">---</option>
              <option value="Verano">Verano</option>
              <option value="Otonio">Otoño</option>
              <option value="Invierno">Invierno</option>
              <option value="Primavera">Primavera</option>
            </select>
            {temporadaErr && <span>elige una temporada</span>}
          </div>
          <div className={ACM.ButtomsCreateActivity}>
            {noSelect && <span>Ningun Campo puede quedar vacio</span>}
            <input
              type="submit"
              disabled={
                !nombreErr &&
                nombre.length > 1 &&
                !duracionErr &&
                duracion.length > 0
                  ? false
                  : true
              }
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
