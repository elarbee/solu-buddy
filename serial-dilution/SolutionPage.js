$(function(){
    
    //This if statement will check for valid input, right now it only evaluates as true.
    var validInput = true;
    if(true){
        var divClone = $("#answerDiv").clone();
        //Next Button Click Handler
        $("#nextButton").click(function(){

            $("#answerDiv").replaceWith(divClone.clone());
            var dilutionFlask ;

            //Get number of dilution flasks to prepare
            var numFlasks = $("#numDilutions").val();
            
            //Iterate through number of flasks inputted and add them to the page.
            for(i = 0;i<numFlasks-1;i++){
                dilutionFlask = $("#dilutionFlask").clone()
                //Set flask number
                dilutionFlask.find("#flaskNum").text(i+2);
                $("#dilutionFlasksDiv").append(dilutionFlask);
            }
            
            //Set the value of all of the blue arrow divs to the value specified
            $(".blueArrow p").text($("#volumeTransferred").val()+" ML");
            
            //Remove arrow from last flask
            $("#dilutionFlasksDiv").children().last().find(".blueArrow").remove(); 
        });
        

        
    }
    
});