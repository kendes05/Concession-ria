const db = require('../config/db')

class VendaModel{

    static async getVendas(){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM venda', [], (error, result) => {
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            });
        });
    }


    static async getVenda(idusuario){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM venda where usuario_idusuario=?', [idusuario], (error, result) => {
                if (error) {
                    reject(error);  // Adicionando reject para tratar o erro
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async addVenda(idusuario,data,idveiculo,valor){

        return new Promise((resolve, reject) => {
            
            db.query('insert into venda(usuario_idusuario,data,veiculo_idveiculo,valor) values (?,?,?,?)', [idusuario,data,idveiculo,valor], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(true);
            });
        });


    }




}

module.exports = VendaModel