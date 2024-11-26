async function getuserid(id) {
    try {
        const response = await fetch('http://localhost:3000/getuserbyid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
    }
}

async function getveiculoid(id) {
    try {
        const response = await fetch('http://localhost:3000/getveiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error('Erro ao buscar veículo:', error);
    }
}

async function getagendamento() {
    try {
        const response = await fetch('http://localhost:3000/gettesdrives', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        return result;

    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
    }
}

const nomeModelo = document.getElementById("nomeModelo");
const nomeCliente = document.getElementById("nomeCliente");
const dataAgendamento = document.querySelector(".horario span");

async function carregar() {
    const userId = sessionStorage.getItem("userId");

    if (userId) {
        const usuario = await getuserid(userId);

        if (usuario && usuario.length > 0) {
            document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario[0].nome}`;
            document.getElementById('perfilusuario').classList.remove('user');
            document.getElementById('perfilusuario').style.color = 'black';
        }
    }

    const agendamento = await getagendamento();

    if (agendamento && agendamento.length > 0) {
        const primeiroAgendamento = agendamento[0];

        const veiculo = await getveiculoid(primeiroAgendamento.veiculoId);

        if (veiculo && veiculo.length > 0) {
            nomeModelo.textContent = veiculo[0].nomeVeiculo; 
        } else {
            console.error("Veículo não encontrado.");
        }

        nomeCliente.textContent = primeiroAgendamento.nomeCliente; 
        dataAgendamento.textContent = primeiroAgendamento.dataAgendamento;

    } else {
        console.error("Nenhum agendamento encontrado.");
    }
}

carregar();
