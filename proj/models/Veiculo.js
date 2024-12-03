const db = require("../config/db")

class VeiculoModel{

    static async getVeiculos(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM veiculo', [], (error, result) => {
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getVeiculo(id){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM veiculo where idveiculo=?', [id], (error, result) => {
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            });
        });
    }



    static async addVeiculo(modelo, marca, ano, preco, cor,imagem){
        return new Promise((resolve, reject) => {
            db.query('insert into veiculo(modelo,marca,ano,preco,cor) values (?,?,?,?,?,?)', [modelo, marca, ano, preco, cor,imagem], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(true);
            });
        });
    }

    static async deleteVeiculo(id){
        return new Promise((resolve, reject) => {
            db.query('delete from veiculo where idveiculo=?', [id], (error, result) => {
                if(error)
                    resolve(false)
                    else
                    resolve(true)
            });
        });
    }
    
    


}

module.exports = VeiculoModel
