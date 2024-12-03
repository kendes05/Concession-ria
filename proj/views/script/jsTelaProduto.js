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



async function adicionarProposta(idusuario,idveiculo,valor) {
    
    try {
        const response = await fetch('http://localhost:3000/addproposta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idusuario,idveiculo,valor})
        });
        
        const result = await response.json();
        
        return result
        
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}


var iduser= 0
var idveiculo=0
const opcoes = document.getElementById('navbar-op')

const marca = document.getElementById("textoMarca")
const marca2 = document.getElementById("marca")
const modelo2 = document.getElementById("modelo")
const cor = document.getElementById("cor")
const ano = document.getElementById("textoAno")

const preco = document.getElementById("textoPreco")



const nome = document.getElementById("textnome")
const email = document.getElementById("textemail")
const cpf = document.getElementById("textcpf")
const valor = document.getElementById("textvalor")

const btnenviar = document.getElementById("btnenviar")


async function carregar(){
    
    const veiculoid = sessionStorage.getItem("veiculoId")
    const userId = sessionStorage.getItem("userId")
    console.log(userId)
    
    console.log(veiculoid)
    if (veiculoid){
        idveiculo = veiculoid

        let veiculo = await getveiculoid(veiculoid)
        
        veiculo = veiculo[0]
        
        
        
        marca.textContent = (veiculo.marca)+" "
        var modelo = document.createElement("spam")
        modelo.className = 'text-primary'
        modelo.textContent = (veiculo.modelo)
        marca.appendChild(modelo)
        marca2.innerHTML = `<strong>Marca:</strong> ${veiculo.marca}`

        modelo2.innerHTML = `<strong>Modelo :</strong> ${veiculo.modelo}`
        ano.innerHTML = `<strong>Ano:</strong> ${veiculo.ano}`
        cor.innerHTML = `<strong>Cor:</strong> ${veiculo.cor}`
        
        preco.textContent = "R$ "+(+veiculo.preco).toFixed(2)
    }
    if(userId){

        iduser = userId
        

    let usuario = await getuserid(userId)

    if(usuario.idusuario === 1){
        var propostas = document.createElement('li')
        propostas.className = 'nav-item'
        
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

    

    usuario = usuario[0]
    veiculo = veiculo[0]

    document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario.nome}`;
    document.getElementById('perfilusuario').classList.remove('user');
    document.getElementById('perfilusuario').style.color = 'black';

    
        
        
    }
    

    
}

carregar()


btnenviar.addEventListener('click', async() => {

    if(iduser!=0){
       console.log(nome.value)
       if(nome.value!="" && email.value!="" && cpf.value!="" && valor.value!=""){
            
           
            await adicionarProposta(iduser,idveiculo,valor.value)
       }else{
           console.log("nao")
       }


    }

})

