<div id = "divContainer">
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12"><p class="regText">Enter a name for your solvent.</p></div>
		<div class="col-md-6 col-sm-6 hidden-xs"><p class="regText">How many dilution flasks will you use?</p></div>
	</div>
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12">
			<input name="solventChemID" id="solventChemID" class = "input" type="text" placeholder="Solvent" tabindex="1">
		</div>
		<div class="hidden-xl hidden-lg hidden-md hidden-sm col-xs-12">
            <p class="regText">How many dilution flasks will you use?</p>
        </div>
		<div class="col-md-6 col-sm-6 col-xs-12">
            <input name="numDilutions" id="numDilutions" type="number" placeholder="Number of dilutions." tabindex="4">
        </div>
	</div>
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12">
            <p class="regText">Enter a name for your solute.</p>
        </div>
		<div class="col-md-6 col-sm-6 hidden-xs">
            <p class="regText">Dilution Flask Volume (ML)</p>
        </div>
	</div>
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12">
            <input name="soluteChemID" id="soluteChemID" type="text" placeholder="Solute" tabindex="2">
        </div>
		<div class="hidden-xl hidden-lg hidden-md hidden-sm col-xs-12">
            <p class="regText">Dilution Flask Volume (ML)</p>
        </div>
		<div class="col-md-6 col-sm-6 col-xs-12">
            <input name="flasksVolume" id="flasksVolume" type="number" placeholder="Dilution Flask Volume" tabindex="5">
        </div>
	</div>
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12">
            <p class="regText">What's your solute's Molecular weight? (M)</p>
        </div>
		<div class="col-md-6 col-sm-6 hidden-xs">
            <p class="regText">How much solution will you transfer each time? (ML)</p>
        </div>
	</div>
	<div class="row">
		<div class="col-md-6 col-sm-6 col-xs-12">
            <input name="soluteMW" id="soluteMW" type="number" placeholder="Solute Molecular Weight" tabindex="3">
        </div>
		<div class="hidden-xl hidden-lg hidden-md hidden-sm col-xs-12">
            <p class="regText">How much solution will you transfer each time? (ML)</p>
        </div>
		<div class="col-md-6 col-sm-6 col-xs-12">
            <input name="volumeTransferred" id="volumeTransferred" type="number" placeholder="Solution Transferred Vol" tabindex="6">
        </div>
	</div>
    <input type="hidden" name="solution_type" value="serial">
    <div class="row">
        <button type="button" id="nextButton" class="nextButton">Next</button>
    </div>

</div>
