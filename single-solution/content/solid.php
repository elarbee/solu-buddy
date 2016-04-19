    <div class="input-div">
        Solvent Formula <input name="solvent_formula" id = "solvent_formula" type="text" placeholder="Solvent Formula"> <br>
        Solute Formula <input name="solute_formula" id = "solute_formula" type="text" placeholder="Solute Formula"><br>
        Solute Molecular Weight <input name="solute_molec_weight" id = "solute_molec_weight" type="text" placeholder="Solute Molecular Weight"><br>
        Solution Total Volume (mL) <input name="total_volume" id = "total_volume" type="text" placeholder="Solution Total Volume (mL)"><br>
        Sol'n Concentration (mol/L) <input name="solution_concentration" id = "solution_concentration" type="text" placeholder="Sol'n Concentration (mol/L)"><br>
        Mass of Solute to Add (g) <input name="massToAdd" id="massToAdd" type="text" placeholder="Mass of Solute to Add"><br>
        <input type="hidden" name="solution_type" value="single_solid">
    </div>

	<div class="inline-div">
		<img src="beaker.png" style="width:150px">
        <br>
        <?php
            //This code handles whether or not the solution is passed on to another page.
            //If it is null the solution will be solved here.
            if(isset($_GET['passTo'])){

                if($_GET['passTo'] == $GLOBALS['SERIAL']){
                    include 'content/serialForm.php';
                }

                elseif($_GET['passTo'] == 'calibration1' or $_GET['passTo'] == 'calibration2'){
                    include 'content/calibrationForm.php';
                }
            }
            else{
                echo "<button type=\"button\" id=\"nextButton\" onclick=\"next_check('". $_GET['value'] . "')\">Next</button>";
            }

        ?>
	</div>

	<div class="inline-div">
		<img src="scale.png" style="width:150px">
        <br>
        <button type="button" onClick="window.location.href='../'">SoluBuddy Home</button> <!-- TODO: change to link plz-->
	</div>

	<div class="inline-div">
		<img src="solid.png" style="width:150px">
        <br>
		<button type="button" onclick="">How do I calculate this?</button>
	</div>\