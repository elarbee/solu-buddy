<div id="headerDiv">
    <h3>Fill in the fields below to set up the dilution series</h3>
</div>

<div class="container">
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">Enter a name for your solvent.</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a name for your solute</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">What's your solute's Molecular weight? (M)</p></div>
	</div>
    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="solventChemID" class = "input" type="text" placeholder="Solvent" tabindex="1"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">Enter a name for your solute</p></div>
        <div  class="col-md-4 col-sm-12"><input id="soluteChemID" type="text" placeholder="Solute" tabindex="2"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">What's your solute's Molecular weight? (M)</p></div>
        <div  class="col-md-4 col-sm-12"><input id="soluteMW" type="number" placeholder="Solute Molecular Weight" tabindex="3"></div>
    </div>
	<div class="row">
		<div class="col-md-4 col-sm-12"><p class="regText">How many dilution flasks will you use?</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Dilution Flask Volume (ML)</p></div>
		<div class="col-md-4 hidden-sm hidden-xs"><p class="regText">How much solution will you transfer each time? (ML)</p></div>
	</div>
    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="numDilutions" type="number" placeholder="Number of dilutions." tabindex="4"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">Enter a name for your solute</p></div>
        <div  class="col-md-4 col-sm-12"><input id="flasksVolume" type="number" placeholder="Dilution Flask Volume" tabindex="5"></div>
		<div class="hidden-xl hidden-lg hidden-md col-sm-12"><p class="regText">What's your solute's Molecular weight? (M)</p></div>
        <div  class="col-md-4 col-sm-12"><input id="volumeTransferred" type="number" placeholder="Solution Transferred Vol" tabindex="6"></div>
    </div>
	<div class="row">
		<div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
	</div>
</div>