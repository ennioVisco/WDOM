<?php

class DBManager{

    public function __construct($host, $user, $password, $database, $port = '3306', $options = null)
	{
		try
		{
			$this->connection = new PDO('mysql:host='.$host.';port='.$port.';dbname='.$database, $user, $password, $options);
			$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch(PDOException $e)
		{		
			$error = $this->errorHandler($e);
			echo "DBERROR";
			return $error;
		}
    }

	//Prepared Statement
    public function query($query)
	{
		try
		{
			$data = $this->connection->query($query);
			foreach ($data as $row)
				$parsed[] = $row[0];
			return $parsed;
		}
		catch(PDOException $e) 
		{
			return $e;
		}
		
	/*	try 
		{
			$conn = new PDO('mysql:host=localhost;dbname=myDatabase', $username, $password);
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);    
			 
			$stmt = $conn->prepare('SELECT * FROM myTable WHERE id = :id');
			$stmt->execute(array('id' => $id));
		 
			while($row = $stmt->fetch()) {
				print_r($row);
			}
		}
		catch(PDOException $e) 
		{
			echo 'ERROR: ' . $e->getMessage();
		}*/

    }
	
	public function preparedQuery($query)
	{
		try
		{
			$stmt = $this->connection->prepare('SELECT * FROM myTable WHERE id = :id');
			$stmt->execute(array('id' => $id));
			while($row = $stmt->fetch()) 
				$data[] = $row;
				
			return $data;
		}
		catch(PDOException $e) 
		{
			return $e;
		}
    }
	
	public function errorHandler(PDOException $e)
	{
		return $e;
	}

}

?>