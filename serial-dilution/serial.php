<!DOCTYPE html>
<html>
<head>
    
    <?php
        //If a solution is passed in via the 'POST' Method with value 'initialSolution',
        //then initialize a javascipt object containing it.
        if(isset($_POST['initialSolution'])){
            echo "<script> var initialSolution = " . $_POST['initialSolution'] . ";</script>";
        }
    ?>
    
    <?php
        include '../script-includes.html';
    ?>
    <!-- Big decimal javascript used for floating point precision -->
    <script src="big.min.js"></script>
    <script src="serialPage.js"></script>
	<link rel="stylesheet" type="text/css" href="../single-solution/singleStyle.css">
    <link rel="stylesheet" type="text/css" href="serialStyle.css">
    <title>Solubuddy - Serial Dilution</title>
</head>
<body>
    <?php
        include '../top-header.php';
    ?>
<!-- Solution Input page -->
<div class="text-center">
    <img src="serial.png" width="550"><br><br>
    <div id="inputDiv" class="grey-div">
        <div id="headerDiv">
            <h3>Fill in the fields below to set up the dilution series</h3>
        </div>
        <div id="divContainer">
            <?php
                include "content/serialTable.php";
            ?>
        </div>
        <div id="myAlert" class="alert alert-danger">
            <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
        </div>
    </div>
</div>


    
<!-- This is the answer page -->
<div id="answerDiv" class="grey-div">
        <div id="arrowContainer">
            <img src="down-arrow.png">
       </div>
    
        <h2>Serial Dilution</h2>
        <!-- Contains the content of the answer page -->
        <div id="answerContent" >
            <!-- Stock Solution -->
            <div id="stockSolutionDiv" class="inline-div">
                <img id="largeBeakerImg" src="../static/images/beakerSpecial.png">
                <!-- Arrow Div -->
                <div class="blueArrow">
                    <p>10 ML</p>
                    <img src="blueArrow.png">
                </div>
                <p id="stockSolutionDescription">Details of the stock solution displayed here</p>
            </div>
            <!-- Dilution flasks -->
            <div id="dilutionFlasksDiv" class="inline-div">
                <!-- This div is important. Will be duplicated according to the number of flasks the user specifies. -->
                <div id="dilutionFlask" class="dilutionFlask inline-div" >
                    <div class="flaskImgAndNumberDiv">
                        <img id="smallBeakerImg" src="../static/images/beaker.png">
                           
                        <p id="flaskNum">1</p>
                    </div>
                     <!-- Arrow Div -->
                    <div class="blueArrow">
                        <p>10 ML</p>
                        <img src="blueArrow.png">
                    </div>
                    <div class="flaskDescription">
                        <p id="solutionName">Solute diluted in Solvent</p>
                        <p id="molarityValue">1.00 x 10<sup>-1</sup></p>
                    </div>
                </div> 
            </div>
            <!-- Buttons -->
            <div id="answerButtonsDiv" class="inline-div">
                <button id="saveButton">Save Dilution Series</button>
                <br>
                <button type="button" id="printButton" onClick="window.print();">Print Dilution Series</button>
            </div>
        </div>
</div>

    <?php
    //Include the 'Make it Now' modal.
        include '../shared-content/makeItNowModal.php'; 
    ?> 
    
    <?php
    //Include the Saved solutions modal.
        include '../shared-content/savedSolutionsModal.php'; 
    ?> 
    

</body>
</html>