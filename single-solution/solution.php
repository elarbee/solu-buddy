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
	<link rel="stylesheet" type="text/css" href="singleStyle.css">
</head>
<body>
    <?php
        include '../top-header.php';
    ?>
    
<?php
  //Declaring global final variables.    
    $SOLID = "SOLID";
    $GRAVIMETRIC = "GRAV";
    $VOLUMETRIC = "VOLU";
?>
    <div class="divCenterer">
                <!-- Solution Input page -->
                <div id="headerDiv">
                    <div class="stuffContainer">
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
            </div>
        </div>

    <div class="divCenterer">
        <div class="stuffContainer">

            <?php

            // Dynamically load one of three pages based on the value of '$_GET['value']'

            //Check that something was passed in through get
             if (count($_GET) > 0) {
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
<hr>
<!-- This is the answer page -->
<div id="answerDiv">
        <h2> Answer Div</h2>
        <div>
            <div id="answer_div" class="inline-div">

                <h1> <span id="molarity_span1"></span>M <span id="solute_span1"></span> in <span id="solvent_span1"></span> </h1>
                <h2>Prepared by adding <span id="mass_span"></span>g <span id="solute_span2"></span> to <span id="volume_span1"></span>mL
volumetric flask filled to mark with <span id="solvent_span2"></span> .</h2>
            </div>
            <div id="answerBeaker" class="inline-div">
                <img src="beaker.png" style="width:150px">
                <p class="caption"><span id="molarity_span2"></span>M <br>
                    <span id="solute_span3"></span> <br> in <span id="solvent_span3"></span> </p>
                <p class="caption"><span id="volume_span2"></span> mL</p>
            </div>
        </div>
        <div>
            <button>Use this solution for a serial dilution.</button><button>Save this Solution for later.</button> <button>Print Out Details</button> <button onClick="window.location.href='/'">Back to Solubuddy Home</button>
        </div>
</div>
    
</body>
</html>
