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
    <script src="SolutionPage.js"></script>
	<link rel="stylesheet" type="text/css" href="serialStyle.css">
	<link rel="stylesheet" type="text/css" href="../single-solution/singleStyle.css">
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
                //Choose which table to display depending on whether or not a solution was passed in.
                if(isset($_POST['initialSolution'])){
                    include "content/initializedTable.php";
                }
                else{
                    include "content/uninitializedTable.php";
                }
            ?>
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
                <img src="beaker.png">
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
                        <img src="beakerSmall.png">
                           
                        <p id="flaskNum">1</p>
                    </div>
                     <!-- Arrow Div -->
                    <div class="blueArrow">
                        <p>10 ML</p>
                        <img src="blueArrow.png">
                    </div>
                    
                    <!-- Need to format '1' as subscript here-->
                    <p id="molarity">M1</p>
                    <p id="molarityValue">1.00 x 10<sup>-1</sup></p>
                </div> 
            </div>
            <!-- Buttons -->
            <div id="answerButtonsDiv" class="inline-div">
                <button id="saveButton">Save Dilution Series</button>
                <br>
                <button id="printButton" onClick="window.print();">Print Dilution Series</button>
                <br>
                <button id="answerHomeButton" onClick="window.location.href='../'">SoluBuddy Home</button>
                <!-- Style Hack Fix this -->
                <br>
                <br>
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