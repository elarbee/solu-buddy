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