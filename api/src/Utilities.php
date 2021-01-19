<?php


class Utilities{

    public static function DataDb($data){
        $data = explode('/',$data);

        return $data[2] . '-' . $data[1] . '-' . $data[0];
    }

    public static function DataView($data){
        $data = explode('-',$data);

        return $data[2] . '/' . $data[1] . '/' . $data[0];
    }

}
