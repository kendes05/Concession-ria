const db = require("../config/db")





class UserModel{

    static async getusers() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuario', [], (error, result) => {
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            });
        });
    }

    


    static async adduserToUsuario(nome, email, senhaHash) {
        try {

            return new Promise((resolve, reject) => {
                const query = 'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)';
                db.query(query, [nome, email, senhaHash], (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(true);
                });
            });
        } catch (error) {
            console.error("Erro ao criptografar a senha:", error);
            throw error;
        }
    }

    static async storeConfirmationCode(email, confirmationCode) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO email_verifications (email, confirmation_code, verified) VALUES (?, ?, FALSE)';
            db.query(query, [email, confirmationCode], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }
    static async verifyCode(emailc, code) {
        return new Promise((resolve, reject) => {
            // Verificando se existe um código de confirmação para o email e se não foi verificado
            const query = 'SELECT email, verified FROM email_verifications where confirmation_code = ? AND verified = FALSE';
            
            db.query(query, [code], (error, result) => {
                if (error) {
                    return reject(error);
                }
    
                if (result.length === 0) {
                    // Se o resultado não encontrar nenhum código para o email ou o código já foi verificado
                    return resolve(false); 
                }
              
                
                const { email, verified } = result[0];

                // Verifica se o código enviado é igual ao código armazenado e se o código ainda não foi verificado
                if (email === emailc && !verified) {
                    resolve(true); // Código correto e não verificado
                } else {
                    resolve(false); // Código incorreto ou já verificado
                }
            });
        });
    }
    

    static async markCodeAsVerified(email) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE email_verifications SET verified = TRUE WHERE email = ?';
            db.query(query, [email], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });
    }


    static async deleteuser(id){
        return new Promise(resolve=>{
            db.query('delete from usuario where idusuario=?',[id],(error,result)=>{
                if(error)
                resolve(false)
                else
                resolve(true)
            })
        })
    }

    static async limparVerif(email){
        return new Promise(resolve=>{
            db.query('delete from email_verifications where email=?',[email],(error,result)=>{
                if(error)
                resolve(false)
                else
                resolve(true)
            })
        })
    }

    static async getUserById(id){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuario where idusuario=?', [id], (error, result) => {
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async getUserByEmail(email){
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM usuario where email=?', [email], (error, result) => {
                if (error) {
                    reject(error);  
                } else {
                    resolve(result);
                }
            });
        });
    }

   


}


module.exports=UserModel