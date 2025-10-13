import React, { useState, useEffect } from "react";
import "./Components.css";

function ContactForm({ contactToEdit, onSave, setActiveScreen }) { // Adicionado setActiveScreen para o botão de voltar
    // Estados do Formulário
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    // NOVO: Estado para armazenar as mensagens de erro localmente
    const [errors, setErrors] = useState({}); 


    // Efeito para pré-preencher o formulário quando há um contato para editar.
    useEffect(() => {
        // Se a prop contactToEdit foi passada, estamos no modo Edição.
        if (contactToEdit) {
            setName(contactToEdit.name || ''); // Preenche o nome (com fallback para string vazia)
            setPhone(contactToEdit.phone || ''); // Preenche o telefone (com fallback para string vazia)
        } else {
            // Caso contrário, limpa os campos para o modo Criação.
            setName('');
            setPhone('');
        }
        setErrors({}); // Garante que os erros sejam resetados ao trocar o modo (Edição/Criação)
    }, [contactToEdit]);

    // FUNÇÃO DE VALIDAÇÃO (O Motor de Regras)
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Validação: Nome - Verifica se o nome tem pelo menos 3 caracteres (ignorando espaços)
        if (name.trim().length < 3) {
            tempErrors.name = "O nome deve ter no mínimo 3 caracteres.";
            isValid = false;
        }

        // Validação: Telefone - Usando REGEX para 11 dígitos numéricos
        // A Expressão Regular /^\d{11}$/ garante: [^] Início, [\d{11}] exatamente 11 números, [$] Fim.
        if (!/^\d{11}$/.test(phone)) {
            tempErrors.phone = "O telefone deve ter 11 dígitos (apenas números).";
            isValid = false;
        }

        setErrors(tempErrors); // Atualiza os erros, fazendo o componente renderizar o feedback
        return isValid;
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        // NOVO: Chama a validação aprimorada antes de salvar.
        if (!validate()) {
             // Caso a validação falhe, o validate() já atualizou o estado errors.
             return; // Sai do handleSubmit
        }

        // Ao salvar, verifica se é uma atualização (mantendo o ID) ou uma criação (ID é null).
        // Se contactToEdit existir, usamos o ID dele; senão, passamos null (o App.js criará um novo).
        onSave({ id: contactToEdit ? contactToEdit.id : null, name, phone });
    }

    // Estilo para o feedback de erro (pode ser movido para o Components.css)
    const errorStyle = { color: '#ff4d4f', fontSize: '0.9em', marginTop: '4px', textAlign: 'left' };


    return (
        <div className="container">
            {/* Condição para o título: Se contactToEdit existir, é Alteração; senão, Cadastro. */}
            <h2> {contactToEdit ? "Alterar Contato" : "Cadastrar Novo Contato"} </h2>
            
            {/* Criação de Formulário */}
            <form onSubmit={handleSubmit} className="form"> 
                {/* Função de Edição de nome */}
                <input 
                    type="text" 
                    placeholder="Nome" 
                    value={name} 
                    name="name" // Adicionado o atributo name
                    className="input"
                    onChange={(e) => setName(e.target.value)}
                />
                {/* FEEDBACK: Se errors.name existir, exibe a mensagem de erro */}
                {errors.name && <p style={errorStyle}>{errors.name}</p>}

                {/* Função de Edição de Telefone */}
                <input 
                    type="text" 
                    placeholder="Telefone (11 dígitos)" 
                    value={phone} 
                    name="phone" // Adicionado o atributo name
                    className="input"
                    onChange={(e) => setPhone(e.target.value)}
                />
                 {/* FEEDBACK: Se errors.phone existir, exibe a mensagem de erro */}
                {errors.phone && <p style={errorStyle}>{errors.phone}</p>}

                <button type="submit" className="btn">Salvar</button>
                
                {/* Botão para cancelar e voltar à lista (Melhoria de UX) */}
                {contactToEdit && <button 
                    type="button" 
                    onClick={() => setActiveScreen("list")} 
                    className="btn secondary">
                        Cancelar
                    </button>
                }
            </form>
        </div>
    )
}

export default ContactForm;