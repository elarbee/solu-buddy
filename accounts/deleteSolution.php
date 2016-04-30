<?php
session_start();
require ("soluMySQLConnect.php");

if(!isset($_GET['ID']))
{
    echo 'No ID was given.';
    header("Refresh: 2; /accounts/solutionsTable.php");
    exit;
}
// t is the type of solution that is being deleted.
if(!isset($_GET['t'])){
    echo 'No type specified.';
    header("Refresh: 2; /accounts/solutionsTable.php");
    exit;
}

$type = $_GET['t'];

$table = null;

if($type == 'single_sol_solid') $table='single_solution_solid';
elseif ($type == 'single_sol_liq_grav') $table = 'single_solution_liquid_grav';
elseif ($type == 'single_sol_liq_vol') $table = 'single_solution_liquid_vol';
elseif ($type == 'serial') $table = 'serial_dilution';
elseif ($type == 'calibration_ext') $table = 'calibration_external';
elseif ($type == 'calibration_add') $table = 'calibration_addition';
elseif ($type == 'calibration_int') $table = 'calibration_internal';

if($table){
    $deleteQuery = "DELETE FROM $table WHERE ID = ?";
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
}
header("Refresh: 0; /accounts/solutionsTable.php");
$dbc->close();
?>