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

async function adicionarTestDrive(idusuario, data, idveiculo) {
    try {
        const response = await fetch('http://localhost:3000/addtestrive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idusuario, data, idveiculo})
        });
        
        const result = await response.json();
        
        return result
        
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}

const userId = 0
const veiculoid=0
async function carregar(){
    userId = sessionStorage.getItem("userId")
    veiculoid =sessionStorage.getItem("veiculoId")
    if(userId && veiculoid){

    let usuario = await getuserid(userId)

    let veiculo = await getveiculoid(veiculoid)

    usuario = usuario[0]
    veiculo = veiculo[0]

    document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario.nome}`;
        document.getElementById('perfilusuario').classList.remove('user');
        document.getElementById('perfilusuario').style.color = 'black';
        
    }
}

carregar()

const agendarTestDrive = document.getElementById("dateInput")
const botaoConfirmar = document.getElementById("confirm-button")

botaoConfirmar.addEventListener('click', async()=>{
    let data = agendarTestDrive.value
    await adicionarTestDrive(userId, data,veiculoid)
    // Adicionar um pop-up depois que a data for selecionada
})