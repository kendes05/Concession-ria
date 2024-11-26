

const avancarBtn = document.getElementById('btn-entrar');
const criarBtn = document.getElementById('btn-criar-conta');
const voltarTxt = document.getElementById('voltar-senha');
const container = document.getElementById('container');


async function addUser(nome, email, senha) {
    
    try {
        const response = await fetch('http://localhost:3000/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        });
        
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
    }
}

async function verifyEmailCode(nome,email, senha,code) {
    try {
        const response = await fetch('http://localhost:3000/emailcheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, email,senha, code })
        });
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Erro ao verificar código de confirmação:', error);
    }
}

async function getuseremail(email) {
    try {
        const response = await fetch('http://localhost:3000/getuserbyemail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email })
        });
        
        const result = await response.json();
        return result
        //console.log(result);
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}


async function limparVerif(email) {
    try {
        const response = await fetch('http://localhost:3000/limparverif', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email })
        });
        
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error('erro ao apagar:', error);
    }
}


function validatePassword(password, confirmPassword) {

    if (password !== confirmPassword) {
        return 0;
    }

    if (password.length < 8) {
        return 1;
    }

    if (!/^[A-Za-z0-9]+$/.test(password)) {
        return 2;
    }
    if (!/[a-z]/.test(password)) {
        return 3;
    }
    return 4;
}

const nomec = document.getElementById('nomecadastro')

const emailc = document.getElementById('emailcadastro')


const senhac = document.getElementById('senhacadastro')

const confsenhac = document.getElementById('confsenhacadastro')

const codigoc = document.getElementById('codigoc');


avancarBtn.addEventListener('click', async () => {
    console.log("ok")
    console.log(nomec.value)
    console.log(emailc.value)
    console.log(senhac.value)
    console.log(confsenhac.value)

	senha = senhac.value
	confsenha = confsenhac.value

	senhastatus = validatePassword(senha,confsenha)

	if(senhastatus==4){

        let result = await getuseremail(emailc.value)
        console.log(result)
        console.log(result[0])
        console.log(result.length)
        if(result.length===0){
            await limparVerif(emailc.value)
		    await addUser(nomec.value,emailc.value,senha)
            container.classList.add("right-panel-active");
        }

        else{

            //email já cadastrado


        }



		
	}



	
});

criarBtn.addEventListener('click',async()=>{
    console.log(codigoc)
	code = codigoc.value
	if(code!=""){
        
        result = await verifyEmailCode(nomec.value,emailc.value,senhac.value,code)
        if(result){
            result2 = await getuseremail(emailc.value)
            sessionStorage.setItem('userid', result2[0].idusuario); 
            window.location.href = "index.html";
        }
    }
	
})

voltarTxt.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

