

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

async function aceitarProposta(id) {
    try {
        const response = await fetch('http://localhost:3000/aceitarproposta', {
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

async function recusarProposta(id) {
    try {
        const response = await fetch('http://localhost:3000/recusarproposta', {
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

async function getPropostas() {
    try {
        const response = await fetch(`http://localhost:3000/getpropostas`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const result = await response.json();
        
        return result;
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}



async function carregar(){
    

    
        let propostas = await getPropostas()
        carregarLista(propostas)
    
}

carregar()


//<div class="proposta">
                //<img src="../img/carro1.png" alt="Carro" class="proposta-imagem">
                //<div class="proposta-detalhes">
                   // <h2 class="carro-nome">Nome do Carro</h2>
                   // <h3 class="cliente-nome">Nome do Cliente</h3>
                    //<p class="cliente-email">Email do Cliente: <span>cliente@email.com</span></p>
                   // <p class="valor-proposto">Valor Proposto: <span>120.000 R$</span></p>
                  //  <div class="botoes">
                    //    <button type="button" class="btn btn-success">Aceitar proposta</button>
                   //     <button type="button" class="btn btn-danger">Recusar proposta</button>
              //      </div>
           //     </div>
         //   </div>

    
    const lista = document.getElementById("listaPropostasUl")





async function criarItem(proposta){
    
    let cliente = await getuserid(proposta.cliente_idcliente)
    let veiculo = await getveiculoid(proposta.veiculo_idveiculo)

    var li = document.createElement("li")
    var div = document.createElement("div")
    div.className = "proposta"

    var img = document.createElement("img")
    img.className = "proposta-imagem"
    img.src = veiculo.imagem

    var div2 = document.createElement("div")
    div2.className = "proposta-detalhes"

    var h2 = document.createElement("h2")
    h2.className = "carro-nome"

    h2.textContent = veiculo[0].modelo

    var h3 = document.createElement("h3")
    h3.className = "cliente-nome"

    h3.textContent = cliente[0].nome

    var p = document.createElement("p")
    p.className = "cliente-email"

    p.textContent = "Email do cliente: "

    var spam = document.createElement("spam")
    spam.className = ""

    spam.textContent = cliente[0].email

    var p2 = document.createElement("p")
    p2.className = "valor-proposto"
    
    p2.textContent = "Valor proposto: "

    p2.textContent = proposta.valor


    var spam2 = document.createElement("spam")
    spam2.className = ""

    var div3 = document.createElement("div")
    div3.className = "botoes"


    var button1 = document.createElement("button")
    button1.className = "btn btn-success"

    button1.textContent = "Aceitar proposta"

    button1.onclick = async function(){
        lista.removeChild(li)
        // Ao aceitar, remove da lista. Colocar pop-up
        await aceitarProposta(proposta.idproposta)
    }

    var button2 = document.createElement("button")
    button2.className = "btn btn-danger"

    button2.textContent = "Recusar proposta"

    button2.onclick = async function(){
        lista.removeChild(li)
        // Ao recusar, remove da lista. Colocar pop-up
        await recusarProposta(proposta.idproposta)
    }

    div3.appendChild(button1)
    div3.appendChild(button2)
    
    p.appendChild(spam)
    p2.appendChild(spam2)

    div2.appendChild(h2)
    div2.appendChild(h3)
    div2.appendChild(p)
    div2.appendChild(p2)
    div2.appendChild(div3)

    div.appendChild(img)
    div.appendChild(div2)

    li.appendChild(div)

    lista.appendChild(li)

}

async function carregarLista(itens){
    for(const proposta of itens){
        await criarItem(proposta)
    }
}
