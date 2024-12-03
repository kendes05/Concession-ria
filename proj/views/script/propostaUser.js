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

async function getveiculoid(id) {
    
    try {
        const response = await fetch('http://localhost:3000/getveiculo', {
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

async function removerProposta(id) {
    
    try {
        const response = await fetch('http://localhost:3000/deleteproposta', {
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


async function getpropostasusuario(idusuario) {
    try {
        const response = await fetch('http://localhost:3000/getpropostausuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idusuario})
        });
        console.log("ok1")
        const result = await response.json();
        
        return result
        
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}


const opcoes = document.getElementById('navbar-op')
async function carregar() {
    const userid = sessionStorage.getItem('userid');
    
    if (userid) {
        
        let usuario = await getuserid(userid)
        usuario = usuario[0]

        document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario.nome}`;
        document.getElementById('perfilusuario').classList.remove('user');
        document.getElementById('perfilusuario').style.color = 'black';
        let propostas = await getpropostasusuario(userid)
        console.log(propostas)
        carregarLista(propostas)
        if(usuario.idusuario === 1){
            var propostas2 = document.createElement('li')
            propostas2.className = 'nav-item'
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

            propostas2.appendChild(op1)
            
            cadastrar.appendChild(op3)
            opcoes.appendChild(propostas2)
            opcoes.appendChild(testdrives)
            opcoes.appendChild(cadastrar)
        }else{
            
            var propostas2 = document.createElement('li')
            propostas2.className = 'nav-item'


            var op1 = document.createElement('a')
            op1.href = 'PropostasUser.html'
            op1.className = 'nav-link'
            op1.textContent = 'Minhas propostas'


            propostas2.appendChild(op1)
            
            opcoes.appendChild(propostas2)

        }
    
    } else {
        console.log("oi")
        //
    
    }
}




carregar()
const lista = document.getElementById("lista_propostas")


async function criarElementos(proposta) {
        
        let veiculoproposta = (await getveiculoid(proposta.veiculo_idveiculo))[0];
        console.log(veiculoproposta)
        
        var list_item = document.createElement("li");
        var item_div = document.createElement("div");
        item_div.className = 'proposta';

        var item_img = document.createElement("img");
        item_img.className = 'proposta-imagem'//img
        item_img.src = veiculoproposta.imagem


        var item_div2 = document.createElement("div");
        item_div2.className = 'proposta-detalhes';
        var item_name = document.createElement("h2");
        
        item_name.textContent = veiculo.marca+ " "+veiculoproposta.modelo;//nome

        var item_valorporposto = document.createElement("h2");
        item_valorporposto.className = "proposta-valor"
        item_valorporposto.textContent = "Valor proposto: "

        var item_price = document.createElement("spam");
        item_price.className = 'span-valor'
        
        item_price.textContent = `R$ ${parseFloat(proposta.valor).toFixed(2)}`;//preco
        item_valorporposto.appendChild(item_price)

        var btn_deletar = document.createElement("button");
        btn_deletar.className = "btn btn-danger"
        btn_deletar.textContent = "Excluir proposta"
        btn_deletar.onclick = async function() {
            lista.removeChild(list_item);
            await removerProposta(proposta.idproposta)
        }

        item_div2.appendChild(item_name)
        item_div2.appendChild(item_valorporposto)
        item_div2.appendChild(btn_deletar)
        item_div.appendChild(item_img)
        item_div.appendChild(item_div2)
        list_item.appendChild(item_div)
        lista.appendChild(list_item)





}

async function carregarLista(itens) {
    for(const proposta of itens){
        await criarElementos(proposta)
    }
}
