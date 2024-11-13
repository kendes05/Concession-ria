const avancarBtn = document.getElementById('btn-entrar');
const criarBtn = document.getElementById('btn-criar-conta');
const voltarTxt = document.getElementById('voltar-senha');
const container = document.getElementById('container');

avancarBtn.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

voltarTxt.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

