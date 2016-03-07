$(function(){
   
    var totalVolume = $("#totalVolume").clone();
    
    //Select box handler
    $("#pageSelect").change(function(){
       
       if($("#pageSelect").val() == "gravLiquid"){
           $("#totalVolume").next().remove();
           $("#totalVolume").remove();
       }
       
       if($("#pageSelect").val() == "volLiquid"){
           $("#totalVolume").attr("placeholder","Density of Pure Solute.");
           $("#massToAdd").attr("placeholder","What volume solute do you add?");
       }
   }); 


    //Answer page control
    $("#nextButton").click(function(){
        try {

            var valid_solute = is_valid_formula($("#solute_formula").val());
            var valid_solvent = is_valid_formula($("#solvent_formula").val());

            var msg = "";

            if(!valid_solute) {
                msg += "Solute formula is not valid.\n";
            }
            if(!valid_solvent){
                msg += "Solvent formula is not valid.\n";
            }


            if(!valid_solute || !valid_solvent){
                window.alert(msg);
            }else{
                fill_fields();
                $("#answerDiv").slideDown("slow");
            }

        }catch(ex){
            window.alert(ex.message);
        }
    });
    
    //Back arrow for answer page
    $("#arrowContainer img").click(function(){
       $("#answerDiv").slideUp("fast");
    });
    
});


function fill_fields(){
    try {
        var solvent_compound = string_to_compound($("#solvent_formula").val());
        var solute_compound = string_to_compound($("#solute_formula").val());
        var solute_molecular_weight = solute_compound.molecular_weight();
        $("#solute_molec_weight").val(solute_molecular_weight);
        var total_volume = $("#totalVolume").val();
        var target_solution_concentration = $("#solution_concentration").val();

        var single_solution = SingleSolution(target_solution_concentration, total_volume,
            solute_molecular_weight);

        var mass_of_solute_to_add = single_solution.solid();

        var molarity = $("#solution_concentration").val();

        $("#massToAdd").val(mass_of_solute_to_add + "g");

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