const btnAvançar = document.getElementById("avançar");
btnAvançar.addEventListener("click",function(){
    window.location.href="/concessionaria/html/Opcionais.html";
})




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
    const userid = sessionStorage.getItem('userid');
    if (userid) {
        console.log(userid)
        let usuario = await getuserid(userid)
        usuario = usuario[0]

        document.getElementById('perfilusuario').textContent = `Bem-vindo, ${usuario.nome}`;
        document.getElementById('perfilusuario').classList.remove('user');
        document.getElementById('perfilusuario').style.color = 'black'
        
    
    } else {

        //
    
    }
}
console.log("ok")
carregar()