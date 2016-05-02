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
    
    //Hide the alert DIV
    function hideAlert(alertMessage){
        $("#myAlert").css("display","none");
    }
    //Show the alert div
    function showAlert(alertMessage){
        $("#myAlert").css("display","block").html("<b>"+alertMessage+"</b>");
    }

    //Next Button Click Handler
    $("#nextButton").click(function() {

        var validate = new ValidatePage('SERIAL');


        //Check for valid input
        if(validate.is_valid()){

            hideAlert();
            
            //Hide page content
            $("#inputDiv").hide();
            //Show answer div
            $("#answerDiv").show();
            
             //Grab input values and set them to local variables
            var solventID = $("#solventChemID").val();
            var soluteID = $("#soluteChemID").val();
            var solutionMolarity = $("#molaritySolution").val();
            var numFlasks = $("#numDilutions").val();
            var flasksVolume = $("#flasksVolume").val();
            var volumeTransferred = $("#volumeTransferred").val();

            var mySerialDilution = CalculateSerialDilution(solventID, soluteID, Number(solutionMolarity), Number(numFlasks), Number(volumeTransferred), Number(flasksVolume));
            
            //Set description of solute
            $("#stockSolutionDescription").html(solutionMolarity+" M Solution of "+ soluteID);
            
           
            
            //Set values of first serial div
            //Name
            $("#dilutionFlask").find("#solutionName").html(flasksVolume +" ML of "+ soluteID + " diluted in " + solventID);
            //Molarity
            $("#dilutionFlask").find("#molarityValue").html("Molarity = "+mySerialDilution.concentrationArray[0]+" M");
            
            //Iterate through number of flasks inputted and add them to the page.
            for (i = 0; i < numFlasks - 1; i++) {
                dilutionFlask = $("#dilutionFlask").clone();
                //Set flask number
                dilutionFlask.find("#flaskNum").text(i + 2);
                $("#dilutionFlasksDiv").append(dilutionFlask);
                
                
                //Update name of flask
                $("#dilutionFlasksDiv").children().last().find("#solutionName").html(flasksVolume +" mL of "+ soluteID + " diluted in " + solventID);
                //Update molar value of flask
                $("#dilutionFlasksDiv").children().last().find("#molarityValue").html("Molarity = "+mySerialDilution.concentrationArray[i+1]+" M");
            }

            //Set the value of all of the blue arrow divs to the value specified
            $(".blueArrow p").text(volumeTransferred + " ML");

            //Remove arrow from last flask
            $("#dilutionFlasksDiv").children().last().find(".blueArrow").remove();
        }else{
            showAlert(validate.error_message);
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

        // Determine the smallest number of significant digits that are used.
        var num_sig_figs = count_sig_figs(soluteMolarity);
        if(count_sig_figs(transferVolume) < num_sig_figs) num_sig_figs = count_sig_figs(transferVolume);
        if(count_sig_figs(flaskVolume) < num_sig_figs) num_sig_figs = count_sig_figs(flaskVolume);

        //Ratio of flask size to 
        var ratio = bigTransferVolume.div(bigVolume);
        //variable we will update when we build the concentrations of the individual flasks
        var currentConcentration = ratio;

        //Add first flask concentration
        flasks.push(Big(currentConcentration).times(bigMolarity).toExponential(num_sig_figs));
        for(i=0;i<numFlasks;i++){
            currentConcentration = ratio.times(currentConcentration);
            flasks.push(currentConcentration.times(bigMolarity).toExponential(num_sig_figs));
        }
        
        return {solvent:solventName, solute:soluteName, molarity:soluteMolarity,concentrationArray:flasks} 
    }
    

});
