<?php
    //If a solution is passed in via the 'POST' Method with value 'initialSolution',
    //then initialize a javascipt object containing it.
    if(isset($_POST['formulaValue1'])){
        echo "<script> var formulaValue1 = " . $_POST['formulaValue1'] . ";</script>";
    }
?>


<script>
//Check if solutions are loaded and make style changes accordingly.
    $(function(){
     if(localStorage.getItem('calibration1')!=null){
         $("#makeItNowButton1").remove();
         $("#savedSolution1").remove();
     }   
    
    if(localStorage.getItem('calibration2')!=null){
         $("#makeItNowButton2").remove();
         $("#savedSolution2").remove();
     }
    
    });
</script>

<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by Internal Standards Method</h2>
</div>
<div id="divContainer">
    
        <?php
        //Include the 'Make it Now' modal.
        include 'calibration-modals1.php'; 
    
        //Include the second 'Make it Now' modal.
        include 'calibration-modals2.php';
    ?> 
    
    <?php
    //Include the Saved solutions modal.
        include '../shared-content/savedSolutionsModal.php'; 
    ?> 
    
    <!-- Table used for Internal Standards Method -->
	<!--
    <table id="internalTable">
        <tr>
            <td><input type="text" placeholder="Name of Unknown"></td>
            <td><input type="text" placeholder="Analyte Molecular Weight"></td>
            <td><p>Stock Solution of analyte</p> </td>
            <td><p>Stock Solution of Internal Standard</p>
            <td><input type="text" placeholder="Number of Calibration Standards"> </td>
        </tr>
        <tr>
            <td><input type="text" placeholder="Solvent Chemical Identity"></td>
            <td><input type="text" placeholder="Internal Standard Chemical Identity"></td>
            <td><button id="makeItNowButton1">Make It Now!</button></td>
            <td><button id="makeItNowButton2">Make It Now!</button></td>
            <td><input type="text" placeholder="Volume of Calibration Standard Flasks"></td>
        </tr>
        <tr>
            <td><input type="text" placeholder="Analyte Chemical Identity"></td>
            <td><input type="text" placeholder="Internal Standard Molecular Weight"></td>
            <td><button id="savedSolution1">Use Saved Solution!</button></td>
            <td><button id="savedSolution2">Use Saved Solution!</button></td>
            <td></td>
        </tr>
    </table>
    <td> <button id="nextButton">Next</button> </td>
    -->
	<div class="row">
		<div class="col-md-4 col-sm-4"><p>Stock Solution of analyte</p></div>
		<div class="col-md-4 col-sm-4"><button id="makeItNowButton1">Make It Now!</button></div>
		<div class="col-md-4 col-sm-4"><button id="savedSolution1">Use Saved Solution!</button></div>	
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4"><p>Stock Solution of Internal Standard</p></div>
		<div class="col-md-4 col-sm-4"><button id="makeItNowButton2">Make It Now!</button></div>
		<div class="col-md-4 col-sm-4"><button id="savedSolution2">Use Saved Solution!</button></div>	
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Name of Unknown"></div>
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Analyte Molecular Weight"></div>
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Number of Calibration Standards"></div>	
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Solvent Chemical Identity"></div>
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Internal Standard Chemical Identity"></div>
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Volume of Calibration Standard Flasks"></div>	
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Volume of Calibration Standard Flasks"></div>
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Analyte Chemical Identity"></div>
		<div class="col-md-4 col-sm-4"><input type="text" placeholder="Internal Standard Molecular Weight"></div>	
	</div>
	<button id="nextButton">Next</button>
	
	
	<!--<div class="row">
		<div class="col-md-4 col-sm-4"></div>
		<div class="col-md-4 col-sm-4"></div>
		<div class="col-md-4 col-sm-4"></div>	
	</div>-->
<div>
	
</div>