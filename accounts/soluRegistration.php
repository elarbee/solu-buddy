<?php 
// Establish connection to database
require_once 'soluMySQLConnect.php';

$firstName = $_POST['firstname'];
$lastName = $_POST['lastname'];
$userName = $_POST['username'];
$filteredUserName = preg_replace("/[^a-zA-Z0-9]+/", "", $userName);

$password = $_POST['password'];
$filteredPassword = preg_replace("/[^a-zA-Z0-9]+/", "", $password);
$encrypted_password=md5($password);

// Redirect back to the specified page or go to the homepage if not specified.
$return_page = $_GET['next'] ?: '/index.php';

$sql = "INSERT INTO accounts (First_Name, Last_Name, Username, Password) 
VALUES ('$firstName', '$lastName', '$filteredUserName', '$encrypted_password')";

if (!mysqli_query($dbc, $sql)) {
	die('Error: ' .  mysqli_connect_errno() . mysqli_connect_error() . PHP_EOL);
}

echo 'Account has been created!<br>Redirecting back to home...';
header("refresh: 0; $return_page");

mysqli_close($dbc);

?>