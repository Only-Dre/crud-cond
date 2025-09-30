import React, { useState } from "react";
import "./Components.css";

function CreateContact({ onCreate }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Preencha todos os campos!");
      return;
    }
    onCreate({ name, phone });
    setName("");
    setPhone("");
  };

  return (
    <div className="container">
      <h2>Novo Contato</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">
          Salvar
        </button>
      </form>
    </div>
  );
}

export default CreateContact;
