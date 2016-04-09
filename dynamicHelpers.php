<!--This php file is used for serving dynamic pages, still need to determine exact
layout of how web pages will be designed-->

<?php
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
		if( (isset($_SESSION['solutions']) ) && ($_SESSION['solutions'] == 'true') ){
			require("headerSolution.php");
		}
		elseif(isset($_SESSION['loggedIn']) && $_SESSION['loggedIn'] == 'true') {
			require("headerLogged.php");
		} else {
			require("header.html");
		}
    }

?>

