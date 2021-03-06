
/**
 * Created by root on 4/24/16.
 */

/**
 * Prints test cases to text area in test_doc.html
 * located in solu-buddy/testing/
 */



var is_correct_entry = true;
var random_shitstorm_chance = 5;
var incorrect_reasons = "";
var entry_count = 1;
var website_addr = 'http://solubuddy.us-west-2.elasticbeanstalk.com/';
// var website_addr = '/';




/**
 * Creates random entries and writes them to document.
 */
function make_random_entries(){
    var amount = document.getElementById("testing_text_area").value;

    var doc = new TestGenerator()
        .make_all_solutions(amount, true, false)
        .make_serdil(amount, true)
        .make_all_calibs(amount, true)
            // .make_cvol(amount)
        .get_doc();

    document.getElementById("testing_text_area").value = doc;
}

function random_shitstorm(min_length, max_length){
    is_correct_entry = false;
    incorrect_reasons += "shitstorm inbound\n";
    var length = random_int(min_length, max_length);
    var shit_storm = "";
    for(var i = 0; i < length; i++){
        shit_storm += String.fromCharCode(random_int(1, 255));
    }
    return shit_storm;
}

/**
 * Simulates input filling error by having a chance of returning a blank string.
 * Has a (chance/100)% chance of returning a blank.
 * @param chance Chance out of 100 to enter a blank.
 * @param real_val Value that should go in the input field.
 * @returns {*} Blank or real_val
 */
function chance_for_blank(chance, real_val){

    if(roll_dice(random_shitstorm_chance, 100)) {
        return random_shitstorm(0, 100);
    }else{
        if (roll_dice(chance, 100)) {
            incorrect_reasons += "empty field. Previous = "+real_val+"\n";
            is_correct_entry = false;
            return "";
        } else {
            is_correct_entry = is_correct_entry && true;
            return real_val;
        }
    }

}

/**
 * Simulates numerical answer incorrectness by having a chance of returning the true numeric value with a 10% error.
 * Has a (chance/100)% chance of returning an incorrect answer.
 * @param chance Chance out of 100 to enter incorrect.
 * @param real_val Numerical correct value.
 * @returns {*} real_val (correct) or real_val +/- 10% (incorrect)
 */
function chance_for_wrong(chance, real_val){
    if(roll_dice(chance, 100)){
        return make_incorrect(real_val);
    }else{
        is_correct_entry = is_correct_entry && true;
        return real_val;
    }
}

function make_incorrect(val){

    is_correct_entry = false;
    if(roll_dice(random_shitstorm_chance, 100)){
        return random_shitstorm(0, 100);
    }else{
        incorrect_reasons += "Incorrect value. Previous = " + val;
        if(roll_dice(50, 100)){
            incorrect_reasons += ". Current = "+ val*.90 +"\n";
            return val * .901;
        }else{
            incorrect_reasons += ". Current = "+ val*1.1 +"\n";
            return val * 1.101;
        }
    }

}


/**
 * Creates test entries in HTML to execute using Selenium.
 * @returns {{}}
 * @constructor
 */
