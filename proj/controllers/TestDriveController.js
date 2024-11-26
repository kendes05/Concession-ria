const testDriveModel = require("../models/TestDrive")

class TestDriveController{
    static async getTestDrive(req,res){
        const id = req.body.id
        var results = await testDriveModel.getTestDrive(id)

        if(results)
            res.send(results)

    }

    static async getTestDrives(req,res){
        var results = await testDriveModel.getTestDrives()

        if(results)
            res.send(results)

    }

 
    static async addTestDrive(req,res){
        const {idusuario,data,idveiculo} = req.body
        
        try{
            await testDriveModel.addTestDrive(idusuario,idveiculo,data)
        }catch(error){
            console.error("Erro ao adicionar testdrive:", error);
        }
        


    }
    static async deleteTestDrive(req,res){
        const id = req.body.id
        try{
            await testDriveModel.deleteTestDrive(idusuario,idveiculo,data)
        }catch(error){
            console.error("Erro ao remover testdrive:", error);
        }
    }
}

module.exports = TestDriveController