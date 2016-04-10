<?php
session_start();
require('../dynamicHelpers.php');
renderHead( ['title' => 'Logged Landing Page', 'navField1' => 'Account Settings', 'navField2' => 'Saved Solutions',
    'navField3' => 'Chemistry Terms', 'navField4' => 'Create Solution(s)'] );
?>

<!DOCTYPE html>
<html>

<head>

    <?php include '../script-includes.html'; ?>
    <script src="calibrationPage.js"></script>
    <script src="../static/js/formula.js"></script>
    <script src="../static/js/elements.js"></script>
    <script src="../static/js/utility.js"></script>
    <script src="../static/js/calculator.js"></script>
    <script src="../static/js/solution.js"></script>
    <script src="../static/js/solutionObjectBuilder.js"></script>
    
	<link rel="stylesheet" type="text/css" href="../shared-content/InputStyle.css">
    <link rel="stylesheet" type="text/css" href="calibrationStyle.css">
</head>

<body>

    <?php
    //Declaring global final variables.
    //These can be called later with the $_GLOBALS variable
        $EXTERNAL="EXTERNAL" ; $INTERNAL="INTERNAL" ; $ADDITION="ADDITION" ;
    ?>
    <div id="content" class="text-center">
        <div id="inputDiv">
        <?php // Dynamically load one of three pages based on the valuiie of '$_GET['value ']' //Make sure a value is passed in if(isset($_GET[ "value"])){ //If it 's the external calibrations page.
            if ($_GET["value"] == $GLOBALS['EXTERNAL']) {
                include 'content/external.php';
            }

            //If its the internal calibrations page
            elseif ($_GET["value"] == $GLOBALS['INTERNAL']) {
                include 'content/internal.php';
            }
            
            //If its the standard addition page
            elseif ($_GET["value"] == $GLOBALS['ADDITION']) {
                include 'content/addition.php';
            }    
    ?>
        </div>
	</div>
  
<!-- This is the answer page -->
<div id="answerDiv" class="gray-div">
        <div id="arrowContainer">
            <img src="down-arrow.png">
        </div>
        <h2>External Standards Method</h2>
        <!-- Contains the content of the answer page -->
        <div id="answerContent" class="inline-div">
            <!-- Unknown -->
            <div id="stockSolutionDiv" class="inline-div">
                <p id="unknownSolutionDescription">Name of unkown,i.e. 'River Water '</p>
                <img src="../static/images/beakerSpecial.png">
            </div>
            
            <!-- Dilution flasks -->
            <div id="dilutionFlasksDiv" class="inline-div">
                <!-- This div is important. Will be duplicated according to the number of flasks the user specifies. -->
                <div id="dilutionFlask1" class="dilutionFlask inline-div">
                    <div class="flaskImgAndNumberDiv">
                        <td><input type="text" placeholder="V, sas, std1"></td>
                        <img id="smallBeakerImg" src="../static/images/beaker.png">
                        <p id="flaskNumber">1</p>
                    </div>
                    
                    <!-- Need to format '1 ' as subscript here-->
                    <p id="molarity">M1</p>
                    <p id="molarityValue">1.00 x 10^-1</p>
                </div>
            </div>
            
            <div id="stockSolutionDiv" class="inline-div">
                <p id="analyteSolutionDescription">Analyte</p>
                <img src="../static/images/beakerSpecial.png">
            </div>
            
            <!-- Buttons -->
            <div id="answerButtonsDiv" class="inline-div">
                <button id="saveButton">Save Set of Standards</button>
                <br>
                <button id="printButton" onClick="">Print Set of Standards Series</button>
                <br>
                <button id="answerHomeButton" onClick="window.location.href='/ '">SoluBuddy Home</button>
                <!-- Style Hack Fix this -->
                <br>
                <br>
            </div>
        </div>
</div>


</body>
</html>