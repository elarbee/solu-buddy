<!--This php file is used for serving dynamic pages, still need to determine exact
layout of how web pages will be designed-->

<?php

    //Check if a session is uninitialized before calling session_start()
    if(!isset($_SESSION))
    {
        session_start();
    }
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
        
        // If the user is logged in then we show them the logged in header.
        if(!isset($_SESSION['loggedIn'])) {
            require("header.html");
        }
        else {
            require("headerLogged.php");
        }
    }

?>

