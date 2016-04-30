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

function next_check(page){
    error_message = "";
    var start = window.performance.now();
    try {

        var validate = ValidatePage(page);

        if(validate.is_valid()){

            console.log("time to verify = " + window.performance.now() - start);
            error_message = "";
            hideAlert();
            fill_fields(page);

        }else{
            console.log("time to verify = " + window.performance.now() - start);
            showAlert(validate.error_message);
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
                //TODO: problem with running test cases and catching incorrect values
                if(check_mass(dilution.grav_mass(solute_compound, mass_percent).toPrecision(min_sigfig))){
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
}

function check_vol(calculated_vol){

    try {
        var solute_vol_added = parseFloat($('#solute_volume').val());
        var percent_error = calculate_error(calculated_vol, solute_vol_added);

        if(solute_vol_added > parseFloat($("#total_volume").val())){
            showAlert("Chosen volume to add should be less than your final solution volume.");
            return false;
        }else if(percent_error > ACCEPTED_PERCENT_ERROR) {
            showAlert("Chosen volume to add is "+ solute_vol_added + ". " +
                ". Error is: " + precise_round(percent_error, 2) + "%");
            return false;
        } else {
            hideAlert();
            return true;
        }
    }catch (ex){
        console.log(ex.message);
    }
}

function check_mass(calculated_mass){

    try {
        var mass_to_add = parseFloat($('#massToAdd').val());
        var percent_error = calculate_error(calculated_mass, mass_to_add);

        console.log("calc: " + calculated_mass + " to add " + mass_to_add +
            " err " + percent_error);

        if (percent_error > ACCEPTED_PERCENT_ERROR || isNaN(percent_error)) {
            showAlert("Chosen mass to add is "+mass_to_add+". " +
                ". Error is: " + precise_round(percent_error, 2) + "%");
            $('#massToAdd').val("");
            return false;
        } else {
            hideAlert();
            return true;
        }
    }catch (ex){
        console.log(ex.message);
    }
}