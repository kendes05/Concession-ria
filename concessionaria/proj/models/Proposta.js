const db = require("../config/db")

class PropostaModel{

    static async getPropostas(){

        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM proposta', [], (error, result) => {
                if (error) {
                    reject(error); 
                } else {
                    resolve(result);
                }
            });
        });

    }


    static async getProposta(id){
        
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM proposta where idproposta =?', [id], (error, result) => {
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            });
        });

    }   


    static async addProposta(idusuario,data,idveiculo,valor){
        try {
            console.log("-- 3")

            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO proposta (usuario_idusuario, data, veiculo_idveiculo, valor) VALUES ( ?, ?, ?, ?)';
                db.query(query, [idusuario,data,idveiculo,valor], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(true);
                });
            });
        } catch (error) {
            console.error("Erro ao adicionar:", error);
            throw error;
        }



    }


    static async deleteProposta(id){
        return new Promise(resolve=>{
            db.query('delete from proposta where idproposta=?',[id],(error,result)=>{
                if(error)
                resolve(false)
                else
                resolve(true)
            })
        })
    }


    


    static async getPropostasUsuario(idusuario){
        
        return new Promise(resolve=>{
            db.query('select * from proposta where usuario_idusuario=?',[idusuario],(error,result)=>{
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            })
        })
    }

}

module.exports = PropostaModel