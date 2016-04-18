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


        if(!is_valid_formula($("#solute_formula").val())){
            all_clear = false;

            /* An error message is formulated depending on which formula is correct.
             * An additive strategy is used so a combination of error messages can be displayed
             * in one message box to avoid an 'intrusive' number of message boxes popping up.*/
            msg += "Solute formula is not valid.<br/>";
        }
        if(!is_valid_formula($("#solvent_formula").val())){
            all_clear = false;
            msg += "Solvent formula is not valid.<br/>";
        }

        //Checks other fields for emptiness.
        if($("#solute_molec_weight").val() == "" || $("#total_volume").val() == "" || $("#solution_concentration").val() == "" ||
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
        var solvent_compound = string_to_compound($("#solvent_formula").val());
        var solute_compound = string_to_compound($("#solute_formula").val());

        /* Obtains the molecular weight for the compound using a formula in the compound object.*/
        var solute_molecular_weight = solute_compound.molecular_weight();
        /* Sets the molecular weight field to the newly calculated value.*/
        //$("#solute_molec_weight").val(solute_molecular_weight);
        /* Get total volume value from input field*/
        var total_volume = $("#total_volume").val()/1000;

        /* Get target solution concentration from the input field.*/
        var target_solution_concentration = $("#solution_concentration").val();

        var desired_mass_to_add = $("#massToAdd").val();

        var min_sigfig = count_sig_figs(desired_mass_to_add);

        /* Creates a SingleSolution object using the target concentration (Molarity), total volume of the end solution,
        * and molecular weight of the solute used.*/
        var single_solution = SingleSolution(target_solution_concentration, total_volume,
            solute_molecular_weight);


        var mass_of_solute_to_add;
        var calculated_mass_to_add;
        var percent_error;
        var new_solution;

        if(page == "SOLID"){


            calculated_mass_to_add = single_solution.solid().toPrecision(min_sigfig);

            percent_error = calculate_error(calculated_mass_to_add, desired_mass_to_add);

            if(percent_error > ACCEPTED_PERCENT_ERROR){
                showAlert("Calculated mass to add is incorrect. Error is: " + precise_round(percent_error, 2) + "%");
                $("#massToAdd").val("");
            }else{

                hideAlert();
                new_solution = new Solution(
                $("#solute_formula").val(),
                $("#solvent_formula").val(),
                total_volume,
                target_solution_concentration);

                $("#steps_div").html(new_solution.single.sol.steps_html());

                /* Shows answer page.*/
                $("#answerDiv").slideDown("slow");
            }
        }else if(page == "GRAV"){

            calculated_mass_to_add = single_solution.solid().toPrecision(min_sigfig);

            percent_error = calculate_error(calculated_mass_to_add, desired_mass_to_add);

            if(percent_error > ACCEPTED_PERCENT_ERROR){
                showAlert("Calculated mass to add is incorrect. Error is: " + precise_round(percent_error, 2) + "%");
                $("#massToAdd").val("");
            }else{

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

        }else if(page == "VOLU"){

            var density = parseFloat($("#density").val());

            calculated_mass_to_add = single_solution.liquid.volume(density).toPrecision(min_sigfig);

            percent_error = calculate_error(calculated_mass_to_add, desired_mass_to_add);

            if(percent_error > ACCEPTED_PERCENT_ERROR){
                showAlert("Calculated volume to add is incorrect. Error is: " + precise_round(percent_error, 2) + "%");
                $("#massToAdd").val("");
            }else{
                hideAlert();
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
    }catch (ex){
        showAlert(ex.message);
    }
};