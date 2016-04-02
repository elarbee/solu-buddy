function next_check(page){
    try {

        /* Checks the solvent and analyte formula for validity.
         *   Conditions for valid formula:
         *
         *       1) No duplicate elements.
         *       2) Proper nomenclature.*/
        var valid_solvent= is_valid_formula($("#solvent_formula").val());
        var valid_analyte = is_valid_formula($("#analyte_formula").val());

        var msg = "";

        /* An error message is formulated depending on which formula is correct.
         * An additive strategy is used so a combination of error messages can be displayed
         * in one message box to avoid an 'intrusive' number of message boxes popping up.*/
        if(!valid_solvent) {
            //Tells the user the solute formula is incorrect.
            msg += "Solvent formula is not valid.\n";
        }
        if(!valid_analyte){
            //Tells the user the solvent formula is invalid.
            msg += "Analyte formula is not valid.\n";
        }


        /* If either formula was invalid, the message will be displayed to the user. */
        if(!valid_solvent || !valid_analyte){
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

    function fill_fields(page){
        try {

            /* Collects variables from input fields and creates other necessary variables using the input variables */
            var solvent_compound = string_to_compound($("#solvent_formula").val());
            var analyte_compound = string_to_compound($("#analyte_formula").val());

            /* Obtains the molecular weight for the compound using a formula in the compound object.*/
            var analyte_molecular_weight = analyte_compound.molecular_weight();
            /* Sets the molecular weight field to the newly calculated value.*/
            $("#analyte_molec_weight").val(analyte_molecular_weight);
            /* Get total volume value from input field*/
            var total_volume = $("#total_volume_standards").val()/1000;

            /* Get name of unknown.*/
            var unknown = $("#unknown").val();




            /* Creates a SingleSolution object using the target concentration (Molarity), total volume of the end solution,
             * and molecular weight of the solute used.*/
            // var single_solution = SingleSolution(target_solution_concentration, total_volume,
            //     solute_molecular_weight);


            /* Gets molarity variable from the solution concentration input field. (same as target concentration)*/
            var molarity = $("#solution_concentration").val();

            var mass_of_solute_to_add;

            if(page == "EXTERNAL"){


            }else if(page == "INTERNAL"){



            }else if(page == "ADDITION"){


            }

            /**
             * Fills in the answer page using values collected and calculated above.
             */

            $("#molarity_span1").html(molarity);
            $("#molarity_span2").html(molarity);

            $("#solvent_span1").html(solvent_compound.formula());
            $("#solvent_span2").html(solvent_compound.formula());
            $("#solvent_span3").html(solvent_compound.formula());

            $("#solute_span1").html(solute_compound.formula());
            $("#solute_span2").html(solute_compound.formula());
            $("#solute_span3").html(solute_compound.formula());

            $("#volume_span1").html(total_volume);
            $("#volume_span2").html(total_volume);

            $("#mass_span").html(mass_of_solute_to_add);
        }catch (ex){
            window.alert(ex.message);
        }
    };



}

$(function () {
    var divClone = $("#answerDiv").clone();

    $(nextButton).click(function() {
        $("#answerDiv").replaceWith(divClone.clone());
        //Used in loop to hold dilution flask div
        var dilutionFlask;

        var msg = "";
        /* Get number of standards.*/
        var num_standards = $("#num_standards").val();

        if(num_standards < 1) {
            msg+="Number of standards can't be less than 1"
            window.alert(msg);
        }
        //Iterate through number of standards and add them to the page
        for(i = 0;i<num_standards-1;i++){
            dilutionFlask = $("#dilutionFlask").clone();
            //Set flask number
            dilutionFlask.find("#flaskNumber").text(i+2);
            $("#dilutionFlasksDiv").append(dilutionFlask);
        }

    });
});