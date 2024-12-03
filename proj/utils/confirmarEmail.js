const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Para gerar o código aleatório
 // Para lidar com datas e expiração

// Função para enviar o código de confirmação por email
async function sendConfirmationEmail(email, code) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Exemplo com Gmail, você pode mudar para outro serviço
        auth: {
            user: 'fortalmotors100@gmail.com',
            pass: 'gvat cnep koga shlx'
        }
    });

    const mailOptions = {
        from: 'fortalmotors100@gmail.com',
        to: email,
        subject: 'Código de Confirmação',
        text: `Seu código de confirmação é: ${code}`
    };

    await transporter.sendMail(mailOptions);
}


async function emailPropostaAceita(email, valor) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Exemplo com Gmail, você pode mudar para outro serviço
        auth: {
            user: 'fortalmotors100@gmail.com',
            pass: 'gvat cnep koga shlx'
        }
    });

    const mailOptions = {
        from: 'fortalmotors100@gmail.com',
        to: email,
        subject: 'Proposta aceita',
        text: `Parabéns!!! Sua proposta foi aceita, valor a pagar: $${valor}`
    };

    await transporter.sendMail(mailOptions);
}

async function emailPropostaRecusada(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',  // Exemplo com Gmail, você pode mudar para outro serviço
        auth: {
            user: 'fortalmotors100@gmail.com',
            pass: 'gvat cnep koga shlx'
        }
    });

    const mailOptions = {
        from: 'fortalmotors100@gmail.com',
        to: email,
        subject: 'Proposta aceita',
        text: `Sentimos muito, Sua proposta foi recusada`
    };

    await transporter.sendMail(mailOptions);
}


// Gerar código aleatório de 6 dígitos
function generateCode() {
    return crypto.randomBytes(3).toString('hex').toUpperCase(); // Código de 6 caracteres
}

module.exports={
    sendConfirmationEmail,generateCode,emailPropostaAceita,emailPropostaRecusada
}
