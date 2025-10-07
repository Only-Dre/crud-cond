import React, { useState } from "react";
import "./Components.css";

function Login({ onLogin }) {
  // Nome e Senha começam vazios
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Utilização de Trimming
    const user = username.trim();
    const pass = password.trim();

    // Verifica se os campos estão preenchidos, eliminando espaços extras
    if (user && pass) {
      // Envia o usuário E a senha para a função de login no App.js
      onLogin(user, pass); 
    } else {
      // Caso os campos não estejam completos, retorna:
      alert("Preencha todos os campos.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password" // Tipo 'password' para ocultar a digitação da senha
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;