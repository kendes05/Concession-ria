                                     // TUTORIAL //


1) LOCALIZAR O DIRETORIO DO SERVIDOR

EX: cd C:/Users/User/Desktop/Concessionaria/concessionaria/script

cd 'C:\Users\ptimb\OneDrive\Área de Trabalho\Concessionaria\concessionaria\script'

2) SUBSTITUIR A PORTA (PADRÃO 3000)

3) node server.js INICIA O SERVIDOR

4)CTRL C PARA O SERVIDOR

5) ADICIONAR VEICULOS NO BANCO DE DADOS


LEMBRETES:

VERIFICAR O CONSOLE DO NAVEGADOR E DO TERMINAL DO server.js

host: 'localhost'
user: 'root'   
password: '12345678'

USE concessionaria;
SELECT * FROM marca;
INSERT INTO marca VALUES (1,"FIAT","pq isso é varchar?");
SELECT * FROM veiculo;
INSERT INTO veiculo (idveiculo, modelo, marca_idmarca, ano, preco, cor, img) VALUES
(1, 'FIAT Uno', null, 2024, 12434, 'branco', null),
(9, 'Ford Fiesta', null, 2023, 17500, 'preto', null),
(3, 'Volkswagen Golf', null, 2022, 33000, 'azul', null),
(4, 'Chevrolet Onix', null, 2024, 21500, 'vermelho', null),
(5, 'Honda Civic', null, 2024, 120000, 'prata', null);



EM BREVE:
Atributo marca na tabela carro.
Fotos no banco de dados
Limpar filtros.
tela-produto.
