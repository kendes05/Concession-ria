
const ano = sessionStorage.getItem("ano");
const modelo = sessionStorage.getItem("modelo");
const cor = sessionStorage.getItem("cor");
const marca = sessionStorage.getItem("marca");
const preco = sessionStorage.getItem("preco")
const img = sessionStorage.getItem("img")














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





    

console.log(marca)

document.getElementById('anov').textContent = `Ano: ${ano}`;
document.getElementById('corv').textContent = `Cor: ${cor}`;
document.getElementById('precov').textContent = `Preço: R$${preco}`;
document.getElementById('nomev').textContent = `${marca} ${modelo}`;






    








async function addveiculo(modelo, marca, ano, preco, cor,imagem) {
    try {
        console.log("usou a funcao")
        const response = await fetch('http://localhost:3000/addveiculo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({modelo, marca, ano, preco, cor,imagem})
        });
        
        const result = await response.json();
        
        return result
        
    } catch (error) {
        console.error('Erro ao buscar:', error);
    }
}

















const btnfinalizar = document.getElementById("finalizar")
btnfinalizar.addEventListener("click",async()=>{

    await addveiculo(modelo,marca,ano,preco,cor,img)



})








