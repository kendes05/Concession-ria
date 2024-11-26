const db = require("../config/db")
class TestDriveModel{


    static async getTestDrive(id){

        return new Promise((resolve,reject) => {
            db.query('SELECT * FROM testdrive where idtestdrive=?',[id],(error,result)=>{
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            })
        })

    }

    static async getTestDrives(){

        return new Promise((resolve,reject) => {
            db.query('SELECT * FROM testdrive',[],(error,result)=>{
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            })
        })

    }


    static async addTestDrive(idusuario,idveiculo,data){
        return new Promise((resolve,reject) => {
            db.query('insert into testdrive(usuario_idusuario,veiculo_idveiculo,data) values (?,?,?)',[idusuario,idveiculo,data],(error,result)=>{
                if (error) {
                    return reject(error);
                }
                resolve(true);
            })
        })
    }

    static async deleteTestDrive(id){
        return new Promise((resolve,reject) => {
            db.query('delete from testdrive where id=?',[id],(error,result)=>{
                if (error) {
                    return reject(error);
                }
                resolve(true);
            })
        })
    }
    
    
}
module.exports = TestDriveModel