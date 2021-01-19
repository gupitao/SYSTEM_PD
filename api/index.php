<?php
header('Content-Type: application/json; charset= utf-8;');

require_once 'src/User.php';

class Rest{
    public static function open($requisicao){
        $postData = file_get_contents("php://input");

        $url = explode("/", $requisicao["url"]);

        $classe = ucfirst($url[0]);
        array_shift($url);

        $metodo = $url[0];
        array_shift($url);

        $parametros = json_decode($postData);

        try{
            if(class_exists($classe)){
                if(method_exists($classe, $metodo)){
                    $retorno = call_user_func_array(array(new $classe, $metodo), [$parametros]);
                    return json_encode($retorno);
                }else{
                    return json_encode(array('error' => 'Metodo Inexistente'));
                }
            }else{
                return json_encode(array('error' => 'Classe Inexistente'));
            }
        }catch(Exception $e){
            return json_encode(array('error' => $e->getMessage()));
        }
    }
}


if(isset($_REQUEST)){
    echo Rest::open($_REQUEST);
}

