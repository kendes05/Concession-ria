import { connection } from './dbConnection';  // Certifique-se de que a conexão foi configurada corretamente

// Exportação direta da função
export function busca(valorbusca, callback) {
    connection.query('SELECT * FROM veiculo WHERE modelo = ?', [valorbusca], (err, results) => {
        if (err) {
            console.error('Erro na consulta: ' + err.stack);
            callback(err, null);
            return;
        }
        callback(null, results);
    });
}
