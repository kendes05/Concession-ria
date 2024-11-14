// Função para carregar os veículos em destaque ao carregar a página
window.onload = function() {
    // Chama o servidor para pegar os veículos em destaque
    fetch('http://localhost:3001/destaques')
        .then(response => response.json())
        .then(data => {
            console.log("Veículos em Destaque:", data);  // Exibe os dados no console

            // Preenche os cards com as informações dos veículos
            data.forEach((veiculo, index) => {
                // Seleciona o card específico com base no índice
                const card = document.querySelectorAll('.car-card')[index];

                if (card) {
                    // Preenche as informações no card
                    const carImage = card.querySelector('.car-image');
                    const carTitle = card.querySelector('.car-title');
                    const carPrice = card.querySelector('.car-price');

                    // Atualiza os dados no card
                    carImage.src = veiculo.img || '/concessionaria/img/carro1.png';  // Atualiza a imagem, caso o valor seja nulo, insere imagem padrão
                    carTitle.textContent = veiculo.modelo;  // Atualiza o nome do modelo
                    carPrice.textContent = `R$ ${veiculo.preco}`;  // Atualiza o preço
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
};

// Função de busca de veículos ao clicar no botão de busca
const botaobuscar = document.getElementById("BtnBuscar");
const Pesquisa = document.getElementById("Pesquisar");
const carCardsContainer = document.querySelector('.car-section .row'); // Seleciona o container onde os carros são exibidos

botaobuscar.addEventListener("click", function() {
    const buscaValor = Pesquisa.value.trim();  // Pega o valor da pesquisa

    // Exibe no console o que o usuário digitou
    console.log("Buscando por:", buscaValor);

    // Verifica se o campo de pesquisa está vazio
    if (buscaValor === '') {
        alert("Por favor, digite um valor para a busca!");
        return;
    }

    // Realiza a busca no servidor e filtra os resultados
    fetch(`http://localhost:3001/busca?valor=${buscaValor}`)
        .then(response => response.json())
        .then(data => {
            console.log("Resultado da busca:", data);  // Exibe os dados retornados

            // Limpa os cards existentes antes de adicionar novos
            carCardsContainer.innerHTML = '';

            // Adiciona os carros no DOM
            if (data.length === 0) {
                carCardsContainer.innerHTML = '<p>Nenhum carro encontrado para a pesquisa.</p>';
            } else {
                data.forEach(veiculo => {
                    const cardHTML = `
                        <div class="col-md-3">
                            <a href="TelaProduto.html">
                                <div class="car-card">
                                    <img src="${veiculo.img || '/concessionaria/img/carro1.png'}" alt="${veiculo.modelo}" class="car-image">
                                    <p class="car-title">${veiculo.modelo}</p>
                                    <p class="car-price">R$ ${veiculo.preco}</p>
                                </div>
                            </a>
                        </div>
                    `;
                    carCardsContainer.innerHTML += cardHTML;
                });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar:', error);
        });
});
