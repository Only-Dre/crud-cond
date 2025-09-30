import React, { useState } from "react";
import "./Components.css";

function UpdateContact({ contact, onUpdate }) {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert("Preencha todos os campos!");
      return;
    }
    onUpdate({ ...contact, name, phone });
  };

  return (
    <div className="container">
      <h2>Editar Contato</h2>
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
          Atualizar
        </button>
      </form>
    </div>
  );
}

export default UpdateContact;
