<div id="headerDiv">
    <h3>Fill in the fields below to set up the dilution series</h3>
</div>

<div class="container" id="solutionForm">
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your solvent</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a name for your solute</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">What is the Molarity of the original stock solution? (M)</p></div>
	</div>
    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="solventChemID" name="solventChemID" class = "input" type="text" placeholder="Solvent" tabindex="1"></div>
        <div  class="col-md-4 col-sm-12"><input id="soluteChemID" name="soluteChemID" type="text" placeholder="Solute" tabindex="2"></div>
        <div  class="col-md-4 col-sm-12"><input id="molaritySolution" name="molaritySolution" type="number" placeholder="Molarity of Stock Solution" tabindex="3"></div>
    </div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">How many dilution flasks will you use?</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Dilution Flask Volume (mL)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">How much solution will you transfer each time? (mL)</p></div>
	</div>
    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="numDilutions" name="numDilutions" type="number" placeholder="Number of dilutions." tabindex="4"></div>
        <div  class="col-md-4 col-sm-12"><input id="flasksVolume" name="flasksVolume" type="number" placeholder="Dilution Flask Volume" tabindex="5"></div>
        <div  class="col-md-4 col-sm-12"><input id="volumeTransferred" name="volumeTransferred" type="number" placeholder="Solution Transferred Vol" tabindex="6"></div>
    </div>
	<input type="hidden" name="solution_type" value="serial">
	<div class="row">
		<div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
	</div>
</div>