
<div class="stuffContainer">
    <div class="stuffContainer" style="color: white">

        <label for="knownSelect">What do you know about the stock solution?</label>
        <br>
        <select name="known" id="knownSelect">
            <option value="solute_molarity">I know the molarity of the stock solution and want to transfer a chosen volume and make a dilution.</option>
            <option value="mass_percent_grav">I know the mass percent of the solute in the stock solution and want to transfer gravimetrically.</option>
            <option value="mass_percent_vol">I know the mass percent of the solute in the stock solution & density and you want to transfer volumetrically.</option>
        </select>

    </div>

    <br>

<div class="input-div">

    Solvent Formula <input name="solvent_formula" id = "solvent_formula" type="text" placeholder="Solvent Formula"> <br>
    Solute Formula <input name="solute_formula" id = "solute_formula" type="text" placeholder="Solute Formula"><br>
    Solute Molecular Weight <input name="solute_molec_weight" id = "solute_molec_weight" type="text" placeholder="Solute Molecular Weight"><br>
    Solution Total Volume (mL) <input name="total_volume" id = "total_volume" type="text" placeholder="Solution Total Volume (mL)"><br>
    Sol'n Concentration (mol/L) <input name="solution_concentration" id = "solution_concentration" type="text" placeholder="Sol'n Concentration (mol/L)"><br>
    Mass of Solute to Add (g) <input name="massToAdd" id="massToAdd" type="text" placeholder="Mass of Solute to Add"><br>

</div>

<div class="inline-div">
    <img src="beaker.png" style="width:150px">
    <br>
    <button type="button" id="nextButton" onclick="next_check('<?php echo $_GET["value"];?>')">Next</button>
</div>

<div class="inline-div">
    <img src="scale.png" style="width:150px">
    <br>
    <button type="button" onClick="window.location.href='../'">SoluBuddy Home</button>
</div>

<div class="inline-div">
    <img src="solid.png" style="width:150px">
    <br>
    <button type="button" onclick="">How do I calculate this?</button>
</div>
</div>