<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LIST</title>
    <link rel="stylesheet" href="style.css">
    
</head>

<?php 

        require_once "DbConnection.php";
        require_once "Cookie.php";

        $db = DbConnection::getInstance()->getPdo();

        $sth = $db->query("SELECT * FROM `type`");
        $sth->execute();
        $info = $sth->fetchAll(PDO::FETCH_ASSOC);

        Cookie::set('types', 3, $time = 31536000);

        $c = Cookie::get('types');
?>

<body>
    <div id="top">
        <div id="info">info</div>
        <div id="authentication"">
            <span id="register">Register</span>
            <span id="log_in">Login</span>
        </div>
    </div>
    <hr>
    <div id="wrapper">    

        <?php foreach ($info as $value) : ?>

        <div id="<?= $value['id'] ?>" class="main">
            <h1><?= $value['type'] ?></h1> 
        </div>

        <?php endforeach; ?>
        
    </div>

    <div id="wait"><img src="animatedEllipse.gif" alt=""></div>
   
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="scripts.js"></script>
</body>

</html>

