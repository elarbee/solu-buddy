<?php 
session_start();
mysqli_report(MYSQLI_REPORT_ERROR);
// Connect to database
require_once 'soluMySQLConnect.php';

$username = $_POST['username'];
$password = $_POST['password'];
$encrypt_password=md5($password);

// Redirect back to the specified page or go to the homepage if not specified.
$return_page = $_GET['next'] ?: '/index.php';

$statement = mysqli_prepare($dbc, "SELECT Username FROM accounts WHERE Username=? AND Password=?");
mysqli_stmt_bind_param($statement, 'ss', $username, $encrypt_password);

$statementWorked = mysqli_stmt_execute($statement);

if (!$statementWorked) {
	echo 'Could not run query: ' . mysqli_stmt_error($statement);
	mysqli_stmt_close($statement);
	mysqli_close($dbc);
	exit;
}

mysqli_stmt_bind_result($statement, $dbUser);
mysqli_stmt_fetch($statement);
// If we have a user returned then they entered the correct information
if ($dbUser) {
	$_SESSION["username"] = $username;
	$_SESSION['loggedIn'] = true;
    header("Refresh: 0; $return_page");
	mysqli_stmt_close($statement);
	mysqli_close($dbc);
}
else {
	echo("Bad username and password. <br> Redirecting back to page...");
	mysqli_stmt_close($statement);
	mysqli_close($dbc);
	header("Refresh: 2; $return_page");
}
?>

