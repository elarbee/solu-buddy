<script>
//Check if solutions are loaded and make style changes accordingly.
    $(function(){

	 	var storedAnalyte = JSON.parse(localStorage.getItem('calibration1'));
		var storedStandard = JSON.parse(localStorage.getItem('calibration2'));

     if(storedAnalyte != null){
         $("#makeItNowButton1").remove();
         $("#savedSolution1").remove();
		 $("#completedSolution1").add();
		 $("#completedSolution1").show();

     }   
    
    if(storedStandard != null){
         $("#makeItNowButton2").remove();
         $("#savedSolution2").remove();
		 $("#completedSolution2").add();
		 $("#completedSolution2").show();
     }
		//console.log(storedAnalyte.SoluteID);

    });
</script>

<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by Internal Standards Method</h2>
</div>
<div class="container">
    
        <?php
        //Include the 'Make it Now' modal.
        include 'calibration-modals1.php'; 
    
        //Include the second 'Make it Now' modal.
        include 'calibration-modals2.php';
    ?> 
    
    <?php
    //Include the Saved solutions modal.
        include '../../shared-content/savedSolutionsModal.php';
    ?>
    
    <!-- Table used for Internal Standards Method -->
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="stockText">Stock Solution of analyte</p></div>
		<div class="col-md-4 col-sm-12"><button id="makeItNowButton1" class="makeItNowButton">Make It Now!</button></div>
		<div class="col-md-4 col-sm-12"><button id="savedSolution1" class="savedSolButton">Use Saved Solution!</button></div>
		<div class="col-md-4 col-sm-12"><button id="completedSolution1" class="completedSolButton" hidden disabled>Analyte Stock Solution Completed!</button></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="stockText">Stock Solution of Internal Standard</p></div>
		<div class="col-md-4 col-sm-12"><button id="makeItNowButton2" class="makeItNowButton">Make It Now!</button></div>
		<div class="col-md-4 col-sm-12"><button id="savedSolution2" class="savedSolButton">Use Saved Solution!</button></div>
		<div class="col-md-4 col-sm-12"><button id="completedSolution2" class="completedSolButton" disabled hidden>Internal Standard Stock Solution Completed!</button></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter name for your Unknown</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">How many calibrations will there be?</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">What is the total volume of the calibration flasks?</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="unknown" type="text" placeholder="Name of Unknown"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">How many calibrations will there be?</p></div>
		<div class="col-md-4 col-sm-12"><input id="num_standards" type="text" placeholder="Number of Calibration Standards" ></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">What is the total volume of the calibration flasks?</p></div>
		<div class="col-md-4 col-sm-12"><input id="volume_standards" type="text" placeholder="Volume of Calibration Standard Flasks"></div>
	</div>
	<input type="hidden" name="solution_type" value="calibration_internal">
	<div class="row">
		<button id="nextButton" class="nextButton">Next</button>
	</div>

<div>
	
</div>