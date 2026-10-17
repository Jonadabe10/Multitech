console.log("JavaScript da MultiTech carregou!");
// Seleciona os botões dos produtos
const botoes = document.querySelectorAll("article button");

// Seleciona os elementos do carrinho
const contador = document.querySelector("#contador-carrinho");
const fundoCarrinho = document.querySelector("#fundo-carrinho");
const botaoAbrir = document.querySelector("#abrir-carrinho");
const botaoFechar = document.querySelector("#fechar-carrinho");

const listaCarrinho = document.querySelector("#lista-carrinho");
const carrinhoVazio = document.querySelector("#carrinho-vazio");
const totalCarrinho = document.querySelector(".total-carrinho h3");

// Guarda os produtos adicionados
let produtosCarrinho = [];


// Abre o carrinho
function abrirCarrinho() {
    fundoCarrinho.classList.add("aberto");
}


// Fecha o carrinho
function fecharCarrinho() {
    fundoCarrinho.classList.remove("aberto");
}


// Atualiza os produtos, a quantidade e o total
function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";

    let total = 0;

    produtosCarrinho.forEach(function(produto) {
        const item = document.createElement("div");

        item.style.padding = "12px 0";
        item.style.borderBottom = "1px solid #e5e7eb";

        item.textContent =
            produto.nome + " - " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        listaCarrinho.appendChild(item);

        total += produto.preco;
    });

    // Mostra a mensagem quando o carrinho está vazio
    carrinhoVazio.style.display =
        produtosCarrinho.length === 0 ? "block" : "none";

    // Atualiza a quantidade de produtos
    contador.textContent = produtosCarrinho.length;

    // Atualiza o preço total
    totalCarrinho.textContent = "Total: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}


// Adiciona os produtos ao carrinho
botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {
        const produto = botao.closest("article");

        const nome = produto.querySelector("h3").textContent;

        const textoPreco =
            produto.querySelector("p:nth-of-type(2)").textContent;

        // Converte o preço para número
        const preco = Number(
            textoPreco
                .replace("Preço:", "")
                .replace("R$", "")
                .trim()
                .replace(/\./g, "")
                .replace(",", ".")
        );

        // Guarda o produto no carrinho
        produtosCarrinho.push({
            nome: nome,
            preco: preco
        });

        atualizarCarrinho();
        abrirCarrinho();
    });
});


// Eventos dos botões do carrinho
botaoAbrir.addEventListener("click", abrirCarrinho);
botaoFechar.addEventListener("click", fecharCarrinho);


// Fecha o carrinho ao clicar no fundo escuro
fundoCarrinho.addEventListener("click", function(evento) {
    if (evento.target === fundoCarrinho) {
        fecharCarrinho();
    }
});


// Atualiza o carrinho ao carregar a página

function atualizarCarrinho() {
    listaCarrinho.innerHTML = "";

    let total = 0;

    produtosCarrinho.forEach(function(produto, indice) {
        // Cria a linha do produto
        const item = document.createElement("div");

        item.style.display = "flex";
        item.style.justifyContent = "space-between";
        item.style.alignItems = "center";
        item.style.gap = "10px";
        item.style.padding = "12px 0";
        item.style.borderBottom = "1px solid #e5e7eb";

        // Nome e preço
        const informacoes = document.createElement("p");

        informacoes.textContent =
            produto.nome + " - " +
            produto.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });

        informacoes.style.margin = "0";
        informacoes.style.flex = "1";

        // Botão Remover
        const botaoRemover = document.createElement("button");

        botaoRemover.textContent = "Remover";
        botaoRemover.style.backgroundColor = "#dc2626";
        botaoRemover.style.color = "#ffffff";
        botaoRemover.style.border = "none";
        botaoRemover.style.padding = "6px 10px";
        botaoRemover.style.borderRadius = "5px";
        botaoRemover.style.cursor = "pointer";
        botaoRemover.style.flexShrink = "0";

        // Remove o produto selecionado
        botaoRemover.addEventListener("click", function() {
            produtosCarrinho.splice(indice, 1);
            atualizarCarrinho();
        });

        // Adiciona os elementos à linha
        item.appendChild(informacoes);
        item.appendChild(botaoRemover);

        listaCarrinho.appendChild(item);

        // Soma o preço ao total
        total += produto.preco;
    });

    // Mensagem de carrinho vazio
    carrinhoVazio.style.display =
        produtosCarrinho.length === 0 ? "block" : "none";

    // Atualiza a quantidade
    contador.textContent = produtosCarrinho.length;

    // Atualiza o total
    totalCarrinho.textContent = "Total: " +
        total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
}

