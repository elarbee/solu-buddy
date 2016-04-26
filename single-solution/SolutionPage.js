/**
 * A constant to use in this form. This number represents the accepted percentage of error
 * when calculating mass or volume to add.
 * @type {number} Allowed percent error to consider correct. (0-100)
 */
var ACCEPTED_PERCENT_ERROR = 1;

$(function(){

    hideAlert();

});

function next_check(page){
    try {

        var all_clear = true;
        var msg = "";

        /* Checks the solute & solvent formula for validity.
         *   Conditions for valid formula:
         *
         *       1) No duplicate elements.
         *       2) Proper nomenclature.*/


        if(!is_valid_formula($("#solute_formula").val()) || $("#solute_formula").val() == ""){
            all_clear = false;

            /* An error message is formulated depending on which formula is correct.
             * An additive strategy is used so a combination of error messages can be displayed
             * in one message box to avoid an 'intrusive' number of message boxes popping up.*/
            msg += "Solute formula is not valid.<br/>";
        }


        //Checks other fields for emptiness.
        if($('#solvent_formula').val() == "" || $("#solute_molec_weight").val() == "" || $("#total_volume").val() == "" || $("#solution_concentration").val() == "" ||
            $("#massToAdd").val() == ""){

            msg += "Please fill in the empty fields.<br/>";
            all_clear = false;
        }


        //Checks density field for volumetric solution page.
        if(page == "VOLU" && $("#density").val() == ""){
            msg += "Please fill in the empty fields.<br/>";
            all_clear = false;
        }

        //Everything valid so far, check molecular weight.
        if(all_clear){
            var solute = string_to_compound($("#solute_formula").val());
            var calculated_molec_weight = solute.molecular_weight();
            var percent_error = calculate_error(calculated_molec_weight, parseFloat($("#solute_molec_weight").val()));

            if(percent_error > ACCEPTED_PERCENT_ERROR){
                msg += "Solute molecular weight is incorrect. Error is " + precise_round(percent_error, 2) + "%<br/>"
                all_clear = false;
            }
            /* If either formula was invalid, the message will be displayed to the user. */
        }

        if(all_clear){
            /* Otherwise, the inputs are assumed to be correct.
             *   The answer fields will be filled and the answer page and the answer page will be shown. */
            hideAlert();
            fill_fields(page);
        }
        else{
            showAlert(msg);
        }

    }catch(ex){
        showAlert(ex.message);
    }
}

//Hide the alert DIV
function hideAlert(){
    $("#alert").css("display","none");
}
//Show the alert div
function showAlert(alertMessage){
    $("#alert").css("display","block").html("<b>"+alertMessage+"</b>");
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
        showAlert(ex.message);
    }
};

function check_vol(calculated_vol){

    try {
        var percent_error = calculate_error(calculated_vol, parseFloat($('#solute_volume').val()) / 1000);

        if (percent_error > ACCEPTED_PERCENT_ERROR) {
            showAlert("Chosen volume to add is "+ calculated_vol + ". Error is: " + precise_round(percent_error, 2) + "%");
            $('#solute_volume').val("");
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
            showAlert("Chosen mass to add is "+calculated_mass+". Error is: " + precise_round(percent_error, 2) + "%");
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