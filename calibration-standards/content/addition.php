<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by The Standard Addition Model</h2>
</div>

<div class="container">
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your analyte</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a molarity for your analyte (M)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the number of flasks</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="analyte_formula" type="text" placeholder="Analyte Chemical Identity (i.e., Formula)"></div>
		<div class="col-md-4 col-sm-12"><input id="analyte_molarity" type="text" placeholder="Molarity of Analyte"></div>
		<div class="col-md-4 col-sm-12"><input id="num_standards" type="text" placeholder="Number of Calibration Standards"></div
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your unknown</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter constant volume of unknown for each flask (mL)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the total volume of your flasks(mL)</p></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><input id="unknown" type="text" placeholder="Name of Unknown"></div>
		<div class="col-md-4 col-sm-12"><input id="unknown_volume" type="text" placeholder="Constant Volume of Unknown for each Flask"></div>
		<div class="col-md-4 col-sm-12"><input id="total_volume_standards" type="text" placeholder="Total volume of Calibration Standard Flasks"></div>
	</div>
	<div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
</div>