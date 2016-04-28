/**
 * A constant to use in this form. This number represents the accepted percentage of error
 * when calculating mass or volume to add.
 * @type {number} Allowed percent error to consider correct. (0-100)
 */
var ACCEPTED_PERCENT_ERROR = 1;
var error_message = "";

$(function(){

    hideAlert();


});

function verify_volumetric(){
    if(!valid_number_field("solute_volume")){
        return false;
    }

    if(!valid_number_field("density")){
        return false;
    }

    if($('#knownSelect').val() != 'CONC_VOL'){
        if(!valid_number_field("solute_molec_weight")){
            return false;
        }
    }



    return true;
}

function verify_concentrated(){
    if($('#knownSelect').val() == 'CONC_MOL'){
        if(!valid_number_field("solute_volume")){
            return false;
        }
        if(!valid_number_field("solute_concentration")){
            return false;
        }
        return true;
    }
    else if($('#knownSelect').val() == 'CONC_VOL'){
        if(verify_volumetric()){
            if(!valid_number_field("solute_percent_mass") || $("#solute_percent_mass").val() > 100){
                return false;
            }
        }
        else{
            return false;
        }
        return true;
    }else if($('#knownSelect').val() == 'CONC_GRAV'){
        if(!valid_number_field("solute_percent_mass") || $("#solute_percent_mass").val() > 100){
            return false;
        }
        if(!valid_number_field("massToAdd")){
            return false;
        }
        return true;
    }else{
        return true;
    }
}

function valid_number_field(id){
    try {
        var val = $("#"+id+"").val();

        if(val == ""){
            error_message += "Please fill in missing fields.\n";
            console.log("field: " + id + " value: " + val + " is empty.");
            return false;
        }
        if(!/^-?\d+\.?\d*$/g.test(val)){
            error_message += "Must enter correct number.\n";
            console.log("field: " + id + " value: " + val + " failed regex test.");
            return false;
        }
        if (val <= 0){
            error_message += "Field cannot be less than or equal to 0.\n";
            console.log("field: " + id + " value: " + val + " less than or equal to 0");
            return false;
        }

        return true;

    }catch (ex){
        console.log("field: " + id + " value: " + val);
        showAlert(ex.message);
    }
}

function verify_solid(){

    if(!valid_number_field("massToAdd")){
        return false;
    }

    if(!valid_number_field("solute_molec_weight")){
        return false;
    }

    return true;
}

function no_empty_fields(page){


    var solvent_formula_val = $("#solvent_formula").val();
    if(solvent_formula_val == ""){
        error_message += "Must enter a solvent name.\n";
        return false;
    }
    else if(!/^[a-zA-Z\d*]*$/.test(solvent_formula_val)){
        error_message += "Solvent formula must contain only letters and numbers.\n";
        return false;
    }

    var solute_val = $("#solute_formula").val();
    if(solute_val == ""){
        error_message += "Must enter a solute.\n";
        return false;
    }
    if(!valid_number_field("total_volume")){
        return false;
    }

    if(!valid_number_field("solution_concentration")){
        return false;
    }

    if(page == "SOLID" || page == "GRAV"){
        if(!verify_solid()){
            return false;
        }
    }
    else if(page == "VOLU"){
        if(!verify_volumetric()){
            return false;
        }

    }else if(page == "CONC"){
        if(!verify_concentrated()){
            return false;
        }
    }
    return true;

}

function check_accuracy(){
    if(!is_valid_formula($("#solute_formula").val())){
        error_message += "Must enter a valid solute formula.\n";
        showAlert(error_message);
        return false;
    }
    if($("#solute_formula") != undefined){
        var solute = string_to_compound($("#solute_formula").val());
        var error = calculate_error(solute.molecular_weight(), $("#solute_molec_weight").val());
        if(error > ACCEPTED_PERCENT_ERROR){
            error_message += "Molecular weight is incorrect with an error of " + error + "\n";
            showAlert(error_message);
            return false;
        }
    }


    return true;


}

function next_check(page){
    error_message = "";
    var start = window.performance.now();
    try {

        if(no_empty_fields(page) && check_accuracy()){
            /* Otherwise, the inputs are assumed to be correct.
             *   The answer fields will be filled and the answer page and the answer page will be shown. */
            var time = window.performance.now() - start;
            console.log("Time to verify input: " + time);
            error_message = "";
            hideAlert();
            fill_fields(page);
        }
        else{
            var time = window.performance.now() - start;
            console.log("Time to verify input: " + time);
            showAlert(error_message);
        }

    }catch(ex){
        showAlert(ex.message);
    }
}

//Hide the alert DIV
function hideAlert(){
    $("#myAlert").css("display","none");
}
//Show the alert div
function showAlert(alertMessage){
    $("#myAlert").css("display","block").html("<b>"+alertMessage+"</b>");
}

