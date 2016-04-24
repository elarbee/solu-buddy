<?php
session_start();

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

$statement = mysqli_prepare($dbc, "INSERT INTO accounts (First_Name, Last_Name, Username, Password) VALUES (?,?,?,?)");
mysqli_stmt_bind_param($statement, 'ssss', $firstName, $lastName, $userName, $encrypted_password);

mysqli_stmt_execute($statement);

if (mysqli_stmt_errno($statement)) {
	die('Error: ' .  mysqli_connect_errno() . mysqli_connect_error() . PHP_EOL);
}else{
	echo 'Account has been created!<br>Redirecting back to home...';
	$_SESSION['loggedIn'] = true;
	$_SESSION['username'] = $userName;
	header("refresh: 0; $return_page");
}

mysqli_stmt_close($statement);
mysqli_close($dbc);

?>