import React, { useState } from "react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";
import CreateContact from "./components/CreateContact";
import UpdateContact from "./components/UpdateContact";
import ContactList from "./components/ContactList";

import "./App.css";

function App() {
  // As credenciais fixas para o acesso único (Admin / 123)
  const USERNAME_CORRETO = "Admin";
  const PASSWORD_CORRETA = "123";

  // Estados globais
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Inicializa sem estar logado
  const [username, setUsername] = useState(""); // Criação de espaço vazio para adição de username
  const [activeScreen, setActiveScreen] = useState("welcome"); // Tela ativa - Selecionada

  // Gerando dois contatos padrão para teste
  const [contacts, setContacts] = useState([
    { id: 1, name: "João Silva", phone: "11987654321" },
    { id: 2, name: "Maria Souza", phone: "21912345678" },
  ]);

  const [contactToEdit, setContactToEdit] = useState(null);

  // Função de Login alterada para acesso "único".
  // Recebe o usuário e a senha para validação.
  const handleLogin = (user, pass) => {
    // 1. Limpa os campos para garantir que não haja espaços extras na comparação.
    const cleanedUser = user ? user.trim() : "";
    const cleanedPass = pass ? pass.trim() : "";

    // 2. Verifica se as credenciais correspondem aos valores fixos.
    if (cleanedUser === USERNAME_CORRETO && cleanedPass === PASSWORD_CORRETA) {
      setUsername(cleanedUser);
      // Após validação, define o login como verdadeiro.
      setIsLoggedIn(true);
      setActiveScreen("welcome");
      alert(`Bem-vindo(a), ${cleanedUser}!`);
    } else {
      // Caso as credenciais não estejam corretas.
      alert("Usuário ou Senha inválidos!");
    }
  };

  const handleLogout = () => {
    // Define novamente o login como false, apaga o username e retorna ao menu de boas-vindas
    setIsLoggedIn(false);
    setUsername("");
    setActiveScreen("welcome");
  };

  // CRUD - Create - Read - Update - Delete =====

  // Os Dados de contatos NUNCA devem ser alterados dentro do Array const contacts
  // A alteração só pode ser realizada em setContacts

  // "...contacts" - captura todos os contatos e cria uma nova lista com eles
  const addContact = (contact) => {
    // "...contacts, id:Date.now" garante que o novo contato receba uma identificação ÚNICA para que não haja erro na listagem
    setContacts([...contacts, { ...contact, id: Date.now() }]);
    // Após setar o ID, o item é levado diretamente pra lista.
    setActiveScreen("list");
  };

  // Encontra o contato a ser atualizado pelo ID.
  const updateContact = (updated) => {
    setContacts(
      // Cria um novo array: se o ID do contato (c) for igual ao do contato atualizado, substitui; senão, mantém o original.
      contacts.map((c) => (c.id === updated.id ? updated : c))
    );
    setContactToEdit(null);
    setActiveScreen("list");
  };

  // Filtra a lista de contatos, encontra o conteúdo pelo ID e o apaga da lista
  const deleteContact = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  // RENDERIZAÇÃO CONDICIONAL
  if (!isLoggedIn) {
    // Se não estiver logado, exibe o componente Login, passando a função handleLogin
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
      {/* Leitura da Lista de Contatos */}
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