<!--	<table>
        <tr>
            <td><p>The Initial (stock) solution </p></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td> <button class="makeItNowButton">Make it Now!</button>  </td>
            <td> <input id="solventChemID" type="text" placeholder="Solvent Chemical Identity"></td>
            <td> <input id="numDilutions" type="text" placeholder="Number of dilutions to prepare"> </td>
            <td> <button id="nextButton">Next</button></td>
        </tr>
        <tr>
            <td> <button id="savedSolutionButton">Use Saved Solution!</button> </td>
            <td> <input id="soluteChemID" type="text" placeholder="Solute Chemical Identity (i.e., Formula)"> </td>
            <td> <input id="flasksVolume" type="text" placeholder="Volume of flasks in which dilutions are prepared"> </td>
            <td> <button id="homeButton" onClick="window.location.href='../'">SoluBuddy Home</button> </td>
        </tr>
        <tr>
            <td></td>
            <td><input id="soluteMW" type="text" placeholder="Solute Molecular Weight"></td>
            <td><input id="volumeTransferred" type="text" placeholder="Volume of solution transferred to next flask"></td>
            <td></td>
        </tr>
    </table>
-->
<div id = "divContainer">
<p>The Initial (stock) solution </p>
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
		<!--<div class="col-md-2 col-sm-12"><button id="homeButton" onClick="window.location.href='../'">SoluBuddy Home</button></div>-->
	</div>
	<div class="row">
		<div class="col-md-4 col-sm-4"><button id="savedSolutionButton">Use Saved Solution!</button></div>
		<div class="col-md-4 col-sm-4"><button class="makeItNowButton">Make it Now!</button></div>
		<div class="col-md-4 col-sm-4"><button id="nextButton">Next</button></div>	
	</div>

</div>