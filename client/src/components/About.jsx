import React from 'react'
import Acerca from "../styles/About.module.css"

const About = () => {
  return (
    <div className={Acerca.AboutContainer}>
      <div className={Acerca.SubContainer}>
      <h1>Acerca de AppCountries</h1>

      <div className={Acerca.TextAbout}>
        <p>Esta pagina es un Buscardor de Paises creado con la api <br />
         de countries en donde Podras... Buscar Paises , Organizarlos <br />
         Alfabeticamente, por cantidad de poblacion e incluso podrás  <br />
         ordenarlos por continente Tambien podras crear actividades y <br />
         Asignarlos a los paises que desees y luego buscar a los paises <br />
         con dichas actividades , espero te guste pasar un momento por <br />
         mi Pagina Web :) </p>
      </div>
      </div>
    </div>
  )
}

export default About