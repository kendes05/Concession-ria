async function conferirsenha(email,senha) {
    try {
        const response = await fetch('http://localhost:3000/conferirsenha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,senha })
        });
        
        const result = await response.json();
        return result

    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}



const entrarBtn = document.getElementById('btnentrar');


const emaillogin = document.getElementById('emaillogin')
const senhalogin = document.getElementById('senhalogin')


entrarBtn.addEventListener('click', async() => {
	console.log(emaillogin.value)
	console.log(senhalogin.value)
	let result = await conferirsenha(emaillogin.value,senhalogin.value)
	if(result==false){
		
		//email ou senha incorretos


	}
	else{
		console.log(result)
        sessionStorage.setItem('userid', result.idusuario); 
        window.location.href = "index.html";
	}
	


});

