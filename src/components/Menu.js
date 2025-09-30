import React from "react";
import "./Components.css";

function Menu({ setActiveScreen, onLogout }) {
  return (
    <nav className="menu">
      <button onClick={() => setActiveScreen("welcome")} className="btn">
        Início
      </button>
      <button onClick={() => setActiveScreen("create")} className="btn">
        Criar Contato
      </button>
      <button onClick={() => setActiveScreen("list")} className="btn">
        Listar Contatos
      </button>
      <button onClick={onLogout} className="btn logout">
        Sair
      </button>
    </nav>
  );
}

export default Menu;
