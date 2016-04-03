<div class="inline-div">
		<input id = "solvent_formula" type="text" placeholder="Solvent Chemical Identity"> <br>
		<input id = "solute_formula" type="text" placeholder="Solute Identity"><br>
		<input id = "solute_molec_weight" type="text" placeholder="Solute Molecular Weight"><br>
		<input id = "density" type="text" placeholder="Density of Pure Solute"><br>
		<input id = "solution_concentration" type="text" placeholder="Solution Concentration"><br>
    	<input id= "total_volume" type="text" placeholder="Solution Total Volume (milli Liters)"><br>
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
               echo "<button id=\"nextButton\" onclick="next_check('<?php echo $_GET["value"];?>')">Next</button>";
            }
        ?>
        
	</div>

	<div class="inline-div">
		<img src="pipettes.jpg" style="width:150px">
        <br>
        <button onClick="window.location.href='../'">SoluBuddy Home</button>
	</div>

	<div class="inline-div">
		<img src="solid.jpg" style="width:150px">
        <br>
		<input id="massToAdd" type="text" placeholder="Volume of Solute to Add">
        <br>
		<button onclick="">How do I calculate this?</button>
	</div>