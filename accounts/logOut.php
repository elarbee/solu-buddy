<?php
	session_start();
	$_SESSION['loggedIn'] = False;
	session_unset();
	session_destroy();
	header("location:/");
?>