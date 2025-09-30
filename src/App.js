import React, { useState } from "react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";
import CreateContact from "./components/CreateContact";
import UpdateContact from "./components/UpdateContact";
import ContactList from "./components/ContactList";

import "./App.css";

function App() {
  // Estados globais
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [activeScreen, setActiveScreen] = useState("welcome");

  const [contacts, setContacts] = useState([
    { id: 1, name: "João Silva", phone: "11987654321" },
    { id: 2, name: "Maria Souza", phone: "21912345678" },
  ]);

  const [contactToEdit, setContactToEdit] = useState(null);

  // ===== LOGIN =====
  const handleLogin = (user) => {
    if (user && user.trim() !== "") {
      setUsername(user.trim());
      setIsLoggedIn(true);
      setActiveScreen("welcome");
    } else {
      alert("Preencha os campos corretamente!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setActiveScreen("welcome");
  };

  // ===== CRUD =====
  const addContact = (contact) => {
    setContacts([...contacts, { ...contact, id: Date.now() }]);
    setActiveScreen("list");
  };

  const updateContact = (updated) => {
    setContacts(
      contacts.map((c) => (c.id === updated.id ? updated : c))
    );
    setContactToEdit(null);
    setActiveScreen("list");
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  // ===== RENDERIZAÇÃO CONDICIONAL =====
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Menu setActiveScreen={setActiveScreen} onLogout={handleLogout} />

      {activeScreen === "welcome" && <Welcome username={username} />}
      {activeScreen === "create" && (
        <CreateContact onCreate={addContact} />
      )}
      {activeScreen === "update" && contactToEdit && (
        <UpdateContact
          contact={contactToEdit}
          onUpdate={updateContact}
        />
      )}
      {activeScreen === "list" && (
        <ContactList
          contacts={contacts}
          onEdit={(c) => {
            setContactToEdit(c);
            setActiveScreen("update");
          }}
          onDelete={deleteContact}
        />
      )}
    </div>
  );
}

export default App;
