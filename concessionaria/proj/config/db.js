const mysql = require('mysql2')


const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"12345678",
    database:"concessionaria"

})

db.getConnection(()=>{
    console.log("conectado ao banco de dados")
})
module.exports=db;
