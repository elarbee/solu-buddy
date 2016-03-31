<!DOCTYPE html>
<html>
<head>
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
<div id="headerDiv">
    <h2>Serial Dilution</h2>
    <h3>Fill in the fields below to set up the dilution series</h3>
</div>
<div id="divContainer">
	<table>
        <tr>
            <td><p>The Initial (stock) solution </p></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> <button class="makeItNowButton">Make it Now!</button>  </td>
            <td> <input id="solventChemID" type="text" placeholder="Solvent Chemical Identity"></td>
            <td> <input id="numDilutions" type="text" placeholder="Number of dilutions to prepare"> </td>
            <td> <a href="#answerDiv"><button id="nextButton">Next</button></a></td>
        </tr>
        <tr>
            <td> <button id="savedSolutionButton">Use Saved Solution!</button> </td>
            <td> <input id="soluteChemID" type="text" placeholder="Solute Chemical Identity (i.e., Formula)"> </td>
            <td> <input id="flasksVolume" type="text" placeholder="Volume of flasks in which dilutions are prepared"> </td>
            <td> <button id="homeButton" onClick="window.location.href='../'">SoluBuddy Home</button> </td>
        </tr>
        <tr>
            <td></td>
            <td><input id="soluteMW" type="text" placeholder="Solute Molecular Weight"></td>
            <td><input id="volumeTransferred" type="text" placeholder="Volume of solution transferred to next flask"></td>
            <td></td>
        </tr>
    </table>
</div>

<hr>
    
<!-- This is the answer page -->
<div id="answerDiv">

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
                    <p id="molarityValue">1.00 x 10^-1</p>
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