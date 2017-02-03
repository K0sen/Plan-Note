<?php 
	require_once "DbConnection.php";
	$db = DbConnection::getInstance()->getPdo();

	if ( $_GET['action'] == 'show' ) {
	
	    $sth = $db->query("SELECT * FROM {$_POST['table']} ORDER BY {$_POST['table']}.id ASC");
	    $sth->execute();
	    $info = $sth->fetchAll(PDO::FETCH_ASSOC);

	    echo (json_encode($info));

	} elseif ( $_GET['action'] == 'insert' ) {

	    $sth = $db->prepare("INSERT INTO {$_POST['table']} (`id`, `type_id`, `title`, `text`) 
	    					 VALUES (NULL, :style_id, 'TITLE', 'TEXT')");
     	$params = array(
            'style_id' => $_POST['style_id'],
        );
        $sth->execute($params);
        
        $sth = $db->query("SELECT * FROM {$_POST['table']} ORDER BY {$_POST['table']}.id DESC LIMIT 1");
	    $sth->execute();
	    $info = $sth->fetchAll(PDO::FETCH_ASSOC);

	    echo (json_encode($info));

	} elseif ( $_GET['action'] == 'remove' ) {
	
		echo($_POST['id']);
	    $sth = $db->prepare("INSERT INTO `list_remove` (`id`, `type_id`, `title`, `text`) 
	    					 VALUES (NULL, :type_id, :title, :text)");
     	$params = array(
            'type_id' => $_POST['type_id'],
            'title' => $_POST['title'],
            'text' => $_POST['text'],
        );
        $sth->execute($params);

	    $sth = $db->prepare("DELETE FROM {$_POST['table']} WHERE `id` = :id");
     	$params = array(
            'id' => $_POST['id']
        );
        $sth->execute($params);

	} elseif ( $_GET['action'] == 'edit' ) {

		$sth = $db->prepare("UPDATE {$_POST['table']} SET {$_POST['type']} = :text WHERE id = :id");
     	$params = array(
            'text' => $_POST['text'],
            'id' => $_POST['id'],
        );
        $sth->execute($params);

	} elseif ( $_GET['action'] == 'replace' ) {
		
		$sth = $db->prepare("UPDATE {$_POST['table']}  SET id = '998' WHERE id = :a;
							 UPDATE {$_POST['table']}  SET id = '999' WHERE id = :b;
							 UPDATE {$_POST['table']}  SET id = :b WHERE id = 998;
							 UPDATE {$_POST['table']}  SET id = :a WHERE id = 999;");
     	$params = array(
            'a' => $_POST['first'],
            'b' => $_POST['second']
        );
        $sth->execute($params);

	}


?>