function fill_fields(page){
    try {

        /* Collects variables from input fields and creates other necessary variables using the input variables */
        var solute_compound = string_to_compound($("#solute_formula").val());

        /* Obtains the molecular weight for the compound using a formula in the compound object.*/
        var solute_molecular_weight = solute_compound.molecular_weight();
        /* Sets the molecular weight field to the newly calculated value.*/
        //$("#solute_molec_weight").val(solute_molecular_weight);
        /* Get total volume value from input field*/
        var total_volume = parseFloat($("#total_volume").val())/1000;

        /* Get target solution concentration from the input field.*/
        var target_solution_concentration = $("#solution_concentration").val();

        var user_mass_to_add = parseFloat($('#massToAdd').val());

        var min_sigfig = count_sig_figs(user_mass_to_add);

        /* Creates a SingleSolution object using the target concentration (Molarity), total volume of the end solution,
        * and molecular weight of the solute used.*/
        var single_solution = SingleSolution(target_solution_concentration, total_volume,
            solute_molecular_weight);

        var new_solution;

        if(page == "SOLID"){

            if(check_mass(single_solution.solid().toPrecision(min_sigfig))){
                new_solution = new Solution(
                    $("#solute_formula").val(),
                    $("#solvent_formula").val(),
                    total_volume,
                    target_solution_concentration);

                $("#steps_div").html(new_solution.single.sol.steps_html());

                /* Shows answer page.*/
                $("#answerDiv").slideDown("slow");
            }
        }
        else if(page == "GRAV"){

            if(check_mass(single_solution.solid().toPrecision(min_sigfig))){
                hideAlert();
                new_solution = new Solution(
                    $("#solute_formula").val(),
                    $("#solvent_formula").val(),
                    total_volume,
                    target_solution_concentration);

                $("#steps_div").html(new_solution.single.gravimetric.steps_html());

                /* Shows answer page.*/
                $("#answerDiv").slideDown("slow");
            }

        }
        else if(page == "VOLU"){

            var density = parseFloat($("#density").val());

            min_sigfig = count_sig_figs(parseFloat($('#solute_volume').val()) / 1000);

            if(check_vol(single_solution.liquid.volume(density).toPrecision(min_sigfig))){
                new_solution = new Solution(
                    $("#solute_formula").val(),
                    $("#solvent_formula").val(),
                    total_volume,
                    target_solution_concentration);

                $("#steps_div").html(new_solution.single.volumetric.steps_html(density));

                /* Shows answer page.*/
                $("#answerDiv").slideDown("slow");
            }
            
        }
        else if(page == 'CONC'){

            var solute_molarity = parseFloat($('#solute_concentration').val());
            var mass_percent = parseFloat($('#solute_percent_mass').val());
            var density = parseFloat($('#density').val());

            var dilution = new SingleDilution(target_solution_concentration, total_volume);

            var user_vol_to_add = parseFloat($('#solute_volume').val()) / 1000; //convert to liters

            /**
             * Concentrated molarity
             */
            if($('#knownSelect').val() == 'CONC_MOL'){

                min_sigfig = count_sig_figs(user_vol_to_add);
                if(check_vol(dilution.solute_volume(solute_molarity).toPrecision(min_sigfig))) {
                    new_solution = new Solution(
                        $("#solute_formula").val(),
                        $("#solvent_formula").val(),
                        total_volume,
                        target_solution_concentration);

                    $("#steps_div").html(new_solution.concentrated.steps_html_mol(solute_molarity));

                    /* Shows answer page.*/
                    $("#answerDiv").slideDown("slow");
                }

            }

            /**
             * Concentrated Grav
             */
            else if($('#knownSelect').val() == 'CONC_GRAV'){

                min_sigfig = count_sig_figs(user_mass_to_add);

                if(check_mass(dilution.grav_mass(solute_compound, solute_molarity).toPrecision(min_sigfig))){
                    new_solution = new Solution(
                        $("#solute_formula").val(),
                        $("#solvent_formula").val(),
                        total_volume,
                        target_solution_concentration);

                    $("#steps_div").html(new_solution.concentrated.steps_html_grav(mass_percent));

                    /* Shows answer page.*/
                    $("#answerDiv").slideDown("slow");
                }
            }
            /**
             * Concentrated Vol
             */
            else if($('#knownSelect').val() == 'CONC_VOL'){


                min_sigfig = count_sig_figs(user_vol_to_add);
                if(check_vol(dilution.vol_transfer(solute_compound, mass_percent, density).toPrecision(min_sigfig))){
                    new_solution = new Solution(
                        $("#solute_formula").val(),
                        $("#solvent_formula").val(),
                        total_volume,
                        target_solution_concentration);

                    $("#steps_div").html(new_solution.concentrated.steps_html_vol(mass_percent, density));

                    /* Shows answer page.*/
                    $("#answerDiv").slideDown("slow");
                }
            }
            
        }
    }catch (ex){
        console.trace();
        showAlert(ex.message);
    }
};

function check_vol(calculated_vol){

    try {
        var solute_vol_added = parseFloat($('#solute_volume').val());
        var percent_error = calculate_error(calculated_vol, solute_vol_added);

        if(solute_vol_added > parseFloat($("#total_volume").val())){
            showAlert("Chosen volume to add should be less than your final solution volume.");
            return false;
        }else if(percent_error > ACCEPTED_PERCENT_ERROR) {
            showAlert("Chosen volume to add is "+ calculated_vol + ". " +
                "Calculated volume is " + calculated_vol + ". Error is: " + precise_round(percent_error, 2) + "%");
            return false;
        } else {
            hideAlert();
            return true;
        }
    }catch (ex){
        showAlert(ex.message);
    }
};

function check_mass(calculated_mass){

    try {
        var percent_error = calculate_error(calculated_mass, parseFloat($('#massToAdd').val()));

        if (percent_error > ACCEPTED_PERCENT_ERROR) {
            showAlert("Chosen mass to add is "+calculated_mass+". " +
                "Calculated mass is " + calculated_mass + ". Error is: " + precise_round(percent_error, 2) + "%");
            $('#massToAdd').val("");
            return false;
        } else {
            hideAlert();
            return true;
        }
    }catch (ex){
        showAlert(ex.message);
    }
};