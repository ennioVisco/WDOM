<?php

/*
class MyDB extends PDO{

    const HOST = 'localhost';
	const USER = 'root';
	const PORT = '3306';
	const PASSWORD = 'root';
	const DATABASE = 'world';

    public function __construct($options=null){
        parent::__construct(
		'mysql:host='.MyDB::HOST.
		';port='.MyDB::PORT.
		';dbname='.MyDB::DATABASE,
		MyDB::USER,
		MyDB::PASSWORD,
		$options);
    }

    public function query($query){ //secured query with prepare and execute
        $args = func_get_args();
        array_shift($args); //first element is not an argument but the query itself, should removed

        $reponse = parent::prepare($query);
        $reponse->execute($args);
        return $reponse;

    }

    public function rawQuery($query){ //you can use the old query at your risk ;) and should use secure quote() function with it
        return parent::query($query);
    }

}

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
$con=mysqli_connect("localhost","root","root","world");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$rows = array();

if(isset($_GET['type']) && isset($_GET['entry']) && $_GET['type'] == 'c')
{
	
	$sql = "SELECT * FROM creature_template WHERE entry = ".$_GET['entry'].";";
	$sth = mysqli_query($con, $sql);
	
	while($r = mysqli_fetch_assoc($sth))
		$rows[] = $r;
}
else if(isset($_GET['type']) && $_GET['type'] == 'dbinfo')
{
	$sth = mysqli_query($con, "SHOW TABLES IN `world`;");
	while($r = mysqli_fetch_array($sth))
		$rows[] = $r[0];
}
else
{
	$rows = "NULL";
}
$json = json_encode($rows);
print $json;
?>