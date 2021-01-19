<?php

require_once 'Utilities.php';

class User{
    private PDO $dbConn;

    public function __construct(){
        $this->dbConn = new PDO('mysql: host=localhost; dbname=teste_schema;', 'root','');
    }

    /**
     * Salva os dados de um usuario na tabela 'usuario'
     *
     * @param object $userObj
     * @throws Exception
     */
	public function saveUser(object $userObj){
	    $arrCamposObrigatorios = [];
        $userObj->dtNascimento = Utilities::DataDb($userObj->dtNascimento);

        $sql = "INSERT INTO usuario(iCodUsuario,    cNome,          dtNascimento, 
                                    cSexo,          cCep,           cEndereco, 
                                    cNumero,        cComplemento,   cBairro, 
                                    cEstado,        cCidade,        dttCadastro)
				VALUES( :iCodUsuario,   :cNome,         :dtNascimento, 
				        :cSexo,         :cCep,          :cEndereco,
                        :cNumero,       :cComplemento,  :cBairro,
                        :cEstado,       :cCidade,       NOW())
				ON DUPLICATE KEY UPDATE
				cNome           = VALUES(cNome), 
				dtNascimento    = VALUES(dtNascimento),
                cSexo           = VALUES(cSexo),
                cCep            = VALUES(cCep),
                cEndereco       = VALUES(cEndereco), 
                cNumero         = VALUES(cNumero), 
                cComplemento    = VALUES(cComplemento),
				cBairro         = VALUES(cBairro), 
				cEstado         = VALUES(cEstado), 
				cCidade         = VALUES(cCidade),
				dttAtualizacao  = VALUES(dttCadastro)";

        $sqlParams = [  ':iCodUsuario'  =>  $userObj->iCodUsuario,
                        ':cNome'        =>  $userObj->cNome,
                        ':dtNascimento' =>  $userObj->dtNascimento,
                        ':cSexo'        =>  $userObj->cSexo,
                        ':cCep'         =>  isset($userObj->cCep)          ? $userObj->cCep            : NULL,
                        ':cEndereco'    =>  isset($userObj->cEndereco)     ? $userObj->cEndereco       : NULL,
                        ':cNumero'      =>  isset($userObj->cNumero)       ? $userObj->cNumero         : NULL,
                        ':cComplemento' =>  isset($userObj->cComplemento)  ? $userObj->cComplemento    : NULL,
                        ':cBairro'      =>  isset($userObj->cBairro)       ? $userObj->cBairro         : NULL,
                        ':cEstado'      =>  isset($userObj->cEstado)       ? $userObj->cEstado         : NULL,
                        ':cCidade'      =>  isset($userObj->cCidade)       ? $userObj->cCidade         : NULL
                    ];

        try {
            if(!$userObj->cNome){
                $arrCamposObrigatorios[] = "Nome";
            }

            if(!$userObj->dtNascimento){
                $arrCamposObrigatorios[] = "Data de Nascimento";
            }

            if(!$userObj->cSexo){
                $arrCamposObrigatorios[] = "Sexo";
            }

            if(count($arrCamposObrigatorios) > 0 ){
                throw new Exception("Obrigatório o preenchimento dos campos:" . implode(",", $arrCamposObrigatorios), 100);
            }

            $sql = $this->dbConn->prepare($sql);
            $sql->execute($sqlParams);

            return ['error'=> false];
        } catch (Exception $e) {
            if($e->getCode() === 100){
                throw new Exception($e->getMessage());
            }else{
                throw new Exception("Erro ao salvar usuário");
            }
        }
    }

    /**
     * Busca Usuários cadastrados
     *
     * @throws Exception
     */
    public function initialize(): array{
        $returnData = ["erro"=> false];

        $sql = "SELECT  iCodUsuario,    cNome, 
                        dtNascimento,   cSexo, 
                        cCep,           cEndereco, 
                        cNumero,        cComplemento, 
                        cBairro,        cEstado, 
                        cCidade,        dttCadastro, 
                        dttAtualizacao 
                FROM usuario ";

        try {
            $sql = $this->dbConn->prepare($sql);
            $sql->execute();

            while($row = $sql->fetch(PDO::FETCH_ASSOC)){

                $row['dtNascimento'] = Utilities::DataView($row['dtNascimento']);

                $returnData["usuarios"][] = $row;
            }

            return $returnData;
        } catch (Exception $e) {
            throw new Exception("Erro ao buscar usuários");
        }
    }

    /**
     * delete usuario da tabela
     *
     * @param $userObj
     * @return string[]
     * @throws Exception
     */
	public function deleteUser($userObj){
        try {
            if (!isset($userObj->iCodUsuario)) {
                throw new Exception("Favor, selecionar um usuario", 100);
            }

            $sql = "DELETE FROM usuario WHERE iCodUsuario = :iCodUsuario";

            $sqlParams = [  ':iCodUsuario'  =>  $userObj->iCodUsuario];

            $sql = $this->dbConn->prepare($sql);
            $sql->execute($sqlParams);

            return ["error" => false];
        } catch (Exception $e) {
            if($e->getCode() === 100){
                throw new Exception($e->getMessage());
            }else{
                throw new Exception("Erro ao excluir usuário" . $e->getMessage());
            }
        }
    }
}
