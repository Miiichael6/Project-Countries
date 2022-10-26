import React from "react";
import FOOTER from "../styles/Footer.module.css";
import discord from "../imgs/discord.svg";
import github from "../imgs/github.svg";
import whatsapp from "../imgs/whatsapp.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={FOOTER.footer}>
      <dir>
        <h3>
          <b>Created By:</b> <i>Michael Canales Palomino</i>
        </h3>
      </dir>
      <div>
        <Link to={"/countries"}>
          <img src={whatsapp} alt="data" />
        </Link>
        <Link to={"/countries"}>
          <img src={github} alt="github" />
        </Link>
        <Link to={"/countries"}>
          <img src={discord} alt="discord" />
        </Link>
      </div>
    </footer>
  );
}
