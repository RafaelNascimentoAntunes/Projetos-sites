// Lista de Produtos (exemplo)
const produtos = [
    {
        id: 1,
        nome: "Produto 1",
        preco: 49.99,
        imagem: "img/produto1.jpg"
    },
    {
        id: 2,
        nome: "Produto 2",
        preco: 29.99,
        imagem: "img/produto2.jpg"
    },
    {
        id: 3,
        nome: "Produto 3",
        preco: 19.99,
        imagem: "img/produto3.jpg"
    },
    // Adicione mais produtos conforme necessário
];

// Função para exibir produtos na página inicial
function exibirProdutosDestaque() {
    const container = document.getElementById('produtos-destaque');
    produtos.slice(0, 3).forEach(produto => {
        const div = document.createElement('div');
        div.className = "col-md-4 product-card";
        div.innerHTML = `
            <div class="card">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Função para exibir todos os produtos na página de produtos
function exibirTodosProdutos() {
    const container = document.getElementById('lista-produtos');
    produtos.forEach(produto => {
        const div = document.createElement('div');
        div.className = "col-md-4 product-card";
        div.innerHTML = `
            <div class="card">
                <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">R$ ${produto.preco.toFixed(2)}</p>
                    <button class="btn btn-primary" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produto = produtos.find(p => p.id === id);
    const itemExistente = carrinho.find(item => item.id === id);
    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert(`${produto.nome} adicionado ao carrinho!`);
}

// Função para exibir itens no carrinho
function exibirCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const container = document.getElementById('carrinho-itens');
    const total = document.getElementById('total-carrinho');
    container.innerHTML = '';
    let totalValor = 0;

    carrinho.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.nome}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removerDoCarrinho(${item.id})">Remover</button></td>
        `;
        container.appendChild(tr);
        totalValor += item.preco * item.quantidade;
    });

    total.innerText = totalValor.toFixed(2);
}

// Função para remover item do carrinho
function removerDoCarrinho(id) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho = carrinho.filter(item => item.id !== id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirCarrinho();
}

// Função para finalizar o checkout
function finalizarCheckout(event) {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de pagamento e envio dos dados
    alert("Compra finalizada com sucesso!");
    localStorage.removeItem('carrinho');
    window.location.href = 'index.html';
}

// Verificar qual página está carregada e executar funções correspondentes
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('produtos-destaque')) {
        exibirProdutosDestaque();
    }
    if (document.getElementById('lista-produtos')) {
        exibirTodosProdutos();
    }
    if (document.getElementById('carrinho-itens')) {
        exibirCarrinho();
    }
    const formCheckout = document.getElementById('form-checkout');
    if (formCheckout) {
        formCheckout.addEventListener('submit', finalizarCheckout);
    }
});
