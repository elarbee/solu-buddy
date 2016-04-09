$(function() {

    //Used for holding a copy of the dilution flask div
    var dilutionFlask;
    
    //Back arrow for answer page
    $("#arrowContainer img").click(function() {
        //Hide answer Div
        $("#answerDiv").hide();

        //Show page content
        $("#inputDiv").show();
        
        //Save the first dilution flask so that it can be cloned again later, delete the rest.
        dilutionFlask = $("#dilutionFlasksDiv").children().first().clone();
        $("#dilutionFlasksDiv").empty().append(dilutionFlask);

    });
    
    //Checks that the user gave correct input and shows an alert if not
    function validateInput(){
        
        //Grab input values and set them to local variables
        var chemID = $("#soluteChemID").val();
        var molWeight = $("#soluteMW").val();
        var numDilutions = $("#numDilutions").val();
        var flasksVolume = $("#flasksVolume").val();
        var volumeTransferred = $("#volumeTransferred").val();
        
        //If no solute name entered
        if(chemID == ""){
            showAlert("Please enter a name for your solute!");
            return false;
        }
        
        // If no mol weight entered
        if( molWeight == ""){
            showAlert("Please enter a Molecular Weight for your solute!");
            return false;
        }
        
        // If no dilution number entered
        if(numDilutions == ""){
            showAlert("Please enter a number of dilutions!");
            return false;
        }
        
         // If invalid dilution number entered
        if(Number(numDilutions) <= 0 || Number(numDilutions) > 20){
            showAlert("Please enter a number of dilutions less than 20 and greater than 0!");
            return false;
        }
        
        // If no flask volume entered
        if(flasksVolume == ""){
            showAlert("Please enter a flask volume!");
            return false;
        }
        
        //If flask volume <0
        if(Number(flasksVolume) <= 0){
            showAlert("Please enter a flask volume greater than 0!");
            return false;
        }
        
        
        // If no transfer volume entered
        if(volumeTransferred == ""){
            showAlert("Please enter a transfer volume!");
            return false;
        }
        
         // If invalid transfer volume entered
        if(Number(volumeTransferred) > Number(flasksVolume) || Number(volumeTransferred) <= 0){
            showAlert("Please enter a transfer volume less than the flask volume and greater than 0!");
            return false;
        }
        
        
        hideAlert();
        return true;
        
    }
    
    //Hide the alert DIV
    function hideAlert(alertMessage){
        $("#myAlert").css("display","none");
    }
    //Show the alert div
    function showAlert(alertMessage){
        $("#myAlert").css("display","block").html(alertMessage);
    }

    //Next Button Click Handler
    $("#nextButton").click(function() {
        
        //Check for valid input
        if(validateInput()){
            //Hide page content
            $("#inputDiv").hide();
            //Show answer div
            $("#answerDiv").show();
            
             //Grab input values and set them to local variables
            var solventID = $("#solventChemID").val();
            var soluteID = $("#soluteChemID").val();
            var molWeight = $("#soluteMW").val();
            var numFlasks = $("#numDilutions").val();
            var flasksVolume = $("#flasksVolume").val();
            var volumeTransferred = $("#volumeTransferred").val();
            
            var mySerialDilution = CalculateSerialDilution(solventID, soluteID, Number(molWeight), Number(numFlasks), Number(volumeTransferred), Number(flasksVolume));
            
            //Set description of solute
            $("#stockSolutionDescription").html(molWeight+"M Solution of "+ soluteID);
            
           
            
            //Set values of first serial div
            //Name
            $("#dilutionFlask").find("#solutionName").html(flasksVolume +"ML of "+ soluteID + " diluted in " + solventID);
            //Molarity
            $("#dilutionFlask").find("#molarityValue").html("Molarity = "+molWeight+"M x "+mySerialDilution.concentrationArray[0]);
            
            //Iterate through number of flasks inputted and add them to the page.
            for (i = 0; i < numFlasks - 1; i++) {
                dilutionFlask = $("#dilutionFlask").clone();
                //Set flask number
                dilutionFlask.find("#flaskNum").text(i + 2);
                $("#dilutionFlasksDiv").append(dilutionFlask);
                
                
                //Update name of flask
                $("#dilutionFlasksDiv").children().last().find("#solutionName").html(flasksVolume +"ML of "+ soluteID + " diluted in " + solventID);
                //Update molar value of flask
                $("#dilutionFlasksDiv").children().last().find("#molarityValue").html("Molarity = "+molWeight+"M x "+mySerialDilution.concentrationArray[i+1]);
            }

            //Set the value of all of the blue arrow divs to the value specified
            $(".blueArrow p").text(volumeTransferred + " ML");

            //Remove arrow from last flask
            $("#dilutionFlasksDiv").children().last().find(".blueArrow").remove();
            }
        

    });
    
    //Return an array with the 
    function CalculateSerialDilution(solventName, soluteName, soluteMolarity, numFlasks, transferVolume, flaskVolume){
        //Array of flasks concentration
        var flasks = [];
        
        //Load numerical values into 'Big' objects for precision
        var bigMolarity = Big(soluteMolarity);
        var bigTransferVolume = Big(transferVolume);
        var bigVolume = Big(flaskVolume);
        
        //Ratio of flask size to 
        var ratio = bigTransferVolume.div(bigVolume);
        //variable we will update when we build the concentrations of the individual flasks
        var currentConcentration = ratio;
        
        //Add first flask concentration
        flasks.push(currentConcentration);
        for(i=0;i<numFlasks;i++){
            currentConcentration = ratio.times(currentConcentration);
            flasks.push(currentConcentration);
        }
        
        return {solvent:solventName, solute:soluteName, molarity:soluteMolarity,concentrationArray:flasks} 
    }
    

});
