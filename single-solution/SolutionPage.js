var ACCEPTED_PERCENT_ERROR = 1;

function next_check(page){
    try {

        /* Checks the solute & solvent formula for validity.
         *   Conditions for valid formula:
         *
         *       1) No duplicate elements.
         *       2) Proper nomenclature.*/
        var valid_solute = is_valid_formula($("#solute_formula").val());
        var valid_solvent = is_valid_formula($("#solvent_formula").val());

        var msg = "";

        /* An error message is formulated depending on which formula is correct.
         * An additive strategy is used so a combination of error messages can be displayed
         * in one message box to avoid an 'intrusive' number of message boxes popping up.*/
        if(!valid_solute) {
            //Tells the user the solute formula is incorrect.
            msg += "Solute formula is not valid.\n";
        }
        if(!valid_solvent){
            //Tells the user the solvent formula is invalid.
            msg += "Solvent formula is not valid.\n";
        }

        /* If either formula was invalid, the message will be displayed to the user. */
        if(!valid_solute || !valid_solvent){
            window.alert(msg);
        }else{
            /* Otherwise, the inputs are assumed to be correct.
             *   The answer fields will be filled and the answer page and the answer page will be shown. */
            fill_fields(page);

            /* Shows answer page.*/
            $("#answerDiv").slideDown("slow");
        }

    }catch(ex){
        window.alert(ex.message);
    }
}

function fill_fields(page){
    try {


        /* Collects variables from input fields and creates other necessary variables using the input variables */
        var solvent_compound = string_to_compound($("#solvent_formula").val());
        var solute_compound = string_to_compound($("#solute_formula").val());

        /* Obtains the molecular weight for the compound using a formula in the compound object.*/
        var solute_molecular_weight = solute_compound.molecular_weight();
        /* Sets the molecular weight field to the newly calculated value.*/
        $("#solute_molec_weight").val(solute_molecular_weight);
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
                window.alert("Calculated mass to add is: " + calculated_mass_to_add + ". Error is: " + precise_round(percent_error, 2) + "%");
                $("#massToAdd").val("");
            }else{
                window.alert("Correct!");
                new_solution = new Solution(
                    $("#solute_formula").val(),
                    $("#solvent_formula").val(),
                    total_volume,
                    target_solution_concentration);

                $("#steps_div").html(new_solution.single.sol.steps_html());
            }
            //$("#massToAdd").val(mass_of_solute_to_add + "g"); // mass presented as 'grams'



        }else if(page == "GRAV"){

            calculated_mass_to_add = single_solution.solid().toPrecision(min_sigfig);

            percent_error = calculate_error(calculated_mass_to_add, desired_mass_to_add);

            if(percent_error > ACCEPTED_PERCENT_ERROR){
                window.alert("Calculated mass to add is: " + calculated_mass_to_add + ". Error is: " + precise_round(percent_error, 2) + "%");
                $("#massToAdd").val("");
            }else{
                window.alert("Correct!");

                new_solution = new Solution(
                    $("#solute_formula").val(),
                    $("#solvent_formula").val(),
                    total_volume,
                    target_solution_concentration);

                $("#steps_div").html(new_solution.single.gravimetric.steps_html());
            }

            //$("#massToAdd").val(mass_of_solute_to_add + "g"); // mass presented as 'grams'


        }else if(page == "VOLU"){

            var density = parseFloat($("#density").val());

            calculated_mass_to_add = single_solution.liquid.volume(density).toPrecision(min_sigfig);

            percent_error = calculate_error(calculated_mass_to_add, desired_mass_to_add);

            if(percent_error > ACCEPTED_PERCENT_ERROR){
                window.alert("Calculated volume to add is: " + calculated_mass_to_add + ". Error is: " + precise_round(percent_error, 2) + "%");
                $("#massToAdd").val("");
            }else{
                window.alert("Correct!");

                new_solution = new Solution(
                    $("#solute_formula").val(),
                    $("#solvent_formula").val(),
                    total_volume,
                    target_solution_concentration);

                $("#steps_div").html(new_solution.single.volumetric.steps_html(density));
            }

            //$("#massToAdd").val(mass_of_solute_to_add + " mL"); //answer presented in mL


        }

        

    }catch (ex){
        window.alert(ex.message);
    }
};