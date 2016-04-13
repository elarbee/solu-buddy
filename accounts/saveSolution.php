<?php
session_start();
require("soluMySQLConnect.php");

$username = $_SESSION["username"];

$accountIdQuery = mysqli_query($dbc, "SELECT ID FROM accounts WHERE Username = '$username'");
if(!$accountIdQuery){
	echo 'Could not run query: ' . mysqli_error($dbc);
	exit;
}
$accountIdResult = mysqli_fetch_row($accountIdQuery);

$accountId = $accountIdResult[0];
$solventId = $_POST['solvent'];
$soluteId = $_POST['solute'];
$soluteWeight = $_POST['soluteWeight'];
$solutionVol = $_POST['volume'];
$solutionConc = $_POST['concentration'];


$sql = "INSERT INTO solutions (Account_ID, Solvent_Identity, Solute_Identity, Solute_Weight, Solution_Volume, Solute_Concentration) 
VALUES ('$accountId', '$solventId', '$soluteId', '$soluteWeight', '$solutionVol', '$solutionConc')";


if (!mysqli_query($dbc, $sql)) {
	die('Error: ' . mysqli_error($dbc));
}

echo 'Solution has been saved!';
header('refresh:3; solidSolution.php');
mysqli_close($dbc);

?>
	