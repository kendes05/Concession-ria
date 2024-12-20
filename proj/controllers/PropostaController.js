const propostaModel = require("../models/Proposta")
const emailc = require('../utils/confirmarEmail')
const userModel = require("../models/User")

function pegarDataParaMySQL() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

class PropostaController{

    static async getPropostas(req,res){

        var results=await propostaModel.getPropostas()

        if(results)
        res.send(results)
    }


    static async getProposta(req,res){

        const id = req.body.id

        var results=await propostaModel.getProposta(id)

        if(results)
        res.send(results)
    }


    static async addProposta(req,res){
        const {idusuario,idveiculo,valor} = req.body
        const data = pegarDataParaMySQL()
        console.log(idveiculo)
        console.log(valor)
        var results=await propostaModel.addProposta(idusuario,data,idveiculo,valor)

        if(results)
        res.send(results)
    }


    static async deleteProposta(req,res){
        const id = req.body.id

        if(id){
            var result=await propostaModel.deleteProposta(id)
            if(result)
            res.send("sucesso ao deletar")
            else
            res.send("erro ao deletar")
        }
    }


    static async aceitarProposta(req,res){
        const id = req.body.id
        console.log(id)
        var results=await propostaModel.getProposta(id)
        if (results){
            var usuarioid = results[0].usuario_idusuario
            var result = await userModel.getUserById(usuarioid)
            console.log(result)

            await emailc.emailPropostaAceita(result[0].email, result[0].valor);


            if(id){
                var result=await propostaModel.deleteProposta(id)
                if(result)
                res.send("sucesso ao deletar")
                else
                res.send("erro ao deletar")
            }
        }else{
            console.log("erro ao buscar proposta")
        }
            

        

    }


    static async negarProposta(req,res){
        const id = req.body.id
        console.log(id)
        var results=await propostaModel.getProposta(id)
        
        if (results){
            var usuarioid = results[0].usuario_idusuario
            var result = await userModel.getUserById(usuarioid)
            console.log(result)
            await emailc.emailPropostaRecusada(result[0].email)


            if(id){
                var result=await propostaModel.deleteProposta(id)
                if(result)
                res.send("sucesso ao deletar")
                else
                res.send("erro ao deletar")
            }
        }else{
            console.log("erro ao buscar proposta")
        }
        
    }

    static async getPropostasUsuario(req,res){
        const idusuario = req.body.idusuario
        
        var results=await propostaModel.getPropostasUsuario(idusuario)

        if(results)
        res.send(results)
    }




}

module.exports = PropostaController
