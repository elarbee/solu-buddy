<?php
session_start();
require("soluMySQLConnect.php");
$username = $_SESSION['username'];
$oldPassword = $_POST['oldPassword'];
$encryptedOldPassword=md5($oldPassword);
$newPassword = $_POST['newPassword'];
$encryptedNewPassword=md5($newPassword);


$changePassQuery = mysqli_query($dbc, "UPDATE accounts SET Password = '$encryptedNewPassword' WHERE Username = '$username' AND Password = '$encryptedOldPassword'");
if(!$changePassQuery){
    echo 'Could not run query: ' . mysqli_error();
    exit;
}
