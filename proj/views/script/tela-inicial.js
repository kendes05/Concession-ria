const botaobuscar = document.getElementById("BtnBuscar");
const Pesquisa = document.getElementById("Pesquisar");
const carCardsContainer = document.querySelector('.car-section .row');

const idusuario = -1
const nomeUsuario = ""

async function getuserid(id) {
    try {
        const response = await fetch('http://localhost:3000/getuserbyid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        });
        
        const result = await response.json();
        
        return result
        
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}

async function getVeiculos() {
    try {
        // Monta a URL com o ID como parâmetro
        const url = `http://localhost:3000/getveiculos`;
        
        // Faz a requisição GET
        const response = await fetch(url, {
            method: 'GET', // Especifica o método GET
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        // Converte a resposta para JSON
        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}





const opcoes = document.getElementById('navbar-op')


async function enviarDados(idVeiculo) {
    // Armazena o ID do veículo no localStorage
    console.log(idVeiculo)
   
    sessionStorage.setItem("veiculoId", idVeiculo);

    
    window.location.href = 'TelaProduto.html';
}


async function gerarCard(veiculo) {
    const cardHTML = `
                    <div class="colmd3" idveiculo="${veiculo.idveiculo}">
                        <a href="TelaProduto.html" onclick="event.preventDefault(); enviarDados(${veiculo.idveiculo});">
                            <div class="car-card">
                                <img src="${veiculo.imagem || '../img/carro1.png'}" alt="${veiculo.modelo}" class="car-image">
                                <p class="car-title">${veiculo.modelo}</p>
                                <p class="car-price">R$ ${veiculo.preco}</p>
                            </div>
                        </a>
                    </div>
                `;
        
                // Adiciona o card ao container
                carCardsContainer.innerHTML += cardHTML;
}

async function carregar() {
            const data = await getVeiculos()
            data.forEach((veiculo) => {
                gerarCard(veiculo);
                
            });
    
        
    const userid = sessionStorage.getItem('userid');
    if (userid) {
        console.log(userid)
        let usuario = await getuserid(userid)
        usuario = usuario[0]

        document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario.nome}`;
        document.getElementById('perfilusuario').classList.remove('user');
        document.getElementById('perfilusuario').style.color = 'black'
        console.log(usuario.idusuario)
        if(usuario.idusuario === 1){
            var propostas = document.createElement('li')
            propostas.className = 'nav-item'
            var testdrives = document.createElement('li')
            testdrives.className = 'nav-item'
            var cadastrar = document.createElement('li')
            cadastrar.className = 'nav-item'

            var op1 = document.createElement('a')
            op1.href = 'PropostasADM.html'
            op1.className = 'nav-link'
            op1.textContent = 'Propostas'
            
            var op3 = document.createElement('a')
            op3.href = 'CadastroProduto.html'
            op3.className = 'nav-link'
            op3.textContent = 'Cadastrar'

            propostas.appendChild(op1)
            
            cadastrar.appendChild(op3)
            opcoes.appendChild(propostas)
            opcoes.appendChild(testdrives)
            opcoes.appendChild(cadastrar)
        }else{
            
            var propostas = document.createElement('li')
            propostas.className = 'nav-item'


            var op1 = document.createElement('a')
            op1.href = 'PropostasUser.html'
            op1.className = 'nav-link'
            op1.textContent = 'Minhas propostas'


            propostas.appendChild(op1)

            opcoes.appendChild(propostas)

        }
        
    
    } else {

        //
    
    }
}




carregar()


botaobuscar.addEventListener("click", async function() {
    const buscaValor = Pesquisa.value.trim();  // Pega o valor da pesquisa

    // Exibe no console o que o usuário digitou
    console.log("Buscando por:", buscaValor);

    // Verifica se o campo de pesquisa está vazio
    if (buscaValor === '') {
        alert("Por favor, digite um valor para a busca!");
        return;
    }

    // Realiza a busca no servidor e filtra os resultados
            const data = await getVeiculos()

            // Limpa os cards existentes antes de adicionar novos
            carCardsContainer.innerHTML = '';

            // Adiciona os carros no DOM
            if (data.length === 0) {
                carCardsContainer.innerHTML = '<p>Nenhum carro encontrado para a pesquisa.</p>';
            } else {
                console.log(data)
                data.forEach(veiculo =>{
                    
                    pesquisar(veiculo,buscaValor)


                    
                });
            }
        


        
       
        

        
        
});

async function pesquisar(veiculo,buscaValor) {
    console.log(veiculo)
                    console.log("chegou")
                    
                    
                    if((veiculo.modelo).includes(buscaValor) || (veiculo.marca).includes(buscaValor)){
                
                    gerarCard(veiculo)
                    }

}
