import React from "react";
import "./Components.css";

function Welcome({ username }) {
  return (
    <div className="container">
      <h2>Bem-vindo, {username}!</h2>
      <p>Use o menu acima para navegar pelo sistema de contatos.</p>
    </div>
  );
}

export default Welcome;
