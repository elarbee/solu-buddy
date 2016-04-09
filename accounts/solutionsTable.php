<?php
session_start();
require ("soluMySQLConnect.php");
require ("../dynamicHelpers.php");
renderHead( ["title" => "Solutions Page", "navField1" => "Account Settings", "navField2" => "Saved Solutions",
"navField3" => "Chemistry Terms", "navField4" => "Create Solution(s)"] ); 

$username = $_SESSION["username"];

$accountIdQuery = mysqli_query($dbc, "SELECT ID FROM accounts WHERE Username = '$username'");
if(!$accountIdQuery){
	echo 'Could not run query: ' . mysqli_error();
	exit;
}
$accountIdResult = mysqli_fetch_row($accountIdQuery);
$accountId = $accountIdResult[0];

echo "<CENTER><h1>Solutions Made By $username</h1></CENTER>"
?>

<!DOCTYPE html>
<html>
<head>
<link href = "/static/css/table.css" type="text/css" rel = "stylesheet">
<link href = "/static/css/navBar.css" type="text/css" rel = "stylesheet">
<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
<script>

window.onload = function () {
	var table = document.getElementById('tableSolutions');
	table.addEventListener('click', function (e) {
		var parent,
			target = e.target,
			col = target.cellIndex,
			row;
		while (target = target.parentElement) {
			if (target.tagName.toLowerCase() === 'tr') {
				row = target.rowIndex;
				break;
			}				
		}
		console.log(table.rows[row].cells[0].innerHTML);
	});
}

function postID() {
	var id = $('')
}

//following code can be used to highlight hover and click actions on table rows.

/* $("tr").hover(function() {
   $(this).addClass("hover"); 
 }, function() {
    $(this).removeClass("hover");
    });
	
    $(document).ready(function() {
      $('tr')
        .filter(':has(:checkbox:checked)')
        .end()
      .click(function(event) {
        if (event.target.type !== 'checkbox') {
          $(':checkbox', this).trigger('click');
        }
      })
        .find(':checkbox')
        .click(function(event) {
          $(this).parents('tr:first').toggleClass('click');
        });    
    });*/
</script>
<header>
</header>
</head>
<body id="bodySolutions">
	<table id="tableSolutions" align="center" class="table table-condensed">
		<thead>
			<tr>
				<th>ID</th>
				<th>Solvent</th>
				<th>Solute</th>
				<th>Volume</th>
				<th>Concentration</th>
				<th>Dillution Set</th>
				<th>Calibration Set</th>
				<th>DELETE</th>
			</tr>
		</thead>
<?php
	$get = mysqli_query($dbc, "SELECT * FROM solutions WHERE Account_ID = '$accountId'");
	//Creates a loop to interate through results
	while($row = mysqli_fetch_array($get)){
		$solutionID = $row['ID'];
	//printing the results of any solutions
		echo "<tbody>
				<tr>
					<td>" . $row['ID'] . "</td>
					<td>" . $row['Solvent_Identity'] . "</td>
					<td>" . $row['Solute_Identity'] . "</td>
					<td>" . $row['Solution_Volume'] . "</td>
					<td>" . $row['Solute_Concentration'] . "</td>
					<td>" . $row['Dillution_Set'] . "</td>
					<td>" . $row['Calibration_Set'] . "</td>
					<form action='deleteSolution.php' method=\"POST\">
					<input type=\"hidden\" value=\"" . $row['ID'] . "\" name=\"solutionID\" id=\"solutionID\">
					<td><input type=\"submit\" value=\"Delete\" name=\"submit\"></form></td>
				</tr>
			<tbody>";  
	}
?>
</table>
</body>
</html>

