<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by External Standards Method</h2>
</div>

<div id="divContainer">
    <div class="row">
        <div class="col-md-4 col-sm-12"><input name="solvent_formula" id="solvent_formula" type="text" placeholder="Solvent Chemical Identity"></div>
        <div class="col-md-4 col-sm-12"><input name="analyte_formula" id="analyte_formula" type="text" placeholder="Analyte Chemical Identity (i.e., Formula)"></div>
        <div class="col-md-4 col-sm-12"><input name="analyte_molec_weight" id="analyte_molec_weight" type="text" placeholder="Analyte Molecular Weight"></div>
    </div>
    <div class="row">
        <div class="col-md-4 col-sm-12"><input name="unknown" id="unknown" type="text" placeholder="Name of Unknown"></div>
        <div class="col-md-4 col-sm-12"><input name="num_standards" id="num_standards" type="text" placeholder="Number of Calibration Standards"></div>
        <div class="col-md-4 col-sm-12"><input name="total_volume_standards" id="total_volume_standards" type="text" placeholder="Total volume of flasks"></div>
    </div>
    <input type="hidden" name="solution_type" value="calibration_external">

    <div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
</div>