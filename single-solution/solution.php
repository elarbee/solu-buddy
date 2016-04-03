<!DOCTYPE html>
<html>
<head>
    <?php
        include '../script-includes.html';
    ?>
    <script src="SolutionPage.js"></script>
    <script src="../static/js/formula.js"></script>
    <script src="../static/js/elements.js"></script>
    <script src="../static/js/calculator.js"></script>
    <script src="../static/js/solutionObjectBuilder.js"></script>
	<link rel="stylesheet" type="text/css" href="singleStyle.css">
</head>
<body>
    <?php
        include '../top-header.php';
    ?>
    
<?php
  //Declaring global final variables.
    //Used for keeping track of 'Make it Niw' solutions.
    $SOLID = "SOLID";
    $GRAVIMETRIC = "GRAV";
    $VOLUMETRIC = "VOLU";
    
    $CALIBRATION1 = "calibration1";
    $CALIBRATION2 = "calibration2";
    $SERIAL = "serial";
?>
<div class="text-center">
<div class="grey-div">

<!-- Solution Input page -->
<div id="headerDiv">
    <!-- Dynamically add correct Header depending on $_GET['value] -->
    <?php 
        //Check that something was passed in through get
        if (count($_GET) > 0) {
            //Solid Solution
            if ($_GET["value"] == $GLOBALS['SOLID']) {
                echo "<h2> Okay, you are adding a solute that is in the form of a pure solid. </h2>";
                echo "<h3> Fill in the fields below with the appropriate information </h3>";
            }

            //Gravimetric Liquid
            elseif ($_GET["value"] == $GLOBALS['GRAVIMETRIC']) {
                echo "<h2> Okay, you are gravimetrically adding a solute that is in the form of a pure liquid. </h2>";
                echo "<h3> Fill in the fields below with the appropriate information </h3>";
            }

            //Volumetric Liquid
            elseif ($_GET["value"] == $GLOBALS['VOLUMETRIC']) {
                echo "<h2> Okay, you are volumetrically adding a solute that is in the form of a pure liquid. </h2>";
                echo "<h3> Fill in the fields below with the appropriate information </h3>";
            }
            //If none of the above show an error page.
            else{
                 echo "<h2> Error: Malformed URL, please return to SoluBuddy Home Page and try again. </h2>";
            }
        }
    //If nothing was passed in display error
      else{
             echo "<h2> Error: Malformed URL, please return to SoluBuddy Home Page and try again. </h2>";
      }
        
 
    ?>

</div>
<div id="divContainer">
    <?php 

    // Dynamically load one of three pages based on the valuiie of '$_GET['value']'
    
    //Check that something was passed in through get
     if (isset($_GET['value'])) {
        //If it's the solid solution page.
        if ($_GET["value"] == $GLOBALS['SOLID']) {
            include 'content/solid.php'; 
        }

        elseif ($_GET["value"] == $GLOBALS['GRAVIMETRIC']) {
            include 'content/gravimetric.php';
        }
        elseif ($_GET["value"] == $GLOBALS['VOLUMETRIC']) {
            include 'content/volumetric.php';
        }
     }

    
    ?>
</div>
    
</div>
</div>

<?php
    //Only show answer div if 'passTo' value is null
    if(!isset($_GET['passTo'])){
        include 'content/answerDiv.php'; 
     }        
?>
    
</body>
</html>
