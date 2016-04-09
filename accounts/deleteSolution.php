<?php
session_start(); 
require ("soluMySQLConnect.php");
if($_POST['solutionID'])
{
$id = mysqli_real_escape_string($dbc, $_POST['solutionID']);
$delete = "DELETE FROM `solutions` WHERE id = '$id' ";
$result = mysqli_query($dbc, $delete);
}
header("Refresh: 0; solutionsTable.php");
?>