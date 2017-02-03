<?php
/**
 * Singleton Pattern
 */
class DbConnection
{
    private static $instance = null;
    /**
     * @var PDO
     */
    private $pdo;
    private function __construct()
    {
        $this->pdo = new PDO('mysql: host=localhost; dbname=Kostya_task', 'root');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec('SET NAMES utf8');
    }
    private function __clone() {}
    private function __wakeup() {}
    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new DbConnection();
        }
        return self::$instance;
    }
    /**
     * @return PDO
     */
    public function getPdo()
    {
        return $this->pdo;
    }
}