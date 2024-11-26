

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
const opcoes = document.getElementById('navbar-op')


async function carregar() {
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
            var op2 = document.createElement('a')
            op2.href = 'TestdrivesADM.html'
            op2.className = 'nav-link'
            op2.textContent = 'Test-drives'
            var op3 = document.createElement('a')
            op3.href = 'CadastroProduto.html'
            op3.className = 'nav-link'
            op3.textContent = 'Cadastrar'

            propostas.appendChild(op1)
            testdrives.appendChild(op2)
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