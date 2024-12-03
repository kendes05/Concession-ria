const btnAvançar = document.getElementById("avançar");
const ano = document.getElementById("ano");
const cor = document.getElementById("modelo")
const modelo = document.getElementById("modelo")
const marca = document.getElementById("marca")
const preco = document.getElementById("preco")
const img = ""



btnAvançar.addEventListener("click",function(){

    
    sessionStorage.setItem("ano",ano.value)
    sessionStorage.setItem("cor",cor.value)
    sessionStorage.setItem("modelo",modelo.value)
    sessionStorage.setItem("marca",marca.value)
    sessionStorage.setItem("img",img)







    window.location.href="../html/Resumo.html";
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










