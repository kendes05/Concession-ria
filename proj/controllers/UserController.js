const userModel=require("../models/User")
const emailc = require('../utils/confirmarEmail')
const bcrypt = require('bcrypt');

class UserController{

    static async getalluser(req,res){

        var results=await userModel.getusers()

        if(results)
        res.send(results)
    }




    static async addnewuser(req, res) {
        const email = req.body.email;
    
        // Gerar código de confirmação e data de expiração
        const confirmationCode = emailc.generateCode();
        
    
        try {
            // Primeiramente, vamos armazenar o código de confirmação na tabela email_verifications
            await userModel.storeConfirmationCode(email, confirmationCode);
    
            // Enviar o código de confirmação por email
            await emailc.sendConfirmationEmail(email, confirmationCode);
    
            // Informar ao usuário que o cadastro foi iniciado e que ele precisa confirmar o email
            res.send("Cadastro iniciado. Verifique seu email para confirmar a conta.");
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            res.status(500).send("Erro ao iniciar o cadastro.");
        }
    }

    static async verifyConfirmationCode(req, res) {
        const {nome,email,senha,code } = req.body;

        try {
            // Verificar se o código de confirmação existe e corresponde
            const result = await userModel.verifyCode(email, code);
    
            if (result) {

                const saltRounds = 10;
                const senhaHash = await bcrypt.hash(senha, saltRounds);

                // Se o código for válido, agora o usuário será cadastrado na tabela 'usuario'
                await userModel.adduserToUsuario(nome, email, senhaHash); // Agora que o código foi verificado, podemos adicionar o usuário.
    
                // Marcar o código como verificado
                await userModel.markCodeAsVerified(email);
    
                res.send(true);
            } else {
                res.status(400).send(false);
            }
        } catch (error) {
            console.error("Erro ao verificar o código de confirmação:", error);
            res.status(500).send("Erro ao verificar o código.");
        }
    }

    static async limparVerif(req,res){
        const email = req.body.email

        if(email){
            var result=await userModel.limparVerif(email)
            if(result)
            res.send("sucesso ao deletar")
            else
            res.send("erro ao deletar")
        }


    }



    static async deleteuser(req,res){
        const id = req.body.id

        if(id){
            var result=await userModel.deleteuser(id)
            if(result)
            res.send("sucesso ao deletar")
            else
            res.send("erro ao deletar")
        }
    }


    static async getUserById(req,res){
        const id = req.body.id
    
        var results=await userModel.getUserById(id)

        if(results)
        res.send(results)
    }

    static async getUserByEmail(req,res){
        
        const email = req.body.email
        var results=await userModel.getUserByEmail(email)

        if(results)
        res.send(results)
    }

    static async conferirSenha(req, res) {
        try {
            const { email, senha } = req.body;
    
            
            console.log('Dados recebidos:', email, senha);
    
            const results = await userModel.getUserByEmail(email);
    
           
     
            if (results) {
                if (bcrypt.compareSync(senha, results[0].senha)) {
                    return res.send(results[0]);
                } else {
                    return res.send(false); // Senha incorreta
                }
            } else {
                return res.send(false); // Usuário não encontrado
            }
        } catch (error) {
            console.error('Erro ao conferir a senha:', error);
            return res.status(500).send('Erro interno do servidor');
        }
    }


}

module.exports=UserController