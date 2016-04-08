
<div id = "divContainer">
	<div class="col-md-12 col-sm-12"><p class = "stockText"><?= "Your custom solution"; ?> </p>
	<div class="row">
		<div class="col-md-4 col-sm-6 col-xs-12"><input id="solventChemID" type="text" placeholder="Solvent Chemical Identity"></div>
		<div class="col-md-4 col-sm-6 col-xs-12"><input id="numDilutions" type="text" placeholder="Number of dilutions to prepare"></div>
		<div class="col-md-4 hidden-sm col-xs-12"><input id="soluteChemID" type="text" placeholder="Solute Chemical Identity (i.e., Formula)"></div>
	</div>
	<div class="row">
		<div class="hidden-lg hidden-md col-sm-6 hidden-xs"><input id="soluteChemID" type="text" placeholder="Solute Chemical Identity (i.e., Formula)"></div>
		<div class="col-md-4 col-sm-6"><input id="flasksVolume" type="text" placeholder="Volume of the dilution flasks"></div>
		<div class="col-md-4 col-sm-6"><input id="soluteMW" type="text" placeholder="Solute Molecular Weight"></div>
		<div class="col-md-4 col-sm-6"><input id="volumeTransferred" type="text" placeholder="Volume of solution transferred"></div>
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4"><button id="savedSolutionButton">Use Saved Solution!</button></div>
		<div class="col-md-4 col-sm-4"><button class="makeItNowButton">Make it Now!</button></div>
		<div class="col-md-4 col-sm-4"><button id="nextButton" class="nextButton">Next</button></div>	
	</div>

</div>
