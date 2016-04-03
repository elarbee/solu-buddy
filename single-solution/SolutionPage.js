$(function(){
   
    var totalVolume = $("#totalVolume").clone();

    /**
     * 'Next' button control function. This function is called when the 'Next' button is pressed
     */
    $("#nextButton").click(function(){
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
                fill_fields();

                /* Shows answer page.*/
                $("#answerDiv").show();
                $("#headerDiv").parent().hide();
            }

        }catch(ex){
            window.alert(ex.message);
        }
    });
    
    //Back arrow for answer page
    $("#arrowContainer img").click(function(){
        $("#answerDiv").hide();
        $("#headerDiv").parent().show();
    });
    
});


function fill_fields(){
    try {
        /* Collects variables from input fields and creates other necessary variables using the input variables */
        var solvent_compound = string_to_compound($("#solvent_formula").val());
        var solute_compound = string_to_compound($("#solute_formula").val());

        /* Obtains the molecular weight for the compound using a formula in the compound object.*/
        var solute_molecular_weight = solute_compound.molecular_weight();
        /* Sets the molecular weight field to the newly calculated value.*/
        $("#solute_molec_weight").val(solute_molecular_weight);
        /* Get total volume value from input field*/
        var total_volume = $("#totalVolume").val();
        /* Get target solution concentration from the input field.*/
        var target_solution_concentration = $("#solution_concentration").val();

        /* Creates a SingleSolution object using the target concentration (Molarity), total volume of the end solution,
        * and molecular weight of the solute used.*/
        var single_solution = SingleSolution(target_solution_concentration, total_volume,
            solute_molecular_weight);

        /* Calculates the mass of solute to add to the solvent using the 'solid()' function within SingleSolution object.*/
        var mass_of_solute_to_add = single_solution.solid();

        /* Gets molarity variable from the solution concentration input field. (same as target concentration)*/
        var molarity = $("#solution_concentration").val();

        /**
         * Fills in the answer page using values collected and calculated above.
         */
        $("#massToAdd").val(mass_of_solute_to_add + "g"); // mass presented as 'grams'

        $("#molarity_span1").html(molarity);
        $("#molarity_span2").html(molarity);

        $("#solvent_span1").html(solvent_compound.formula());
        $("#solvent_span2").html(solvent_compound.formula());
        $("#solvent_span3").html(solvent_compound.formula());

        $("#solute_span1").html(solute_compound.formula());
        $("#solute_span2").html(solute_compound.formula());
        $("#solute_span3").html(solute_compound.formula());

        $("#volume_span1").html(total_volume * 1000);
        $("#volume_span2").html(total_volume * 1000);

        $("#mass_span").html(mass_of_solute_to_add);
    }catch (ex){
        window.alert(ex.message);
    }
};
