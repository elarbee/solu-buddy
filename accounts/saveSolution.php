<?php
session_start();
require("soluMySQLConnect.php");
mysqli_report(MYSQLI_REPORT_ERROR);

if (!isset($_SESSION['username'])) {
	echo "Please login to save.";
    exit;
}

$username = $_SESSION["username"];

// Get the type of solution that is being saved so that we know which table should be used.
$submission_type = $_POST['solution_type'];
$accountStatement = mysqli_prepare($dbc, "SELECT ID FROM accounts WHERE Username = ?");
if ($accountStatement) {
    mysqli_stmt_bind_param($accountStatement, 's', $username);
    mysqli_stmt_execute($accountStatement);

    // Get the account id
    mysqli_stmt_bind_result($accountStatement, $accountId);
    mysqli_stmt_fetch($accountStatement);
    mysqli_stmt_close($accountStatement);

    $statement = null;
    if ($submission_type == 'single_solid' or $submission_type == 'single_liquid_grav' or $submission_type == 'single_liquid_vol') {
        $solventId = $_POST['solvent_formula'];
        $soluteId = $_POST['solute_formula'];
        $soluteWeight = $_POST['solute_molec_weight'];
        $solutionVol = $_POST['total_volume'];
        $solutionConc = $_POST['solution_concentration'];

        if ($submission_type == 'single_liquid_vol') {
            $soluteDensity = $_POST['density'];
            $volumeAdd = $_POST['solute_volume'];
            $statement = mysqli_prepare($dbc, "INSERT INTO single_solution_liquid_vol VALUES (DEFAULT, ?,?,?,?,?,?,?,?)");
            mysqli_stmt_bind_param($statement, 'issddddd', $accountId, $solventId, $soluteId, $soluteWeight, $soluteDensity, $solutionVol, $solutionConc, $volumeAdd);
        } else {
            $massToAdd = $_POST['massToAdd'];
            if ($submission_type == 'single_solid') {
                $table_name = 'single_solution_solid';
            } else {
                $table_name = 'single_solution_liquid_grav';
            }
            $statement = mysqli_prepare($dbc, "INSERT INTO {$table_name} VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");
            mysqli_stmt_bind_param($statement, 'issdddd', $accountId, $solventId, $soluteId, $soluteWeight, $solutionVol, $solutionConc, $massToAdd);
        }
    } elseif ($submission_type == 'serial') {
        $solventId = $_POST['solventChemID'];
        $soluteId = $_POST['soluteChemID'];
        $solutionMolarity = $_POST['molaritySolution'];
        $dilutionFlaskVolume = $_POST['flasksVolume'];
        $numberFlasks = $_POST['numDilutions'];
        $volumeTransferred = $_POST['volumeTransferred'];

        $statement = mysqli_prepare($dbc, "INSERT INTO serial_dilution VALUES (DEFAULT, ?,?,?,?,?,?,?)");
        mysqli_stmt_bind_param($statement, 'issddid', $accountId, $solventId, $soluteId, $solutionMolarity, $dilutionFlaskVolume, $numberFlasks, $volumeTransferred);
    } elseif ($submission_type == 'calibration_internal') {
        $analyteName = $_POST['analyte_formula'];
        $analyteMolarity = $_POST['analyte_molarity'];
        $numStandards = $_POST['num_standards'];
        $internalFormula = $_POST['internal_formula'];
        $internalMolarity = $_POST['internal_molarity'];
        $totalVolumeStandards = $_POST['total_volume_standards'];

        $statement = mysqli_prepare($dbc, "INSERT INTO calibration_internal (Account_ID, Analyte_Identity, Analyte_Molarity, Internal_Standard_Solution_Identity, Internal_Molarity, Number_Standards, Flask_Volumes) VALUES (?, ?, ?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($statement, 'isdsdid', $accountId, $analyteName, $analyteMolarity, $internalFormula, $internalMolarity, $numStandards, $totalVolumeStandards);

    } elseif ($submission_type == 'calibration_external') {
        $solventId = $_POST['solvent_formula'];
        $analyteId = $_POST['analyte_formula'];
        $analyteWeight = $_POST['analyte_molec_weight'];
        $analyteMolarity = $_POST['analyte_molarity'];
        $numberOfStandards = $_POST['num_standards'];
        $flaskVolumes = $_POST['total_volume_standards'];

        $statement = mysqli_prepare($dbc, "INSERT INTO calibration_external VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($statement, 'issddid', $accountId, $solventId, $analyteId, $analyteWeight, $numberOfStandards, $flaskVolumes, $analyteMolarity);
    } elseif($submission_type == 'calibration_addition'){
        $analyteId = $_POST['analyte_formula'];
        $analyteMolarity = $_POST['analyte_molarity'];
        $numberOfStandards = $_POST['num_standards'];
        $unkownName = $_POST['unknown'];
        $unknownVolume = $_POST['unknown_volume'];
        $flaskVolumes = $_POST['total_volume_standards'];

        $statement = mysqli_prepare($dbc, "INSERT INTO calibration_addition (Account_ID, Analyte_Identity, Analyte_Molarity, Unknown_Name, Unknown_Volume, Number_Standards, Flask_Volumes) VALUES (?, ?, ?, ?, ?, ?, ?)");
        mysqli_stmt_bind_param($statement, 'isdsdid', $accountId, $analyteId, $analyteMolarity, $unkownName, $unknownVolume, $numberOfStandards, $flaskVolumes);
    } else {
        echo 'Error saving solution.';
        exit;
    }

    mysqli_stmt_execute($statement);

    if (mysqli_stmt_errno($statement)) {
        die('Error: ' . mysqli_stmt_error($statement));
    }

    echo 'Solution has been saved!';
} else {
    echo 'Must be logged in.';
    exit;
}

mysqli_stmt_close($statement);
mysqli_close($dbc);

?>
