async function getVeiculo(id) {
    try {
        const response = await fetch('http://localhost:3000/getveiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao buscar dados do veículo:', error);
    }
}

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

async function carregar() {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
        let usuario = await getuserid(userId);
        usuario = usuario[0];

        document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario.nome}`;
        document.getElementById('perfilusuario').classList.remove('user');
        document.getElementById('perfilusuario').style.color = 'black';


        const veiculoId = sessionStorage.getItem("veiculoId"); 
        if (veiculoId) {
            let veiculo = await getVeiculo(veiculoId);
            veiculo = veiculo[0];

            document.getElementById('nome-veiculo').textContent = veiculo.nomeVeiculo;
            document.getElementById('marcaEModelo').textContent = veiculo.marcaModelo;
            document.getElementById('precoVeiculo').textContent = `Preço: R$${veiculo.preco}`;

            document.querySelector('.upload-area img').setAttribute('src', veiculo.imagem);
        }
    }
}

carregar();
