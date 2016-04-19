<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by External Standards Method</h2>
</div>

<div class="container">
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a solvent chemical</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter an analyte chemical</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the analyte's weight</p></div>
	</div>
    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="solvent_formula" type="text" placeholder="Solvent Chemical Identity"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">Enter an analyte chemical</p></div>
        <div  class="col-md-4 col-sm-12"><input id="analyte_formula" type="text" placeholder="Analyte Chemical Identity (i.e., Formula)"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">Enter the analyte's weight</p></div>
        <div  class="col-md-4 col-sm-12"><input id="analyte_molec_weight" type="text" placeholder="Analyte Molecular Weight"></div>
    </div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter name for your Unknown</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">How many calibrations will there be?</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">What is the total volume of the flasks?</p></div>
	</div>
    <div class="row">
        <div   class="col-md-4 col-sm-12"><input id="unknown" type="text" placeholder="Name of Unknown"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">How many calibrations will there be?</p></div>
        <div  class="col-md-4 col-sm-12"><input  id="num_standards" type="text" placeholder="Number of Calibration Standards"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">What is the total volume of the flasks?</p></div>
        <div   class="col-md-4 col-sm-12"><input id="total_volume_standards" type="text" placeholder="Total volume of flasks"></div>
    </div>
	<div class="row">
		<div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
	</div>
</div>