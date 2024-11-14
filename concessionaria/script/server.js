import express from 'express';
import mysql from 'mysql2';

// Criação da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',      
  password: '12345678', 
});

// Conectando ao banco de dados
connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL');

  // Seleciona o banco de dados
  connection.query('USE concessionaria', (err) => {
    if (err) {
      console.error('Erro ao selecionar o banco de dados:', err);
      return;
    }

    const app = express();
    const port = 3001;

    // Definindo os cabeçalhos de CORS manualmente
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');  // Permitir qualquer origem (ou use o endereço do seu frontend, ex: http://127.0.0.1:5500)
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // Permitir esses métodos
      res.header('Access-Control-Allow-Headers', 'Content-Type');  // Permitir o tipo de conteúdo
      next();
    });

    // Middleware para converter o corpo da requisição para JSON
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));





    // Rota de busca por filtro (incompleto)
    app.get('/busca', (req, res) => {
      const valorBusca = req.query.valor;
      
      // Se não houver valor na busca, retorna todos os carros
      const query = valorBusca
        ? 'SELECT modelo, preco, img FROM veiculo WHERE modelo LIKE ? LIMIT 4'
        : 'SELECT modelo, preco, img FROM veiculo';  // Retorna todos os veículos
    
      connection.query(query, [`%${valorBusca}%`], (err, results) => {
        if (err) {
          console.error('Erro ao consultar o banco de dados:', err);
          return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }
    
        res.json(results);  // Retorna os resultados da consulta
      });
    });
    
    


    // Rota para buscar informações dos veiculos
    app.get('/destaques', (req, res) => {
      // Consulta para pegar veículos em destaque
      const query = 'SELECT modelo, preco, img FROM veiculo LIMIT 4';  // Pega os primeiros 4 veículos (ajuste conforme necessário)
      
      connection.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao consultar o banco de dados:', err);
          return res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        }

        // Retorna os resultados da consulta no formato JSON
        res.json(results);
      });
    });






    // Inicializando o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });

    // Fechar a conexão após a execução
    
  });
});
