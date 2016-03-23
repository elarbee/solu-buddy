<?php 
session_start();

// Connect to database
require_once 'soluMySQLConnect.php';

$username = $_POST['username'];
$_SESSION["username"] = $username;
$password = $_POST['password'];
$_SESSION["password"] = $password;
$encrypt_password=md5($password);

// Redirect back to the specified page or go to the homepage if not specified.
$return_page = $_GET['next'] ?: '/index.php';

$query = "SELECT Username, Password FROM accounts WHERE username = '$username' AND password = '$encrypt_password'";
$result = mysqli_query($dbc, $query);
if (!$result) {
	echo 'Could not run query: ' . mysql_error();
	exit;
}$row = mysql_fetch_array($result);


if (mysqli_num_rows($result) == 1) {
    header("Refresh: 0; $return_page");
	exit();
} 
else if (mysqli_num_rows($result) < 1) {
     echo("Bad username and password. <br> Redirecting back to page...");
	 header("Refresh: 2; $return_page");
}

mysqli_close($dbc);
?>

