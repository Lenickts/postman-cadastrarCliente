const cadastro = document.getElementById("listaCadastros");

//Buscar todas as tarefas cadastradas
fetch("https://crudcrud.com/api/b5aceeb886f44cf48dc6e6316723b945/cadastro")
    .then(apiReturn => apiReturn.json()) //Converte o corpo da resposta em objeto JS
    .then((listaDeCadastros) => {
        listaDeCadastros.forEach(cliente => {
            const item = document.createElement("li");
            item.innerHTML = `${cliente.nome} - ${cliente.email || "Sem e-mail"} <button class="excluir" data-id="${cliente._id}">X</button>`;
            cadastro.appendChild(item);
        });
    });

//Adicionar um novo cadastro
document.getElementById("btn").addEventListener("click", () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    //Verifica se o nome foi preenchido
    if (nome === ""){
        alert("O nome é obrigatório.");
        return;
    }

    const novoCadastro = { nome, email };
    fetch("https://crudcrud.com/api/b5aceeb886f44cf48dc6e6316723b945/cadastro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoCadastro)
    })
    
        //Converte o corpo da resposta em objeto JS
        .then(resposta => resposta.json())
        .then((cadastro) => {
            //Já temos o retorno dado pela API dos objetos
            const item = document.createElement("li");
            item.innerHTML = `${cadastro.nome} - ${cadastro.email || "Sem e-mail"} <button class="excluir" data-id="${cadastro._id}">X</button>`;
            cadastro.appendChild(item);
        });
});

//Remover cadastro
cadastro.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("excluir")) {
        const id = evento.target.dataset.id; //armazena os id da API numa variável
        fetch(`https://crudcrud.com/api/b5aceeb886f44cf48dc6e6316723b945/cadastro/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            //Remove o <li> do DOM
            evento.target.parantElement.remove();
        })
        .catch(erro => console.error("Erro ao excluir", erro));
    }
});
