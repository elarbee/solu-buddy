<?php
session_start();
$_SESSION['solutions'] = 'true';
require ("soluMySQLConnect.php");
require ("../dynamicHelpers.php");
renderHead( ["title" => "Solutions Page", "navField1" => "Account Settings", "navField2" => "Saved Solutions",
    "navField3" => "Chemistry Terms", "navField4" => "Create Solution(s)"] );

$username = $_SESSION["username"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $accountIdQuery = mysqli_query($dbc, "SELECT ID, First_Name, Last_Name FROM accounts WHERE Username = '$username'");
    if(!$accountIdQuery){
        echo 'Could not run query: ' . mysqli_error();
        exit;
    }
    $accountIdResult = mysqli_fetch_row($accountIdQuery);
    $accountId = $accountIdResult[0];
    $firstName = $accountIdResult[1];
    $lastName = $accountIdResult[2];

    $emailMessage = $_POST['message'];
    $replyEmail = $_POST['email'];

    if($emailMessage){
        $emailMessage = "New feedback received\r\n=====================\r\n" .
                        "Submitted by: \r\n" .
                        "\tReply Email: " . $replyEmail . "\r\n" .
                        "\tUsername: " . $username . "\r\n" .
                        "\tFirst Name: " . $firstName . "\r\n" .
                        "\tLast Name: ". $lastName . "\r\n\r\n" .
                        "Message:\r\n=====================\r\n\r\n" . $emailMessage;

        $msg = wordwrap($emailMessage, 70);
        $headers = 'From: noreply@solubuddy.com' . "\r\n" .
            'Reply-To: noreply@solubuddy.com' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        // send email
        mail("trumpet2012@gmail.com", "Solubuddy Feedback Submission[$replyEmail]",$msg, $headers);
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
    <style>
        .email-panel {
            margin: 32px;
        }
        .email-header {
            padding: 0 16px 16px 32px;
        }
    </style>
    <script src="/static/js/jquery-1.11.3.min.js"></script>
    <script src="/static/js/bootstrap.js"></script>
</head>
<body>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
?>
<div class="page-header email-header"><h2>Your feedback has been sent.</h2></div>
<div class="panel panel-default email-panel">
    <div class="panel-body">
        Thank you!
    </div>
<?php
}
else {
?>
<div class="page-header email-header"><h2>Let us know how we can improve!</h2></div>
<div class="panel panel-default email-panel">
    <div class="panel-body">
        <form method="POST">
            <div class="form-group">
                <label for="email">Reply Email</label>
                <input type="email" class="form-control" name="email" id="email" placeholder="example@gmail.com">
            </div>
            <div class="form-group">
                <label for="message">Message body</label>
                <textarea class="form-control" name="message" id="message" placeholder="Enter your feedback here."></textarea>
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
