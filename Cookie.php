<?php

abstract class Cookie
{
    public static function set($key, $value, $time = 31536000)
    {
        setcookie($key, $value, time() + $time, '/') ;
    }

    public static function get($key)
    {
        if ( isset($_COOKIE[$key]) ) {
            return $_COOKIE[$key];
        }
        return null;
    }

    public static function remove($key)
    {
        self::set($key, '', -3600);

        if (isset($_COOKIE[$key]) ){
            unset($_COOKIE[$key]);
        }
    }
}

?>