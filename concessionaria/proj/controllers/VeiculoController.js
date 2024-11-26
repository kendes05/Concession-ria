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


    static async getImagem(req,res){
        const id = req.body.id
        var results=await veiculoModel.getImagem(id)

        if(results)
        res.send(results)
    }

    static async getFotos(req,res){
        const id = req.body.id
        var results=await veiculoModel.getFotos(id)

        if(results)
        res.send(results)
    }

    static async getMarca(req,res){
        const id = req.body.id
        console.log(id)
        var results=await veiculoModel.getMarca(id)

        if(results)
        res.send(results)
    }

    static async addVeiculo(req,res){
        const {modelo,marca_idmarca,ano,preco,cor,tipo} = req.body
        
        try{
            await veiculoModel.addVeiculo(modelo,marca_idmarca,ano,preco,cor,tipo)
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

    static async addImg(req,res){
        const {url,idveiculo} = req.body
   

        try{
            await veiculoModel.addImg(url,idveiculo)
        }catch(error){
            console.error("Erro ao adicionar imagem:", error);
        }
        
    }

}

module.exports= VeiculoController