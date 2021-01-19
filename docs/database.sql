-- Copiando estrutura do banco de dados para teste_schema
CREATE DATABASE IF NOT EXISTS `teste_schema` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `teste_schema`;

-- Copiando estrutura para tabela teste_schema.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
    `iCodUsuario` int(11) NOT NULL AUTO_INCREMENT,
    `cNome` varchar(120) NOT NULL,
    `dtNascimento` date NOT NULL,
    `cSexo` enum('M','F') NOT NULL,
    `cCep` varchar(8) DEFAULT NULL,
    `cEndereco` varchar(120) DEFAULT NULL,
    `cNumero` varchar(12) DEFAULT NULL,
    `cComplemento` varchar(50) DEFAULT NULL,
    `cBairro` varchar(120) DEFAULT NULL,
    `cEstado` varchar(2) DEFAULT NULL,
    `cCidade` varchar(120) DEFAULT NULL,
    `dttCadastro` datetime DEFAULT NULL,
    `dttAtualizacao` datetime DEFAULT NULL,
    PRIMARY KEY (`iCodUsuario`)
    ) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;