function TestEntry(){

    is_correct_entry = true;
    var incorrectness_chance = 10;

    var type = '';

    var type_to_save_btn = {
        'solid' : 'saveSolutionButton',
        'grav' : 'saveSolutionButton',
        'volu' : 'saveSolutionButton',
        'serial' : 'saveButton',
        'external' : 'saveButton',
        'internal' : 'saveButton',
        'addition' : 'saveButton'
    };

    var saved_soln_table_names = {
        'solid':'singleSolidSolutionsTable',
        'grav':'singleLiquidGravSolutionsTable',
        'volu':'singleLiquidGravSolutionsTable',
        'serial':'serialSolutionsTable',
        'external':'calibrationExternalTable',
        'addition':'calibrationAdditionTable',
        'internal':'calibrationInternalTable'
    };

    var saved_soln_nav_id = {
        'single':'Single Solutions',
        'serial':'Serial Dilution Solutions',
        'calib':'Calibration Standards'
    };

    var self = {};

    self.test_entry = "";

    self.next_button = function(){
        self.component("click", "nextButton", "");
        return self;
    };

    self.click_link = function(id){
        self.test_entry +=  "<tr>\n" +
            "\t<td>click</td>\n" +
            "\t<td>link="+ id +"</td>\n" +
            "\t<td></td>\n" +
            "</tr>\n";
        return self;
    };

    self.base_component = function(action, id, val){
        self.test_entry +=  "<tr>\n" +
            "\t<td>"+action+"</td>\n" +
            "\t<td>"+ id +"</td>\n" +
            "\t<td>"+ val +"</td>\n" +
            "</tr>\n";
        return self;
    };

    self.select = function(id, val){
      self.component("select", id, val);
        return self;

    };
    self.type = function(id, val){
        self.component("type", id, val);
        return self;
    };

    self.home_nav = function(){
        self.open(website_addr);
        return self;
    };

    self.component = function(action, id, val){
        self.test_entry +=  "<tr>\n" +
            "\t<td>"+action+"</td>\n" +
            "\t<td>id="+ id +"</td>\n" +
            "\t<td>"+ val +"</td>\n" +
            "</tr>\n";
        return self;
    };

    self.click = function(id, val){
        self.component("click", id, val);
        return self;
    };

    self.open = function(id){
        self.test_entry +=  "<tr>\n" +
            "\t<td>open</td>\n" +
            "\t<td>"+ id +"</td>\n" +
            "\t<td></td>\n" +
            "</tr>\n";
        return self;
    };

    self.click_and_wait = function(id, val){
        self.component("clickAndWait", id, val);
        return self;
    };

    self.wait_for_not_text = function(id, text){
        self.component("waitForNotText", id, text);
        return self;
    };

    /**
     * Waits for (id) component to NOT have the text, "Danger! etc.." As this is default,
     * absence of the text indicates a problem
     * @param id HTML element ID of the alert to check for.
     */
    self.wait_for_alert = function(id){
        self.component("assertVisible", id, "");
        return self;
    };


    self.wait_for_non_alert = function(id){
        self.component("assertNotVisible", id, "");
        return self;
    };


    self.save = function(){
        self.click(type_to_save_btn[type], '');
        return self;
    };

    /**
     *
     * @param soln_class Possible Values: single, serial, calib
     * @param soln_type Possible values: solid, grav, volu, serial,
     *          external, addition, internal
     */
    self.verify_saved = function(){
        self.base_component('clickAndWait', 'link=Saved Solutions', '')
            .component('assertNotVisible', type_to_save_btn[type], '')
            //simple verify
            .base_component('assertVisible', 'link=Single Solutions', '');
        //advanced verify.. need to check if solution is there
            //.click_link(saved_soln_nav_id[soln_class], saved_soln_table_names[soln_type]);
            return self;
    };

    /* Variables used by all entries */
    self.single = {};

    self.dilution = {};

    self.calibration_standard = {};

    self.single.solid_nav = function(){
        self.home_nav()
            .click_and_wait("singleButton", "");

        return self;
    };

    self.single.core = function(vol, soln_conc, solute_formula){
        var solvent_name = chance_for_blank(incorrectness_chance, random_word(1,20));

        self.type("solvent_formula", solvent_name)
          .type("solute_formula", solute_formula)
          .type("solution_concentration", soln_conc)
          .type("total_volume", vol);
        return self;
    };

    self.single.grav_nav = function(){
        self.home_nav()
            .select("singleSelect", "label=It is a pure (i.e., neat) liquid.")
            .click_and_wait("liquidButton", "");
        return self;
    };

    self.single.vol_nav = function(){

        self.home_nav()
            .select("singleSelect", "label=It is a pure (i.e., neat) liquid.")
            .select("liquidSelect", "label=I know the solute molecular mass and density, and I will do a volumetric transfer.")
            .click_and_wait("liquidButton", "");
        return self;
    };

    self.single.conc_nav = function(){
        self.home_nav()
            .select("singleSelect","label=It is a concentrated stock solution (like conc. HCL or NaOH).")
            .click_and_wait("singleButton", "");
        return self;
    };

    self.single.make_solid = function(){
        type = 'solid';
        var vol = chance_for_blank(incorrectness_chance, random_double(50, 2000));
        var solute_formula = random_formula(1, 5);
        var solute = string_to_compound(solute_formula);
        var soln_conc = chance_for_blank(incorrectness_chance, random_double(.00001, 20));
        var mass = chance_for_wrong(incorrectness_chance, new SingleSolution(soln_conc, vol/1000, solute.molecular_weight()).solid());
        var mweight = chance_for_blank(incorrectness_chance, solute.molecular_weight());

        self.single.solid_nav()
            .single.core(vol, soln_conc, solute_formula)
            .type("solute_molec_weight", mweight)
            .type("massToAdd", mass);

        return self;
    };

    self.single.make_grav = function(){
        type = 'grav';
        var vol = chance_for_blank(incorrectness_chance, random_double(50, 2000));
        var solute_formula = random_formula(1, 5);
        var solute = string_to_compound(solute_formula);
        var soln_conc = chance_for_blank(incorrectness_chance, random_double(.00001, 20));
        var mass = chance_for_wrong(incorrectness_chance, new SingleSolution(soln_conc, vol/1000, solute.molecular_weight()).solid());
        var mweight = chance_for_blank(incorrectness_chance, solute.molecular_weight());

        self.single.grav_nav()
            .single.core(vol, soln_conc, solute_formula)
            .type("solute_molec_weight", mweight)
            .type("massToAdd", mass);

        return self;
    };

    self.single.make_vol = function(){
        type = 'volu';
        var vol = chance_for_blank(incorrectness_chance, random_double(1000, 10000));
        var soln_conc = chance_for_blank(incorrectness_chance, random_double(.00001, 20));
        var solute_formula = random_formula(1, 5); //kept low for higher chance to be correct
        var solute = string_to_compound(solute_formula);
        var density = chance_for_blank(incorrectness_chance,random_double(.001, 20));
        var volume = chance_for_wrong(incorrectness_chance, new SingleSolution(soln_conc, vol/1000, solute.molecular_weight()).liquid.volume(density));
        var mweight = chance_for_blank(incorrectness_chance, solute.molecular_weight());

        is_correct_entry = is_correct_entry && (volume < vol);

        self.single.vol_nav()
            .single.core(vol, soln_conc, solute_formula)
            .type("solute_molec_weight", mweight)
            .type("solute_volume", volume)
            .type("density", density);

        return self;
    };

    self.single.make_cmol = function(){
        type = 'cmol';
        var vol = chance_for_blank(incorrectness_chance, random_double(1000, 10000));
        var soln_conc = chance_for_blank(incorrectness_chance, random_double(.00001, 20));
        var solute_formula = random_formula(1, 5);
        var solute_concentration = chance_for_blank(incorrectness_chance, random_double(.01, 20));
        var volume = chance_for_wrong(incorrectness_chance, new SingleDilution(soln_conc, vol/1000).solute_volume(solute_concentration));

        is_correct_entry = is_correct_entry && (volume < vol);

        self.single.conc_nav()
            .single.core(vol, soln_conc, solute_formula)
            .type("solute_concentration", solute_concentration)
            .type("solute_volume", volume);

        return self;
    };

    self.single.make_cgrav = function(){
        type = 'cgrav';
        var vol = chance_for_blank(incorrectness_chance, random_double(50, 2000));
        var soln_conc = chance_for_blank(incorrectness_chance, random_double(.00001, 20));
        var solute_formula = random_formula(1, 5);
        var solute = string_to_compound(solute_formula);
        var massp = chance_for_blank(incorrectness_chance, random_double(0.1, 100));
        var mass = chance_for_wrong(incorrectness_chance, new SingleDilution(soln_conc, vol/1000).grav_mass(solute, massp));

        self.single.conc_nav()
            .click("knownSelect", "")
            .select("knownSelect", "label=I know the mass percent of the solute in the stock solution and want to transfer gravimetrically.")
            .single.core(vol, soln_conc, solute_formula)
            .type("massToAdd", mass)
            .type("solute_percent_mass", massp);

        return self;
    };

    self.single.make_cvol = function(){
        type = 'cvol';
        var vol = chance_for_blank(incorrectness_chance, random_double(1000, 10000));
        var soln_conc = chance_for_blank(incorrectness_chance, random_double(.00001, 20));
        var solute_formula = random_formula(1, 5);
        var solute = string_to_compound(solute_formula);
        var massp = chance_for_blank(incorrectness_chance, random_double(0.1, 100));
        var density = chance_for_blank(incorrectness_chance, random_double(.001, 20));
        var volume = chance_for_wrong(incorrectness_chance, new SingleDilution(soln_conc, vol/1000).vol_transfer(solute, massp, density));

        is_correct_entry = is_correct_entry && (volume < vol);


        self.single.conc_nav()
            .click("knownSelect", "")
            .select("knownSelect", "label=I know the mass percent of the solute in the stock solution &amp; density and you want to transfer volumetrically.")
            .single.core(vol, soln_conc, solute_formula)
            .type("solute_percent_mass", massp)
            .type("density", density)
            .type("solute_volume", volume);

        return self;
    };

    self.dilution.ser_dil_nav = function(){
        self.home_nav().open(website_addr + "serial-dilution/serial.php");
        return self;

    };

    self.dilution.make_serial_dilution = function(){
        type = 'serial';
        var flask_size = chance_for_blank(incorrectness_chance, random_double(50, 1500));
        var molarity_solutions = chance_for_blank(incorrectness_chance, random_double(.001, 20));
        var solvent_chemical = chance_for_blank(incorrectness_chance, random_word(1, 20));
        var solute_chemical =chance_for_blank(incorrectness_chance, random_word(1, 20));
        var num_dilutions = chance_for_blank(incorrectness_chance, random_int(2, 25));
        var vol_transferred = chance_for_blank(incorrectness_chance, random_double(50, flask_size));

        is_correct_entry = is_correct_entry && !(vol_transferred > flask_size);

        self.dilution.ser_dil_nav()
            .type("solventChemID", solvent_chemical)
            .type("soluteChemID", solute_chemical)
            .type("numDilutions", num_dilutions)
            .type("molaritySolution", molarity_solutions)
            .type("flasksVolume", flask_size)
            .type("volumeTransferred", vol_transferred);

        return self;
    };

    self.calibration_standard.external_nav = function(){
        self.home_nav()
            .click_and_wait("calibrationButton", "");
        return self;
    };
    self.calibration_standard.internal_nav = function(){
        self.home_nav()
            .select("calibrationSelect", "label=Internal Standard Method")
            .click_and_wait("calibrationButton", "");
       return self;
    };
    self.calibration_standard.addition_nav = function(){
        self.home_nav()
            .select("calibrationSelect", "label=Standard Addition Method")
            .click_and_wait("calibrationButton", "");
        return self;
    };

    self.calibration_standard.make_ext = function(){
        type = 'external';
        var solute_formula = random_formula(1, 5);
        var solute = string_to_compound(solute_formula);
        var analyte_molarity = chance_for_blank(incorrectness_chance, random_double(.001,20));
        var num_stand = chance_for_blank(incorrectness_chance, random_int(2, 21));
        var mweight = chance_for_blank(incorrectness_chance, solute.molecular_weight());
        var solvent_name = chance_for_blank(incorrectness_chance, random_word(1,20));
        var vol = chance_for_blank(incorrectness_chance, random_double(50, 2000));

        // is_correct_entry = is_correct_entry && !Number.isInteger(vol);

        self.calibration_standard.external_nav()
            .type("solvent_formula", solvent_name)
            .type("analyte_formula", solute_formula)
            .type("analyte_molec_weight", mweight)
            .type("analyte_molarity", analyte_molarity)
            .type("num_standards", num_stand)
            .type("total_volume_standards", vol);

        return self;

    };
    self.calibration_standard.make_intrn = function(){
        type = 'internal';
        var analyte_formula = random_formula(1, 5);
        var analyte_molarity = chance_for_blank(incorrectness_chance, random_double(.001,20));
        var internal_molarity = chance_for_blank(incorrectness_chance, random_double(.001,20));
        var num_stand = chance_for_blank(incorrectness_chance, random_int(2, 21));
        var internal_formula = chance_for_blank(incorrectness_chance, random_word(1,20));
        var vol = chance_for_blank(incorrectness_chance, random_double(50, 2000));


        self.calibration_standard.internal_nav()
            .type("analyte_formula", analyte_formula)
            .type("analyte_molarity", analyte_molarity)
            .type("internal_formula", internal_formula)
            .type("internal_molarity", internal_molarity)
            .type("num_standards", num_stand)
            .type("total_volume_standards", vol);

        return self;
    };
    self.calibration_standard.make_addition = function(){

        type = 'addition';
        var analyte_formula = random_formula(1, 5);
        var analyte_molarity = chance_for_blank(incorrectness_chance, random_double(.001,20));
        var unknown_name = chance_for_blank(incorrectness_chance, random_word(1,20));
        var num_stand = chance_for_blank(incorrectness_chance, random_int(2, 21));
        var vol = chance_for_blank(incorrectness_chance, random_double(1000, 10000));
        var unknown_volume = chance_for_blank(incorrectness_chance, random_double(50, 2000));

        is_correct_entry = is_correct_entry && (unknown_volume < vol);

        if(!is_correct_entry && !(unknown_volume >= vol)){
            console.log('vol = ' + vol + ' unknown vol = ' + unknown_volume);
        }

        self.calibration_standard.addition_nav()
            .type("analyte_formula", analyte_formula)
            .type("analyte_molarity", analyte_molarity)
            .type("num_standards", num_stand)
            .type("unknown", unknown_name)
            .type("unknown_volume", unknown_volume)
            .type("total_volume_standards", vol);

        return self;

    };

    self.check_for_error = function(){
        self.next_button();

        var echo_msg = "Test # ".concat(entry_count+"").concat(". Expecting ")
            .concat((is_correct_entry)? "correct." : "incorrect.");
        self.component("echo", "", echo_msg);

        if(is_correct_entry){
            self.wait_for_non_alert("myAlert");
        }else{
            console.log("made incorrect with chance = 0. current type = " + type);
            self.component("echo", "", incorrect_reasons);
            self.wait_for_alert("myAlert");
        }

        return self;
    };
    self.end_and_save = function(){
        self.check_for_error();

        entry_count++;

        if(is_correct_entry){
            self.save().verify_saved();
        }

        incorrect_reasons = "";
        return self.test_entry;
    };

    self.end_no_save = function(){
        self.check_for_error();

        entry_count++;

        incorrect_reasons = "";
        return self.test_entry;
    };

    return self;
}

