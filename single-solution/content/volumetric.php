<div id="content" class="container">
<div class="row">
	<div class=" col-lg-5 col-md-12 col-xs-12">
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Solvent Formula</div>
				<div class="col-lg-5 col-md-12"><input name="solvent_formula" id = "solvent_formula" type="text" placeholder="Solvent Formula"></div>
				<div class="col-lg-2"></div>
				<br>
			</div>
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Solute Formula</div>  
				<div class="col-lg-5 col-md-12"><input name="solute_formula" id = "solute_formula" type="text" placeholder="Solute Formula"></div> 
				<div class="col-lg-2"></div>
			</div>
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Solute Molecular Weight</div>  
				<div class="col-lg-5 col-md-12"><input name="solute_molec_weight" id = "solute_molec_weight" type="text" placeholder="Solute Molecular Weight"></div> 
				<div class="col-lg-2"></div>
			</div>
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Density of Pure Solute (g/mL)</div>  
				<div class="col-lg-5 col-md-12"><input name="density" id = "density" type="text" placeholder="Density of Pure Solute"></div> 
				<div class="col-lg-2"></div>
			</div>
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Solution Total Volume (mL)</div>  
				<div class="col-lg-5 col-md-12"><input name="total_volume" id = "total_volume" type="text" placeholder="Solution Total Volume (mL)"></div> 
				<div class="col-lg-2"></div>
			</div>
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Sol'n Concentration (mol/L)</div>  
				<div class="col-lg-5 col-md-12"><input name="solution_concentration" id = "solution_concentration" type="text" placeholder="Sol'n Concentration (mol/L)"></div> 
				<div class="col-lg-2"></div>
			</div>
			<div class="row">
				<div class="col-lg-5 col-md-12 regText">Volume of Solute to Add (mL))</div>  
				<div class="col-lg-5 col-md-12"><input name="massToAdd" id="massToAdd" type="text" placeholder="Volume of Solute to Add"></div> 
				<div class="col-lg-2"></div>
			</div>
		<input type="hidden" name="solution_type" value="single_liquid_vol">

	</div>
	<div class="col-lg-7 col-sm-12">
		<div class="row">
			<div class="hidden-xl col-lg-12 hidden-md hidden-sm hidden-xs vertical-align picturePadding">
				<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
				<div class="col-lg-4 vertical-align-bottom"><img src="beaker.png" style="width:150px"></div>
				<div class="col-lg-4 vertical-align-bottom"><img src="scale.png" style="width:150px"></div>
				<div class="col-lg-4 vertical-align-bottom"><img src="solid.png" style="width:150px"></div>
			</div>
			<div class="hidden-xl hidden-lg col-md-12 hidden-sm hidden-xs vertical-align picturePadding">
				<div class="col-md-2"></div>
				<div class="col-md-3 vertical-align-bottom"><img src="beaker.png" style="width:130px"></div><br>
				<div class="col-md-3 vertical-align-bottom"><img src="scale.png" style="width:130px"></div><br>
				<div class="col-md-3 vertical-align-bottom"><img src="solid.png" style="width:130px"></div>
				<div class="col-md-2"></div>
			</div>
			<div class="hidden-xl hidden-lg hidden-md col-xs-12 vertical-align picturePadding">
				<div class="col-sm-2"></div>
				<div class="col-sm-3 vertical-align-bottom"><img src="beaker.png" style="width:100px"></div><br>
				<div class="col-sm-3 vertical-align-bottom"><img src="scale.png" style="width:100px"></div><br>
				<div class="col-sm-3 vertical-align-bottom"><img src="solid.png" style="width:100px"></div>
				<div class="col-sm-2"></div>
			</div>
		</div>
		<div class="row">
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
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
			<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12"><button type="button" onclick="" class="howButton">How do I calculate this?</button></div>
		</div>
	</div>
	</div>
</div>