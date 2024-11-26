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


    static async getImagem(id){
        return new Promise((resolve, reject) => {
            db.query('SELECT url FROM imagem where veiculo_idveiculo=? limit 1', [id], (error, result) => {
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            });
        });


    }

    static async getFotos(id){
        return new Promise((resolve, reject) => {
            db.query('SELECT url FROM imagem where veiculo_idveiculo=?', [id], (error, result) => {
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            });
        });


    }


    static async getMarca(id){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM marca where idmarca=?', [id], (error, result) => {
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async addveiculo(modelo,marca_idmarca,ano,preco,cor,tipo){
        return new Promise((resolve, reject) => {
            db.query('insert into veiculo(modelo,marca_idmarca,ano,preco,cor,tipo) values (?,?,?,?,?,?)', [modelo,marca_idmarca,ano,preco,cor,tipo], (error, result) => {
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
    
    static async addImg(url,idveiculo){
        
        return new Promise((resolve, reject) => {
            db.query('insert into imagem (url, veiculo_idveiculo) values (?,?)', [url,idveiculo], (error, result) => {
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            });
        });
    }


}

module.exports = VeiculoModel