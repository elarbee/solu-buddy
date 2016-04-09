
<div class="inline-div">
    <input name="solvent_formula" id = "solvent_formula" type="text" placeholder="Solvent Chemical Identity"> <br>
    <input name="solute_formula" id = "solute_formula" type="text" placeholder="Solute Chemical Identity"><br>
    <input name="solute_molec_weight" id = "solute_molec_weight" type="text" placeholder="Solute Molecular Weight"><br>
    <input name="solution_concentration" id = "solution_concentration" type="text" placeholder="Solution Concentration"><br>
    <input name="total_volume" id = "total_volume" type="text" placeholder="Solution Total Volume (milli Liters)"><br>
</div>

<div class="inline-div">
    <img src="beaker.png" style="width:150px">
    <br>
    <button type="button" id="nextButton" onclick="next_check('<?php echo $_GET["value"];?>')">Next</button>
</div>

<div class="inline-div">
    <img src="scale2.png" style="width:150px">
    <br>
    <button type="button" onClick="window.location.href='../'">SoluBuddy Home</button>
</div>

<div class="inline-div">
    <img src="solid.jpg" style="width:150px">
    <br>
    <input name="massToAdd" id="massToAdd" type="text" placeholder="Mass of Solute to Add">
    <br>
    <button type="button" onclick="">How do I calculate this?</button>
</div>