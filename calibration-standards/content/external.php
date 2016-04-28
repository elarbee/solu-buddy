<!-- Solution Input page -->
<div id="headerDiv">
    <h2>Making Calibration Standards by External Standards Method</h2>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-4 col-sm-12"><p class="regText">Enter a solvent chemical</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter an analyte name</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter the analyte's weight (g)</p></div>
    </div>

    <div class="row">
        <div class="col-md-4 col-sm-12"><input id="solvent_formula" type="text" placeholder="Solvent Chemical Identity"></div>
        <div  class="col-md-4 col-sm-12"><input id="analyte_formula" type="text" placeholder="Analyte Chemical Identity (i.e., Formula)"></div>
        <div  class="col-md-4 col-sm-12"><input id="analyte_molec_weight" type="text" placeholder="Analyte Molecular Weight"></div>
    </div>

    <div class="row">
        <div class="col-md-4 col-sm-12"><p class="regText">Enter a molarity for your analyte (M)</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a number of calibration standards</p></div>
        <div class="col-md-4 hidden-sm hidden-xs"><p class="regText">Enter a total volume for your flasks (mL)</p></div>
    </div>

    <div class="row">
        <div   class="col-md-4 col-sm-12"><input id="analyte_molarity" type="text" placeholder="Molarity of Analyte"></div>
        <div  class="col-md-4 col-sm-12"><input  id="num_standards" type="text" placeholder="Number of Calibration Standards"></div>
        <div   class="col-md-4 col-sm-12"><input id="total_volume_standards" type="text" placeholder="Total volume of flasks"></div>
    </div>

    <div class="col-md-12"><button id="nextButton" class="nextButton">Next</button></div>
</div>