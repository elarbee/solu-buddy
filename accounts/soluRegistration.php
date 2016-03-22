<?php 

define('DB_NAME', 'solubuddy');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', '127.0.0.1');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link) {
	die('Could not connect to database: ' . mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if (!$db_selected) {
	die('Can\'t use ' . DB_NAME . ': ' . mysql_error());
}

$firstName = $_POST['firstname'];
$lastName = $_POST['lastname'];
$userName = $_POST['username'];
$password = $_POST['password'];
$encrypted_password=md5($password);


$sql = "INSERT INTO accounts (First_Name, Last_Name, Username, Password) 
VALUES ('$firstName', '$lastName', '$userName', '$encrypted_password')";


if (!mysql_query($sql)) {
	die('Error: ' . mysql_error());
}

echo 'Account has been created!<br>Redirecting back to home...';
header('refresh:3; soluHome.php');

mysql_close();

?>