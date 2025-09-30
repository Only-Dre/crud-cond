import React from "react";
import "./Components.css";

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <div className="container">
      <h2>Lista de Contatos</h2>
      {contacts.length === 0 ? (
        <p>Nenhum contato cadastrado.</p>
      ) : (
        <ul className="list">
          {contacts.map((c) => (
            <li key={c.id} className="list-item">
              <span>
                <strong>{c.name}</strong> - {c.phone}
              </span>
              <div>
                <button onClick={() => onEdit(c)} className="btn small">
                  Editar
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="btn small delete"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
