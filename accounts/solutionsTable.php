<?php
session_start();
$_SESSION['solutions'] = 'true';
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
	<link href = "../static/css/table.css" type="text/css" rel = "stylesheet">
	<link href = "../static/css/navBar.css" type="text/css" rel = "stylesheet">
	<link href = "../static/css/header-styles.css" type="text/css" rel = "stylesheet">
	<script src="http://code.jquery.com/jquery-2.1.1.min.js"></script>
	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <style>
        .page {
            margin: 16px;
        }
        .tab-pane {
            margin-top: 16px;
        }
    </style>
	<script>
        $('#savedSolutionsTabs a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
	</script>
</head>
<body id="bodySolutions">
<div class="page">
    <ul class="nav nav-tabs" role="tablist" id="savedSolutionsTabs">
        <li role="presentation" class="active"><a href="#singleSolutions" aria-controls="singleSolutions" role="tab" data-toggle="tab">Single Solutions</a></li>
        <li role="presentation"><a href="#serialSolutions" aria-controls="serialSolutions" role="tab" data-toggle="tab">Serial Dilution Solutions</a></li>
        <li role="presentation"><a href="#calibrations" aria-controls="calibrations" role="tab" data-toggle="tab">Calibration Standards</a></li>
    </ul>

    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="singleSolutions">
            <div class="panel panel-default">
                <div class="panel-heading">Single Solution From Solid</div>
                <table id="singleSolidSolutionsTable" align="center" class="table table-hover">
                    <thead>
                    <tr>
                        <th>Solvent Formula</th>
                        <th>Solute Formula</th>
                        <th>Solute Molecular Weight</th>
                        <th>Solution Total Volume</th>
                        <th>Solution Concentration</th>
                        <th>Mass of Solute to Add</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <?php
                    $get = mysqli_query($dbc, "SELECT * FROM single_solution_solid WHERE Account_ID = '$accountId'");
                    //Creates a loop to interate through results
                    while($row = mysqli_fetch_array($get)){
                    ?>
                    <tbody>
                    <tr>
                        <td><?= $row['Solvent_Identity']; ?></td>
                        <td><?= $row['Solute_Identity']; ?></td>
                        <td><?= $row['Solute_Weight']; ?> g/mol</td>
                        <td><?= $row['Solution_Total_Volume']; ?> mL</td>
                        <td><?= $row['Solution_Concentration']; ?> mol/L</td>
                        <td><?= $row['Mass_Solute_Add']; ?> g</td>
                        <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                    </tr>
                    <tbody>
                    <?php
                    }
                    if (mysqli_num_rows($get)==0){
                    ?>
                        <tbody>
                        <tr>
                            <td colspan="7">
                                No solutions saved.
                            </td>
                        </tr>
                        </tbody>
                    <?php
                    }
                    ?>
                </table>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Single Solution From Liquid (Gravimetrically)</div>
                <table id="singleLiquidGravSolutionsTable" align="center" class="table table-hover">
                    <thead>
                    <tr>
                        <th>Solvent Formula</th>
                        <th>Solute Formula</th>
                        <th>Solute Molecular Weight</th>
                        <th>Solution Total Volume</th>
                        <th>Solution Concentration</th>
                        <th>Mass of Solute to Add</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <?php
                    $get = mysqli_query($dbc, "SELECT * FROM single_solution_liquid_grav WHERE Account_ID = '$accountId'");
                    //Creates a loop to interate through results
                    while($row = mysqli_fetch_array($get)){
                    ?>
                    <tbody>
                    <tr>
                        <td><?= $row['Solvent_Identity']; ?></td>
                        <td><?= $row['Solute_Identity']; ?></td>
                        <td><?= $row['Solute_Weight']; ?> g/mol</td>
                        <td><?= $row['Solution_Total_Volume']; ?> mL</td>
                        <td><?= $row['Solution_Concentration']; ?> mol/L</td>
                        <td><?= $row['Mass_Solute_Add']; ?> g</td>
                        <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                    </tr>
                    <tbody>
                    <?php
                    }
                    if (mysqli_num_rows($get)==0){
                    ?>
                        <tbody>
                        <tr>
                            <td colspan="7">
                                No solutions saved.
                            </td>
                        </tr>
                        </tbody>
                    <?php
                    }
                    ?>
                </table>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Single Solution From Liquid (Volumetrically)</div>
                <table id="singleLiquidVolSolutionsTable" align="center" class="table table-hover">
                <thead>
                <tr>
                    <th>Solvent Formula</th>
                    <th>Solute Formula</th>
                    <th>Solute Molecular Weight</th>
                    <th>Solute Density</th>
                    <th>Solution Total Volume</th>
                    <th>Solution Concentration</th>
                    <th>Mass of Solute to Add</th>
                    <th>DELETE</th>
                </tr>
                </thead>
                <?php
                $get = mysqli_query($dbc, "SELECT * FROM single_solution_liquid_vol WHERE Account_ID = '$accountId'");
                //Creates a loop to interate through results
                while($row = mysqli_fetch_array($get)){
                ?>
                <tbody>
                <tr>
                    <td><?= $row['Solvent_Identity']; ?></td>
                    <td><?= $row['Solute_Identity']; ?></td>
                    <td><?= $row['Solute_Weight']; ?> g/mol</td>
                    <td><?= $row['Solute_Density']; ?> g/mL</td>
                    <td><?= $row['Solution_Total_Volume']; ?> mL</td>
                    <td><?= $row['Solution_Concentration']; ?> mol/L</td>
                    <td><?= $row['Volume_Solute_Add']; ?> mL</td>
                    <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                </tr>
                <tbody>
                <?php
                }
                if (mysqli_num_rows($get)==0){
                ?>
                    <tbody>
                    <tr>
                        <td colspan="8">
                            No solutions saved.
                        </td>
                    </tr>
                    </tbody>
                <?php
                }
                ?>
            </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="serialSolutions">
            <div class="panel panel-default">
                <div class="panel-heading">Serial Dilutions</div>
                <table id="serialSolutionsTable" align="center" class="table table-hover">
                    <thead>
                    <tr>
                        <th>Solvent Formula</th>
                        <th>Solute Formula</th>
                        <th>Solute Molecular Weight</th>
                        <th>Dilution Flask Volume</th>
                        <th>Number of Flasks</th>
                        <th>Volume to Transfer</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <?php
                    $get = mysqli_query($dbc, "SELECT * FROM serial_dilution WHERE Account_ID = '$accountId'");
                    //Creates a loop to interate through results
                    while($row = mysqli_fetch_array($get)) {
                        ?>
                        <tbody>
                        <tr>
                            <td><?= $row['Solvent_Identity']; ?></td>
                            <td><?= $row['Solute_Identity']; ?></td>
                            <td><?= $row['Solute_Weight']; ?> g/mol</td>
                            <td><?= $row['Dilution_Flask_Volume']; ?> mL</td>
                            <td><?= $row['Number_Flasks']; ?></td>
                            <td><?= $row['Volume_Transfer']; ?> mL</td>
                            <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                        </tr>
                        </tbody>
                        <?php
                        }
                        if (mysqli_num_rows($get)==0){
                            ?>
                            <tbody>
                            <tr>
                                <td colspan="7">
                                    No solutions saved.
                                </td>
                            </tr>
                            </tbody>
                            <?php
                        }
                        ?>
                </table>
            </div>
        </div>
        <div role="tabpanel" class="tab-pane" id="calibrations">
            <div class="panel panel-default">
                <div class="panel-heading">External Calibrations</div>
                <table id="calibrationExternalTable" align="center" class="table table-hover">
                    <thead>
                    <tr>
                        <th>Solvent Formula</th>
                        <th>Analyte Formula</th>
                        <th>Analyte Molecular Weight</th>
                        <th>Unknown Name</th>
                        <th>Number of Standards</th>
                        <th>Flask Volumes</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <?php
                    $get = mysqli_query($dbc, "SELECT * FROM calibration_external WHERE Account_ID = '$accountId'");
                    //Creates a loop to interate through results
                    while($row = mysqli_fetch_array($get)){
                    ?>
                    <tbody>
                    <tr>
                        <td><?= $row['Solvent_Identity']; ?></td>
                        <td><?= $row['Analyte_Identity']; ?></td>
                        <td><?= $row['Analyte_Weight']; ?> g/mol</td>
                        <td><?= $row['Unknown_Name']; ?></td>
                        <td><?= $row['Number_Standards']; ?></td>
                        <td><?= $row['Flask_Volumes']; ?> mL</td>
                        <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                    </tr>
                    <tbody>
                    <?php
                    }
                    if (mysqli_num_rows($get)==0){
                    ?>
                    <tbody>
                    <tr>
                        <td colspan="7">
                            No solutions saved.
                        </td>
                    </tr>
                    </tbody>
                <?php
                }
                ?>
                </table>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Standard Addition Calibrations</div>
                <table id="calibrationAdditionTable" align="center" class="table table-hover">
                    <thead>
                    <tr>
                        <th>Solvent Formula</th>
                        <th>Analyte Formula</th>
                        <th>Analyte Molecular Weight</th>
                        <th>Unknown Name</th>
                        <th>Number of Standards</th>
                        <th>Flask Volumes</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <?php
                    $get = mysqli_query($dbc, "SELECT * FROM calibration_addition WHERE Account_ID = '$accountId'");
                    //Creates a loop to interate through results
                    while($row = mysqli_fetch_array($get)){
                    ?>
                    <tbody>
                    <tr>
                        <td><?= $row['Solvent_Identity']; ?></td>
                        <td><?= $row['Analyte_Identity']; ?></td>
                        <td><?= $row['Analyte_Weight']; ?> g/mol</td>
                        <td><?= $row['Unknown_Name']; ?></td>
                        <td><?= $row['Number_Standards']; ?></td>
                        <td><?= $row['Flask_Volumes']; ?> mL</td>
                        <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                    </tr>
                    <tbody>
                    <?php
                    }
                    if (mysqli_num_rows($get)==0){
                    ?>
                    <tbody>
                    <tr>
                        <td colspan="7">
                            No solutions saved.
                        </td>
                    </tr>
                    </tbody>
                <?php
                }
                ?>
                </table>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">Internal Calibrations</div>
                <table id="calibrationInternalTable" align="center" class="table table-hover">
                    <thead>
                    <tr>
                        <th>Analyte Solution ID</th>
                        <th>Analyte Solution Type</th>
                        <th>Internal Standard Solution ID</th>
                        <th>Internal Standard Solution Type</th>
                        <th>Unknown Name</th>
                        <th>Number of Standards</th>
                        <th>Flask Volumes</th>
                        <th>DELETE</th>
                    </tr>
                    </thead>
                    <?php
                    $get = mysqli_query($dbc, "SELECT * FROM calibration_internal WHERE Account_ID = '$accountId'");
                    //Creates a loop to interate through results
                    while($row = mysqli_fetch_array($get)){
                    ?>
                    <tbody>
                    <tr>
                        <td><?= $row['Analyte_Solution_ID']; ?></td>
                        <td><?= $row['Analyte_Solution_Type']; ?></td>
                        <td><?= $row['Internal_Standard_Solution_ID']; ?></td>
                        <td><?= $row['Internal_Standard_Solution_Type']; ?></td>
                        <td><?= $row['Unknown_Name']; ?></td>
                        <td><?= $row['Number_Standards']; ?></td>
                        <td><?= $row['Flask_Volumes']; ?>mL</td>
                        <td><a href="deleteSolution.php?ID=<?= $row['ID']; ?>">Delete</a></td>
                    </tr>
                    <tbody>
                    <?php
                    }
                    if (mysqli_num_rows($get)==0){
                    ?>
                    <tbody>
                    <tr>
                        <td colspan="8">
                            No solutions saved.
                        </td>
                    </tr>
                    </tbody>
                <?php
                }
                ?>
                </table>
            </div>
        </div>
    </div>
</div>

</body>
</html>

