<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by Internal Standards Method</h2>
</div>
<div class="container" id="solutionForm">
    <!-- Table used for Internal Standards Method -->
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your analyte</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the molarity of your analyte (M)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the number of flasks</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="analyte_formula" type="text" name="analyte_formula" placeholder="Analyte Name"> </div>
		<div class="col-md-4 col-sm-12"><input id="analyte_molarity" name="analyte_molarity" type="text" placeholder="Molarity of Analyte Solution" ></div>
		<div class="col-md-4 col-sm-12"><input id="num_standards" name="num_standards" type="text" placeholder="Number of Calibration Standards" ></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your internal standard</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the molarity of your internal standard (M)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a total volume for your flasks (mL)</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="internal_formula" name="internal_formula" type="text" placeholder="Internal Standard Name" ></div>
		<div class="col-md-4 col-sm-12"><input id="internal_molarity" name="internal_molarity" type="text" placeholder="Molarity of Internal Standard" ></div>
		<div class="col-md-4 col-sm-12"><input id="total_volume_standards" name="total_volume_standards" type="text" placeholder="Volume of Calibration Standard Flasks"></div>
	</div>
	<input type="hidden" name="solution_type" value="calibration_internal">
	<button id="nextButton" class="nextButton">Next</button>

<div>
	
</div>