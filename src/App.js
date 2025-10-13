import React, { useState } from "react";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Welcome from "./components/Welcome";

// REMOVIDOS:
// import CreateContact from "./components/CreateContact";
// import UpdateContact from "./components/UpdateContact";

import ContactForm from "./components/ContactForm"; // NOVO: Componente unificado
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

  // LOGIN (Função alterada para receber usuário e senha)
  // Recebe o usuário e a senha para validação
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

  // Os Dados de contatos NUNCA devem ser alterados dentro do Array const contacts
  // A alteração só pode ser realizada em setContacts

  // A ser atualizado
  // Função unificada que lida com a criação de um NOVO contato ou a atualização de um existente.
  const handleSaveContact = (contact) => {
    // Se o contato já possuir ID, é uma atualização.
    if (contact.id) {
      setContacts(
        // Mapeia os contatos e substitui apenas o que possui o ID correspondente.
        contacts.map((c) => (c.id === contact.id ? contact : c))
      );
      alert("Contato alterado com sucesso!");
    } else {
      // Se não tem ID, é um novo contato.
      // Adiciona uma identificação ÚNICA antes de salvar.
      contact.id = Date.now();
      setContacts([...contacts, contact]);
      alert("Contato cadastrado com sucesso!!");
    }
    // Após salvar ou atualizar, retorna à lista de contatos.
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

      {/* TELA DE BOAS-VINDAS */}
      {activeScreen === "welcome" && <Welcome username={username} />}
      
      
      {/* MODO CRIAÇÃO (activeScreen="create") */}
      {activeScreen === "create" && (
        <ContactForm 
            // Informa ao formulário que NÃO há contato para editar (modo Criação)
            contactToEdit={null} 
            // Passa a função unificada para salvar/criar o contato
            onSave={handleSaveContact} 
            // Permite ao formulário navegar de volta para a lista (ex: botão Cancelar)
            setActiveScreen={setActiveScreen} 
        />
      )}
      
      {/* MODO ATUALIZAÇÃO (activeScreen="update") */}
      {activeScreen === "update" && contactToEdit && (
        <ContactForm 
            // Passa o objeto do contato que deve ser pré-preenchido para edição
            contactToEdit={contactToEdit} 
            // Passa a função unificada que fará a atualização do contato
            onSave={handleSaveContact} 
            // Permite ao formulário navegar de volta para a lista (ex: botão Cancelar)
            setActiveScreen={setActiveScreen} 
        />
      )} 
      
      {/* TELA DE LISTAGEM */}
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