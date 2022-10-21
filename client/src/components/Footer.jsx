import React from "react";
import FOOTER from "../styles/Footer.module.css";
import discord from "../imgs/discord.svg"
import github from "../imgs/github.svg"
import whatsapp from "../imgs/whatsapp.svg"
// import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={FOOTER.footer}>
      <dir>
        <h3>
          <b>Created By:</b>  <i>Michael Canales Palomino</i>
        </h3>
      </dir>
      <div>
        <a href="!#">
        <img src={whatsapp} alt="data" />
        </a>
        <a href="|a">
        <img src={github} alt="github" />
        </a>
        <a href="|a">
        <img src={discord} alt="discord" />
        </a>
      </div>
    </footer>
  );
}
