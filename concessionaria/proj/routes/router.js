const express = require('express')
const usercontroller = require("../controllers/UserController")
const testdrivecontroller = require("../controllers/TestDriveController")
const veiculoController = require("../controllers/VeiculoController")
const vendaController = require("../controllers/VendaController")
const propostaController = require("../controllers/PropostaController")

const router = require('express').Router()

router.get("/",(req,res,next)=>{
    res.send("dsaads")
})





//usuário

//retorna todos os usuários
router.get("/getusers",usercontroller.getalluser)
//envia um codigo de confirmação para o email (email)
router.post("/adduser",usercontroller.addnewuser)
//verifica o código e adiciona o usuário se estiver correto (nome, email, senha,code)
router.post("/emailcheck",usercontroller.verifyConfirmationCode)
//deleta um usuario (id)
router.post("/deleteuser",usercontroller.deleteuser)
//retorna o usuario pelo id (id)
router.post("/getuserbyid",usercontroller.getUserById)
//retorna o usuario pelo email (email)
router.post("/getuserbyemail",usercontroller.getUserByEmail)
//confere se o email e senha são compativeis (email, senha)
router.post("/conferirsenha",usercontroller.conferirSenha)
//limpa as verificações (email)
router.post("/limparverif",usercontroller.limparVerif)


//testdrive

//adiciona um testdrive (idusuario, data, idveiculo)
router.post("/addtestdrive",testdrivecontroller.addTestDrive)
//deleta um testdrive (id)
router.post("/deletetestdrive",testdrivecontroller.deleteTestDrive)
//retorna um testdrive (id)
router.post("/gettestdrive",testdrivecontroller.getTestDrive)
//retorna todos os test drives
router.get("/gettestdrives",testdrivecontroller.getTestDrives)



//veiculos

//retorna todos os veiculos
router.get("/getveiculos",veiculoController.getVeiculos)
//retorna veiculo pelo id (id)
router.post("/getveiculo",veiculoController.getVeiculo)
//retorna a imagem destaque do veiculo (id)
router.post("/getimg",veiculoController.getImagem)
//retorna todas as imagens do veiculo
router.post("/getimgs",veiculoController.getFotos)
//adiciona uma imagem ao veiculo (url, idveiculo)
router.post("/addimg",veiculoController.addImg)
//retorna a marca do veiculo (id)
router.post("/getmarca",veiculoController.getMarca)
//adiciona um veiculo (modelo, marca_idmarca, ano, preco, cor, tipo)
router.post("/addveiculo",veiculoController.addVeiculo)
//deleta um veiculo pelo id
router.post("/addveiculo",veiculoController.deleteVeiculo)



//vendas

//retorna todas as vendas
router.get("/getvendas",vendaController.getVendas)
//retorna as vendas do usuario (idusuario)
router.post("/getvenda",vendaController.getVenda)
//adiciona uma venda (idusuario, idveiculo, valor)
router.post("/addvenda",vendaController.addVenda)


//propostas

//retorna todas as propostas
router.get("/getpropostas",propostaController.getPropostas)
//retorna uma proposta pelo id (id)
router.post("/getproposta",propostaController.getProposta)
//retorna as propostas pelo usuario (idusuario)
router.post("/getpropostausuario",propostaController.getPropostasUsuario)
//adiciona uma proposta (idusuario,nome,email,cpf,idveiculo,valor)
router.post("/addproposta",propostaController.addProposta)
//deleta uma proposta pelo id (id)
router.post("/deleteproposta",propostaController.deleteProposta)
//aceita uma proposta pelo id (id)
router.post("/aceitarproposta",propostaController.aceitarProposta)
//recusa uma proposta pelo id (id)
router.post("/recusarproposta",propostaController.negarProposta)



module.exports=router