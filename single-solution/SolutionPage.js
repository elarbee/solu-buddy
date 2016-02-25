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
        $("#answerDiv").slideDown("slow");
    });
    
    //Back arrow for answer page
    $("#arrowContainer img").click(function(){
       $("#answerDiv").slideUp("fast");
    });
    
});

function fill_fields(){
    alert("Solvent Input: " + $("#solvent_formula").val());
    var solvent_compound = string_to_compound($("#solvent_formula").val());
    var solute_compound = string_to_compound($("#solute_formula").val());
    var solute_molecular_weight = solute_compound.molecular_weight();
    $("#solute_molec_weight").val(solute_molecular_weight);
    var total_volume = $("#totalVolume").val();
    var target_solution_concentration = $("#solution_concentration").val();

    var mass_of_solute_to_add =
        SingleSolution(target_solution_concentration, total_volume,
            solute_molecular_weight).solid();

    var target_solution_concentration = $("#solution_concentration").val();
    $("#massToAdd").val(mass_of_solute_to_add + "g");

};