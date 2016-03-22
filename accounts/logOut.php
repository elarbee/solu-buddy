<?php
	session_unset();
	session_destroy();
	header("location:soluHome.php");
?>