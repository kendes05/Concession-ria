





create database concessionaria;
use concessionaria;

create table usuario(
	idusuario int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null
);



create table veiculo(
	idveiculo int primary key auto_increment,
    modelo varchar(100),
    marca varchar(100),
    ano varchar(10),
    preco decimal(10,2),
    cor varchar(50),
    
    imagem varchar(100)
);



create table proposta(
	idproposta int primary key auto_increment,
    usuario_idusuario int,
    data date,
    veiculo_idveiculo int,
    valor decimal(10,2),
    foreign key (veiculo_idveiculo) references veiculo(idveiculo),
    foreign key (usuario_idusuario) references usuario(idusuario)
);




CREATE TABLE email_verifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    confirmation_code VARCHAR(255),
    expiration DATETIME,
    verified BOOLEAN DEFAULT FALSE
);


