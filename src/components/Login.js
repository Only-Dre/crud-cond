import React, { useState } from "react";
import "./Components.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Adição de Login
    // Envio de objetos/valores para a função onLogin
    if (username.trim() && password.trim()) {
      // Passa o usuário e a senha
      onLogin(username.trim(), password.trim());
    } else {
      alert("Por favor, preencha todos os campos!");
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
          type="password"
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