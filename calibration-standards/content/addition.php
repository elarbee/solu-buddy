<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by The Standard Addition Model</h2>
</div>

<div class="container" id="solutionForm">
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your analyte</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the molarity of your analyte (M)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the number of flasks</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="analyte_formula" name="analyte_formula" type="text" placeholder="Analyte Name"></div>
		<div class="col-md-4 col-sm-12"><input id="analyte_molarity" name="analyte_molarity" type="text" placeholder="Molarity of Analyte"></div>
		<div class="col-md-4 col-sm-12"><input id="num_standards" name="num_standards" type="text" placeholder="Number of Calibration Standards"></div
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your unknown</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter constant volume of unknown for each flask (mL)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a total volume of your flasks(mL)</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="unknown" name="unknown" type="text" placeholder="Name of Unknown"></div>
		<div class="col-md-4 col-sm-12"><input id="unknown_volume" name="unknown_volume" type="text" placeholder="Constant Volume of Unknown for each Flask"></div>
		<div class="col-md-4 col-sm-12"><input id="total_volume_standards" name="total_volume_standards" type="text" placeholder="Total volume of Calibration Standard Flasks"></div>
	</div>
	<input type="hidden" name="solution_type" value="calibration_addition">
	<div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
</div>