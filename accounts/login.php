<?php 
session_start();
$_SESSION['loggedIn'] = 'true';
// Connect to database
require_once 'soluMySQLConnect.php';

$username = $_POST['username'];
$_SESSION["username"] = $username;
$password = $_POST['password'];
$_SESSION["password"] = $password;
$encrypt_password=md5($password);

// Redirect back to the specified page or go to the homepage if not specified.


$query = "SELECT Username, Password FROM accounts WHERE username = '$username' AND password = '$encrypt_password'";
$result = mysqli_query($dbc, $query);
if (!$result) {
	echo 'Could not run query: ' . mysqli_error();
	exit;
}$row = mysqli_fetch_array($result);


if (mysqli_num_rows($result) == 1) {
    header("Refresh: 0; ../index.php");
	exit();
} 
else if (mysqli_num_rows($result) < 1) {
	 session_destroy();
     echo("Bad username and password. <br> Redirecting back to page...");
	 header("Refresh: 3; ../index.php");
}

mysqli_close($dbc);
?>

