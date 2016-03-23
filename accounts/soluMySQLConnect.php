<?php
	// If the hostname environment variable is defined then we are running on production
	// so we should use the production environment variables
	if(isset($_SERVER['RDS_HOSTNAME'])){
		$user = $_SERVER['RDS_USERNAME'];
		$pass = $_SERVER['RDS_PASSWORD'];
		$host = $_SERVER['RDS_HOSTNAME'];
		$db = $_SERVER['RDS_DB_NAME'];
	} else {
		// Use local information for testing.
		$user = 'root';
		$pass = '';
		$host = '127.0.0.1';
		$db = 'solubuddy';
	}
	DEFINE ('DB_USER', $user);
	DEFINE ('DB_PASSWORD', $pass);
	DEFINE ('DB_HOST', $host);
	DEFINE ('DB_NAME', $db);

	$dbc = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
	OR die('Could not connect to MySQL: ' .
		mysqli_connect_errno() . mysqli_connect_error() . PHP_EOL);

 ?>
