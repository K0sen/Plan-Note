<?php 
	require_once "DbConnection.php";
	$db = DbConnection::getInstance()->getPdo();

	if ( $_GET['action'] == 'show' ) {
	
	    $sth = $db->query("SELECT * FROM {$_POST['table']} ORDER BY `order_id` ASC");
	    $sth->execute();
	    $info = $sth->fetchAll(PDO::FETCH_ASSOC);

	    echo (json_encode($info));

	} elseif ( $_GET['action'] == 'insert' ) {

	    $sth = $db->prepare("INSERT INTO {$_POST['table']} (`id`, `type_id`, `title`, `text`, `order_id`) 
	    					 VALUES (NULL, :type_id, 'TITLE', 'TEXT', :order_id)");
     	$params = array(
            'type_id' => $_POST['type_id'],
            'order_id' => $_POST['order_id'],
        );
        $sth->execute($params);
        
        $sth = $db->query("SELECT * FROM {$_POST['table']} ORDER BY {$_POST['table']}.id DESC LIMIT 1");
	    $sth->execute();
	    $info = $sth->fetchAll(PDO::FETCH_ASSOC);

	    echo (json_encode($info));

	} elseif ( $_GET['action'] == 'remove' ) {
	
	    $sth = $db->prepare("INSERT INTO `list_remove` (`id`, `type`, `title`, `text`) 
	    					 VALUES (NULL, :type, :title, :text)");
     	$params = array(
            'type' => $_POST['type'],
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

	} elseif ( $_GET['action'] == 'swap' ) {
		$params = array(
            'obj_id' => $_POST['obj_id'],
            'sub_order_id' => $_POST['sub_order_id']
    	);

		if($_POST['cl'] == 'arrow start') {
            $sth = $db->prepare("UPDATE {$_POST['table']}  SET order_id = :sub_order_id - 1 WHERE id = :obj_id;");

        } else if ($_POST['cl'] == 'arrow end') {
            $sth = $db->prepare("UPDATE {$_POST['table']}  SET order_id = :sub_order_id + 1 WHERE id = :obj_id;");     

        } else if ( ($_POST['cl'] == 'arrow up') || ($_POST['cl'] == 'arrow down') ) {
            $sth = $db->prepare("UPDATE {$_POST['table']}  SET order_id = :sub_order_id WHERE id = :obj_id;
								 UPDATE {$_POST['table']}  SET order_id = :obj_order_id WHERE id = :sub_id;");
            $params['obj_order_id'] = $_POST['obj_order_id'];
            $params['sub_id'] = $_POST['sub_id'];
        }

        $sth->execute($params);

	}


?>