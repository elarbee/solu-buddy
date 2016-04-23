<?php
require_once('soluMySQLConnect.php');
if ($_REQUEST["uname"]) {

    $uname = $_REQUEST['uname'];

    $statement = mysqli_prepare($dbc, "SELECT Username FROM accounts WHERE Username=?");
    mysqli_stmt_bind_param($statement, 's', $uname);

    $statementWorked = mysqli_stmt_execute($statement);

    mysqli_stmt_bind_result($statement, $dbUser);
    mysqli_stmt_fetch($statement);

    if ($uname == $dbUser) {
        echo (int)(0);
    } else {
        echo (int)(1);
    }
}

mysqli_close($dbc);

?>