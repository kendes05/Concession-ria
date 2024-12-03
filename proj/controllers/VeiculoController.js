const veiculoModel = require("../models/Veiculo")

class VeiculoController{


    static async getVeiculos(req,res){

        var results=await veiculoModel.getVeiculos()

        if(results)
        res.send(results)


    }

    static async getVeiculo(req,res){
        const id = req.body.id
        
        var results=await veiculoModel.getVeiculo(id)

        if(results)
        res.send(results)


    }


    
    static async addVeiculo(req,res){
        const {modelo, marca, ano, preco, cor,imagem} = req.body
        
        try{
            await veiculoModel.addVeiculo(modelo, marca, ano, preco, cor,imagem)
        }catch(error){
            console.error("Erro ao adicionar veiculo:", error);
        }
       
    }

    static async deleteVeiculo(req,res){
        const id = req.body.id
        var results=await veiculoModel.deleteVeiculo(id)

        if(results)
        res.send(results)
    }

    

}

module.exports= VeiculoController
