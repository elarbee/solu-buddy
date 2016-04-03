<!--This php file is used for serving dynamic pages, still need to determine exact
layout of how web pages will be designed-->

<?php
session_start();
    require("modals.php");
	
	/* Renders foot of page. */
	function renderFoot($data = []) 
    {
        extract($data); 
        require("footer.php");
    }
	
    /* Renders head of page. */
    function renderHead($data = [])
    {
        extract($data);
		if($_SESSION['loggedIn'] !== True) {
			require("header.html");
		} else {
			require("headerLogged.php");
		}
    }

?>

