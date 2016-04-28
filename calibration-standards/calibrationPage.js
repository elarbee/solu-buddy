$(function () {
    var myParam = location.search.split('value=')[1]
    var divClone = $("#answerDiv").clone();

    //Used for holding a copy of the external standard flask div
    var externalFlask;

    //Back arrow for answer page
    $("#arrowContainer img").click(function() {
        //Hide answer Div
        $("#answerDiv").hide();

        //Show page content
        $("#inputDiv").show();

        //Save the first dilution flask so that it can be cloned again later, delete the rest.
        externalFlask = $("#dilutionFlasksDiv").children().first().clone();
        $("#dilutionFlasksDiv").empty().append(externalFlask);

    });

    function validateInput(){
        var solventFormula = $("#solvent_formula").val();
        var analyteFormula = $("#analyte_formula").val();
        var analyteMolWeight = $("#analyte_molec_weight").val();
        var unknown = $("#unknown").val();
        var numStandards = $("#num_standards").val();
        var totalVolume = $("#total_volume_standards").val();
        var volumeStandards = $("#volume_standards").val();

        if(myParam == "EXTERNAL" || myParam == "ADDITION") {
            //If no solvent entered
            if (solventFormula == "") {
                showAlert("Please enter a name for your solvent!");
                return false;
            }
            //If no analyte entered
            if (analyteFormula == "") {
                showAlert("Please enter a name for your analyte!");
                return false;
            }
            //If no unknown entered
            if (unknown == "") {
                showAlert("Please enter a name for your unknown!");
                return false;
            }
            // If no mol weight entered
            if (analyteMolWeight == "") {
                showAlert("Please enter a Molecular Weight for your analyte!");
                return false;
            }
            // If invalid number standards entered
            if (Number(numStandards) <= 0 || Number(numStandards) > 20) {
                showAlert("Please enter a number of standards less than 20 and greater than 0!");
                return false;
            }
            //If num_standards null
            if (num_standards == "") {
                showAlert("Please enter a number of standards!");
                return false;
            }
            // If no total flask volume entered
            if (totalVolume == "") {
                showAlert("Please enter a flask volume!");
                return false;
            }
            // If total flask volume entered <= 0
            if (Number(totalVolume) <= 0) {
                showAlert("Please enter a total flask volume greater than 0!");
                return false;
            }
        } else if(myParam = "INTERNAL") {
            //If Unknown null
            if (unknown == "") {
                showAlert("Please enter a name for your unknown!");
                return false;
            }
            // If invalid number standards entered
            if (Number(numStandards) <= 0 || Number(numStandards) > 20) {
                showAlert("Please enter a number of standards less than 20 and greater than 0!");
                return false;
            }
            //If num_standards null
            if (num_standards == "") {
                showAlert("Please enter a number of standards!");
                return false;
            }
            if (volumeStandards == "") {
                showAlert("Please enter a volume for your standards!");
                return false;
            }
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

    $("#nextButton").click(function () {



        if(validateInput()) {
            //Hide page content
            $("#inputDiv").hide();
            //Show answer div
            $("#answerDiv").show();
            
            if(myParam=="EXTERNAL") {
                //Grab input values and set them to local variables
                var solventFormula = $("#solvent_formula").val();
                var analyteFormula = $("#analyte_formula").val();
                var analyteMolWeight = $("#analyte_molec_weight").val();
                var unknown = $("#unknown").val();
                var numStandards = $("#num_standards").val();
                var totalVolume = $("#total_volume_standards").val();

                $("#answerDivHeader").text("External Standards Method");
                $("#unknownSolutionDescription").html('Unknown: ' + unknown);
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);
                $("#standardSolutionDiv").remove();

                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask1").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);


                }
            }
            else if(myParam=="INTERNAL") {
                //Grab input values and set them to local variables
                var unknown = $("#unknown").val();
                var numStandards = $("#num_standards").val();
                var volumeStandards = $("#volume_standards").val();

                $("#answerDivHeader").append("Internal Standards Method");
                $("#unknownSolutionDescription").html('Unknown: ' + unknown);
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);

                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask1").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);


                }
            } 
            else if(myParam=="ADDITION") {
                //Grab input values and set them to local variables
                var solventFormula = $("#solvent_formula").val();
                var analyteFormula = $("#analyte_formula").val();
                var analyteMolWeight = $("#analyte_molec_weight").val();
                var unknown = $("#unknown").val();
                var numStandards = $("#num_standards").val();
                var totalVolume = $("#total_volume_standards").val();

                $("#answerDivHeader").text("Standard Addition Method");
                $("#unknownSolutionDescription").html('Unknown: ' + unknown);
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);
                $("#standardSolutionDiv").remove();

                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask1").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);


                }
            }
        }
    });
    

});
