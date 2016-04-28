<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by External Standards Method</h2>
</div>

<div class="container" id="solutionForm">
    <div class="row">
        <div class="col-md-4 col-sm-12"><p class="regText">Enter a solvent chemical</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter an analyte name</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the analyte's weight (g)</p></div>
    </div>

    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="solvent_formula" name="solvent_formula" type="text" placeholder="Solvent Chemical Identity"></div>
        <div  class="col-md-4 col-sm-12"><input id="analyte_formula" name="analyte_formula" type="text" placeholder="Analyte Chemical Identity (i.e., Formula)"></div>
        <div  class="col-md-4 col-sm-12"><input id="analyte_molec_weight" name="analyte_molec_weight" type="text" placeholder="Analyte Molecular Weight"></div>
    </div>

    <div class="row">
        <div class="col-md-4 col-sm-12"><p class="regText">Enter a molarity for your analyte (M)</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a number of calibration standards</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a total volume for your flasks (mL)</p></div>
    </div>

    <div class="row">
        <div   class="col-md-4 col-sm-12"><input id="analyte_molarity" name="analyte_molarity" type="text" placeholder="Molarity of Analyte"></div>
        <div  class="col-md-4 col-sm-12"><input  id="num_standards" name="num_standards" type="text" placeholder="Number of Calibration Standards"></div>
        <div   class="col-md-4 col-sm-12"><input id="total_volume_standards" name="total_volume_standards" type="text" placeholder="Total volume of flasks"></div>
    </div>
    <input type="hidden" name="solution_type" value="calibration_external">
    <div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
</div>