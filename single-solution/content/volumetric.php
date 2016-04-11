<div class="input-div">
	<span class="regText">Solvent Formula &nbsp; </span> <input name="solvent_formula" id = "solvent_formula" type="text" placeholder="Solvent Formula"> <br>
    <span class="regText">Solute Formula &nbsp;  </span> <input name="solute_formula" id = "solute_formula" type="text" placeholder="Solute Formula"><br>
    <span class="regText">Solute Molecular Weight &nbsp; </span> <input name="solute_molec_weight" id = "solute_molec_weight" type="text" placeholder="Solute Molecular Weight"><br>
	<span class="regText">Density of Pure Solute (g/mL)&nbsp;  </span> <input name="density" id = "density" type="text" placeholder="Density of Pure Solute"><br>
	<span class="regText">Solution Total Volume (mL) &nbsp; </span> <input name="total_volume" id = "total_volume" type="text" placeholder="Solution Total Volume (mL)"><br>
    <span class="regText">Sol'n Concentration (mol/L) &nbsp; </span> <input name="solution_concentration" id = "solution_concentration" type="text" placeholder="Sol'n Concentration (mol/L)"><br>
	<span class="regText">Volume of Solute to Add (mL)&nbsp;  </span> <input name="massToAdd" id="massToAdd" type="text" placeholder="Volume of Solute to Add"><br>

</div>

	<div class="inline-div">
		<img src="beaker.png" style="width:150px">
        <br>

		<?php 
            //This code handles whether or not the solution is passed on to another page.
            //If it is null the solution will be solved here.
            if(isset($_GET['passTo'])){
                include 'content/serialForm.php'; 
            } 
            else{
				echo "<button type=\"button\" id=\"nextButton\" class=\"nextButton\" onclick=\"next_check('". $_GET['value'] . "')\">Next</button>";
            }
        ?>
        
	</div>

	<div class="inline-div">
		<img src="pipette.png" style="width:150px">
        <br>
        <button type="button" class="soluHome" onClick="window.location.href='../'">SoluBuddy Home</button>
	</div>

	<div class="inline-div">
		<img src="solid.png" style="width:150px">
        <br>
        <br>
        <br>
		<button type="button"  class="howCalcButton" onclick="">How do I calculate this?</button>
	</div>