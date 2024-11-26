const vendaModel = require("../models/Venda")

function pegarDataParaMySQL() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); 
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

class VendaController{

    static async getVendas(req,res){
        var results = await vendaModel.getVendas()

        if(results)
            res.send(results)

    }


    static async getVenda(req,res){
        const idusuario = req.body.idusuario
        var results = await vendaModel.getVenda(idusuario)

        if(results)
            res.send(results)
    }

    
    


    static async addVenda(req,res){ 
        const {idusuario,idveiculo,valor} = req.body
        const data = pegarDataParaMySQL()

        var results = await vendaModel.addVenda(idusuario,data,idveiculo,valor)

        if(results)
            res.send(results)
    }


}

module.exports = VendaController