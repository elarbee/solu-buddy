<?php
session_start();
$_SESSION['solutions'] = 'true';
require ("soluMySQLConnect.php");
require ("../dynamicHelpers.php");
renderHead( ["title" => "Solutions Page", "navField1" => "Account Settings", "navField2" => "Saved Solutions",
    "navField3" => "Chemistry Terms", "navField4" => "Create Solution(s)"] );

$username = $_SESSION["username"];

$accountIdQuery = mysqli_query($dbc, "SELECT ID, First_Name, Last_Name FROM accounts WHERE Username = '$username'");
if(!$accountIdQuery){
    echo 'Could not run query: ' . mysqli_error();
    exit;
}
$accountIdResult = mysqli_fetch_row($accountIdQuery);
$accountId = $accountIdResult[0];
$firstName = $accountIdResult[1];
$lastName = $accountIdResult[2];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emailMessage = $_POST['message'];

    if($emailMessage){
        $emailMessage = 'Submission by '. $firstName . $lastName . '\n. Message:\n' . $emailMessage;
        $msg = wordwrap($emailMessage, 70);
        $headers = 'From: noreply@solubuddy.com' . "\r\n" .
            'Reply-To: noreply@solubuddy.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        // send email
        mail("trumpet2012@gmail.com", "Solubuddy Feedback Submission",$msg, $headers);
    }
}

?>

<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="/static/css/bootstrap.css">
    <link href="/static/css/table.css" type="text/css" rel="stylesheet">
    <link href="/static/css/header-styles.css" type="text/css" rel="stylesheet">
    <link href="/static/css/navBar.css" type="text/css" rel="stylesheet">
    <script src="/static/js/jquery-1.11.3.min.js"></script>
    <script src="/static/js/bootstrap.js"></script>
</head>
<body>
<div class="panel panel-default">
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
?>
    <div class="panel-heading">Email Sent</div>
    <div class="panel-body">
        Thank you for your feedback!
    </div>
<?php
}
else {
?>
    <div class="panel-heading">Email Message</div>
    <div class="panel-body">
        <form method="POST">
            <div class="form-group">
                <label for="message">Message body</label>
                <textarea class="form-control" name="message" id="message" placeholder="Email message"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
<?php
};
?>
</div>

</body>
</html>
