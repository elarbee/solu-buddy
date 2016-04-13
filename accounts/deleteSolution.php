<?php
session_start(); 
require ("soluMySQLConnect.php");

if(!isset($_GET['ID']))
{
	echo 'No ID was given.';
	exit;
}

$deleteQuery = "DELETE FROM solutions WHERE ID = ?";
if(!$result = $dbc->prepare($deleteQuery))
{
	die('Query failed: (' . $dbc->errno . ') ' . $dbc->error);
}

if(!$result->bind_param('i', $_GET['ID']))
{
	die('Binding parameters failed: (' . $result->errno . ') ' .$result->error);
}

if(!$result->execute())
{
	die('Execute failed: (' . $result->errno . ') ' . $result->error);
}
if($result->affected_rows > 0)
{
	echo "Solution was successfully deleted.";
}
else
{
	echo "Couldn't delete the solution.";
}
$result->close();
$dbc->close();
?>