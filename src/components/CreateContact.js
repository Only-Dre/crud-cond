import React, { useState } from "react";
import "./Components.css";

function CreateContact({ onCreate }) {
    // ESTADOS
    const [contact, setContact] = useState({ name: "", phone: "" });
    const [errors, setErrors] = useState({}); // Novo estado para armazenar as mensagens de erro localmente

    // Função para capturar mudanças nos inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    // FUNÇÃO DE VALIDAÇÃO (O Motor de Regras)
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Validação: Nome - Verifica se o nome tem pelo menos 3 caracteres
        if (contact.name.trim().length < 3) {
            tempErrors.name = "O nome deve ter no mínimo 3 caracteres.";
            isValid = false;
        }

        // Validação: Telefone - Usando REGEX para 11 dígitos numéricos
        // A Expressão Regular /^\d{11}$/ garante: [^] Início, [\d{11}] exatamente 11 números, [$] Fim.
        // O [!] nega o teste: Se NÃO for o formato correto, gera erro.
        if (!/^\d{11}$/.test(contact.phone)) {
            tempErrors.phone = "O telefone deve ter 11 dígitos (apenas números).";
            isValid = false;
        }

        setErrors(tempErrors); // Atualiza os erros, fazendo o componente renderizar o feedback
        return isValid;
    };

    // FUNÇÃO DE SUBMISSÃO
    const handleSubmit = (e) => {
        e.preventDefault();

        // Só prossegue e chama a função de criação do App.js se a validação local passar
        if (validate()) {
            onCreate(contact); // Envia o contato para o estado global
            setContact({ name: "", phone: "" }); // Limpa o formulário
            setErrors({}); // Limpa os erros após o sucesso
        }
    };
    
    // Estilo para o feedback de erro
    const errorStyle = { color: '#ff4d4f', fontSize: '0.9em', marginTop: '4px' };

    return (
        <div className="container">
            <h2>Criar Novo Contato</h2>
            <form onSubmit={handleSubmit} className="form">
                
                {/* CAMPO NOME */}
                <input
                    type="text"
                    name="name"
                    placeholder="Nome do Contato"
                    value={contact.name}
                    onChange={handleChange}
                    className="input"
                />
                {/* FEEDBACK: Se errors.name existir (for true), exibe a mensagem de erro */}
                {errors.name && <p style={errorStyle}>{errors.name}</p>}

                {/* CAMPO TELEFONE */}
                <input
                    type="text"
                    name="phone"
                    placeholder="Telefone (11 dígitos, ex: 11999998888)"
                    value={contact.phone}
                    onChange={handleChange}
                    className="input"
                />
                {/* FEEDBACK: Se errors.phone existir (for true), exibe a mensagem de erro */}
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}

                <button type="submit" className="btn">
                    Salvar Contato
                </button>
            </form>
        </div>
    );
}

export default CreateContact;