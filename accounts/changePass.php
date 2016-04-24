<?php
session_start();
require("soluMySQLConnect.php");
$username = $_SESSION['username'];
$oldPassword = $_POST['oldPassword'];
$encryptedOldPassword=md5($oldPassword);
$newPassword = $_POST['newPassword'];
$encryptedNewPassword=md5($newPassword);

// Redirect back to the specified page or go to the homepage if not specified.
$return_page = $_GET['next'] ?: '/index.php';

$statement = mysqli_prepare($dbc, "UPDATE accounts SET Password = ? WHERE Username = ? AND Password = ?");
mysqli_stmt_bind_param($statement, 'sss', $encryptedNewPassword, $username, $encryptedOldPassword);

$statementWorked = mysqli_stmt_execute($statement);
$numAffectedRows = mysqli_stmt_affected_rows($statement);

if(!$statementWorked){
    echo 'Could not run query: ' . mysqli_stmt_error($statement);
} else {
    // If only one row was affected then it was successful
    if($numAffectedRows == 1){
        header("Refresh: 0; $return_page");
    } else{
        echo 'Unable to change password. Redirecting in 2 seconds...';
        header("Refresh: 2; $return_page");
    }
}
mysqli_stmt_close($statement);
mysqli_close($dbc);

exit;

