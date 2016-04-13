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
    if( (isset($_SESSION['solutions'])) && ($_SESSION['solutions'] == 'true') && isset($_SESSION['loggedIn']) ){
        require("headerSolution.php");
    }
    elseif(isset($_SESSION['loggedIn'])) {
        require("headerLogged.php");
    } else {
        require("header.html");
    }
}

?>

