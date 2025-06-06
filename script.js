const cadastro = document.getElementById("listaCadastros");

//OBS: Não usei o site crud crud porque expirou meu endpoint
const urlAPI = "https://retoolapi.dev/LmDc7h/cadastro"

//Função para carregar os cadastros da API
function atualizarDados() {
    cadastro.innerHTML = "";
    //Buscar todos os cadastros
    fetch(urlAPI)
    .then(apiReturn => apiReturn.json()) //Converte o corpo da resposta em objeto JS
    .then((listaDeCadastros) => {
        listaDeCadastros.forEach(cliente => {
            const item = document.createElement("li");
            item.innerHTML = `${cliente.nome} - ${cliente.email || "Sem e-mail"} <button class="excluir" data-id="${cliente.id}">X</button>`;
            cadastro.appendChild(item);
        });
    });
}

//Carrega cadastros ao abrir a página
atualizarDados();

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
    fetch(urlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(novoCadastro)
    })
    
    //Converte o corpo da resposta em objeto JS
    .then(resposta => resposta.json())
    .then(() => {
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        atualizarDados(); //Recarrega a lista após adicionar
    });
});

//Remover cadastro
cadastro.addEventListener("click", async (event) => {
    if (event.target.classList.contains("excluir")) {
        const id = event.target.dataset.id;
        
        try {
            const response = await fetch(`${urlAPI}/${id}`, {
                method: "DELETE"
            });
            
            if (response.ok) {
                // Só remove do DOM se a API confirmar a exclusão
                event.target.parentElement.remove();
            } else {
                console.error("Falha na API:", response.status);
            }
        } catch (erro) {
            console.error("Erro ao excluir:", erro);
        }
    }
});