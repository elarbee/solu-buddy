<?php
session_start();
require ("soluMySQLConnect.php");

$username = $_SESSION["username"];

// To limit the number of submissions a user can send we set a cookie to track their submissions
// the limit is two submissions per hour.
$canSubmit = true;
if(isset($_COOKIE['submissions']) && $_COOKIE['submissions'] > 2){
    $canSubmit = false;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $username && $canSubmit) {
    if($statement = $dbc->prepare("SELECT ID, First_Name, Last_Name FROM accounts WHERE Username = ?")){
        $statement->bind_param('s', $username);
        $statement->execute();
        $statement->bind_result($accountId, $firstName, $lastName);
        $statement->fetch();
    }
    else{
        echo 'Could not run query: ' . $dbc->error;
        exit;
    }

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

        if(mail("dkreller@georgiasouthern.edu", "Solubuddy Feedback Submission[$replyEmail]",$msg, $headers)){
            if(!isset($_COOKIE['submissions'])){
                // create cookie for tracking number of submissions, expires in an hour
                setcookie('submissions', 1, time() + 3600);
            }else{
                $_COOKIE['submissions'] += 1;
            }
        }
    }
}

$_SESSION['solutions'] = 'true';
require ("../dynamicHelpers.php");
renderHead( ["title" => "Solutions Page", "navField1" => "Account Settings", "navField2" => "Saved Solutions",
    "navField3" => "Chemistry Terms", "navField4" => "Create Solution(s)"] );

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
if ($username && $canSubmit){
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    ?>
    <div class="page-header email-header"><h2>Your feedback has been sent.</h2></div>
    <div class="panel panel-default email-panel">
        <div class="panel-body">
            Thank you!
        </div>
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
                    <textarea class="form-control" name="message" id="message" placeholder="Enter your feedback here."
                              rows="4"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    <?php
    };
} else if($canSubmit){
?>
    <div class="page-header email-header"><h2>Must be logged in to leave feedback.</h2></div>
<?php
} else {
?>
    <div class="page-header email-header">
        <h2>
            We appreciate your feedback.
        </h2>
        <h3>
            However, to reduce the amount of email traffic we
            receive there is a limit of two submissions per hour. Please try again later.
        </h3>
    </div>
<?php
}

include('../footer.html');
?>

</body>
</html>
