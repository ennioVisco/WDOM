<?php
const HOST = 'localhost';
const USER = 'root';
const PORT = '3306';
const PASSWORD = 'root';
const DATABASE = 'world';

const DB_ERROR = "PDOException";

require "class.DBManager.php";

/*
$db = new MyDB();
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$ret = $db->query("SELECT * FROM creature_template WHERE entry = 1");
//$ret = $db->insecureQuery("SELECT * FROM table_test WHERE t1=".$db->quote($t1));
print "TEST";
while ($o = $ret->fetchObject())
{

    echo $o->entry;
}*/

header('Content-type:application/json');
$rows = array();
$connection = new DBManager(HOST,USER,PASSWORD,DATABASE,PORT);

if(!is_a($connection, DB_ERROR))
{
	if(isset($_POST['q']))
	{
		$data = $connection->query($_POST['q']);
		if(!is_a($data, DB_ERROR))
			$output = $data;
		else
			$output = "ERROR - QUERY";
	}
	else
		$output = "ERROR - INPUT";
}
else
{
	$output = "ERROR - DB";
}
$json = json_encode($output);
print $json;
?>