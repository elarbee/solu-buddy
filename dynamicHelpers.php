<!--This php file is used for serving dynamic pages, still need to determine exact
layout of how web pages will be designed-->

<?php
    
    //Check if a session is uninitialized before callign session_start()
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
        
        //Check that 'loggedIn' is set first
        if(isset($_SESSION['loggedIn'])) {

            if($_SESSION['loggedIn'] !== True) {
                require("header.html");
            } 
            else {
                require("headerLogged.php");
            }
        }
        
    }

?>

