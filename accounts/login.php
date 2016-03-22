<?php 
session_start();

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

$username = $_POST['username'];
$_SESSION["username"] = $username;
$password = $_POST['password'];
$_SESSION["password"] = $password;
$encrypt_password=md5($password);


$query = "SELECT Username, Password FROM accounts WHERE username = '$username' AND password = '$encrypt_password'";
$result = mysql_query($query);

if (!$result) {
	echo 'Could not run query: ' . mysql_error();
	exit;
}$row = mysql_fetch_array($result);




if (mysql_num_rows($result) == 1) {
	echo('You have successfully logged in ' . $_SESSION["username"]  ."!<br> Redirecting back to home..." );
    header("Refresh: 2; soluHomeLogged.php");
exit();
	 	
} 
else if (mysql_num_rows($result) < 1) {
     echo("Bad username and password. <br> Redirecting back to home...");
	 header("Refresh: 2; soluHome.php");
}


?>