/**
 * Generates Full test document to run using Selenium. Always end with .get_doc() when you are finished
 * filling the document. This will add the necessary footer and return the String doc.
 *
 * Example use:
 *
 * var doc = new TestGenerator().make_all_solutions(10).make_ext(5).make_solid(100);
 *
 *
 * @returns {{}}
 * @constructor
 */
function TestGenerator(){

    var self = {};
    var header = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" +
        "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">" +
        "<html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\" lang=\"en\">" +
        "<head profile=\"http://selenium-ide.openqa.org/profiles/test-case\">" +
        "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />" +
        "<link rel=\"selenium.base\" href=\"http://localhost:8000/serial-dilution/serial.php\" />" +
        "<title>SerialDilutionTest1</title>" +
        "</head>" +
        "<body>" +
        "<table cellpadding=\"1\" cellspacing=\"1\" border=\"1\">" +
        "<thead>" +
        "<tr><td rowspan=\"1\" colspan=\"3\">SerialDilutionTest1</td></tr>" +
        "</thead>";

    var footer =
        "</tbody></table>"+
        "</body>"+
        "</html>";

    self.doc = header;

    self.wait_for_element = function(id){
        self.doc += "<tr>\n" +
            "\t<td>verifyElementPresent</td>\n" +
            "\t<td>"+id+"</td>\n" +
            "\t<td></td>\n" +
            "</tr>\n";

        return self;
    };

    self.make_solid = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().single.make_solid();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }        }
        return self;

    };

    self.make_grav = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().single.make_grav();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }        }
        return self;

    };

    self.make_vol = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().single.make_vol();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }        }
        return self;

    };

    self.make_cmol = function(qty, save){
        for(var i = 0; i < qty; i++){
            self.doc += new TestEntry().single.make_cmol().end_no_save();
        }
        return self;

    };

    self.make_cgrav = function(qty, save){
        for(var i = 0; i < qty; i++){
            self.doc += new TestEntry().single.make_cgrav().end_no_save();
        }
        return self;

    };
    self.make_cvol = function(qty, save){
        for(var i = 0; i < qty; i++){
            self.doc += new TestEntry().single.make_cvol().end_no_save();
        }
        return self;

    };

    self.make_serdil = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().dilution.make_serial_dilution();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }        }
        return self;

    };

    self.make_ext = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().calibration_standard.make_ext();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }        }
        return self;
    };

    self.make_intrn = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().calibration_standard.make_intrn();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }
        }
        return self;

    };

    self.make_addition = function(qty, save){
        for(var i = 0; i < qty; i++){
            var temp = new TestEntry().calibration_standard.make_addition();
            if(save){
                self.doc += temp.end_and_save();
            }else{
                self.doc += temp.end_no_save();
            }
        }
        return self;

    };

    self.make_all_solutions = function(qty, save, savable_only){

        for(var i = 0; i < qty; i++){
            self.make_solid(1, save);
            self.make_grav(1, save);
            self.make_vol(1, save);

            if(!savable_only){
                self.make_cmol(1, false);
                self.make_cgrav(1, false);
                self.make_cvol(1, false);
            }
        }

        return self;
    };

    self.make_all_calibs = function(qty, save){
        for(var i = 0; i < qty; i++) {
            self.make_ext(1, save);
            self.make_intrn(1, save);
            self.make_addition(1, save);
        }

        return self;
    };

    self.get_doc = function(){
        return self.doc + footer;
    };

    return self;
}

