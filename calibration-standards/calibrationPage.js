var volumes = [];
var values = [];

$(function () {
    var divClone = $("#answerDiv").clone();
    var myParam = location.search.split('value=')[1];

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

    //Hide the alert DIV
    function hideAlert(alertMessage){
        $("#myAlert").css("display","none");
    }
    //Show the alert div
    function showAlert(alertMessage){
        $("#myAlert").css("display","block").html(alertMessage);
    }

    $("#nextButton").click(function () {

        var validate = ValidatePage(myParam);

        if (validate.is_valid()) {
            //Hide page content
            $("#inputDiv").hide();
            //Show answer div
            $("#answerDiv").show();

            var solventFormula = $("#solvent_formula").val();
            var analyteFormula = $("#analyte_formula").val();
            var analyteMolWeight = Number($("#analyte_molec_weight").val());
            var unknown = $("#unknown").val();
            var numStandards = Number($("#num_standards").val());
            var totalVolume = Number($("#total_volume_standards").val());
            var volumeStandards = Number($("#volume_standards").val());
            var analyteMolarity = Number($("#analyte_molarity").val());
            var internalMolarity = Number($("#internal_molarity").val());
            var internalFormula = $("#internal_formula").val();
            var unknownVolume = Number($("#unknown_volume").val());


            if (myParam == "EXTERNAL") {
                $("#answerDivHeader").text("External Standards Method");
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);
                $("#standardSolutionDiv").hide();

                //Iterate through number of flasks inputted and add them to the page.
                for (var i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask0").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);
                }
            }
            else if (myParam == "INTERNAL") {

                $("#answerDivHeader").text("Internal Standards Method");
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);
                $("#SolutionDescription").text('Internal Standard: ' + internalFormula);
                $(".flaskImgAndNumberDiv").prepend($("<input type='text' id='volumeOfIS' class='flaskInputIS' placeholder='Enter volume of internal standard to add to the solution'>"));


                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    $("#is_label").show();

                    dilutionFlask = $("#dilutionFlask0").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);
                }

            }
            else if (myParam == "ADDITION") {
                $("#answerDivHeader").text("Standard Addition Method filled with Water");
                $("#SolutionDescription").html('Unknown: ' + unknown);
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);


                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask0").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);

                }
                $($("#dilutionFlasksDiv").children()[0].children[0].children[0]).hide();
                $($("#dilutionFlasksDiv").children()[0].children[1].children[0]).html('Molarity with analyte' + SingleDilution(1, totalVolume/1000).solute_molarity(unknownVolume));
            }
        }else{
            showAlert(validate.error_message);
        }

        if (myParam == "EXTERNAL") {
            $(".flaskInput", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);
                var vNum = Number(v.val());

                if (v.val() == "") {
                    window.alert("Please enter a volume of analyte for the flask!");
                    valid = false;
                }

                else if (vNum <= 0) {
                    window.alert("Please enter a volume of analyte greater than 0");
                    valid = false;
                }
                else if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of analyte that is not greater than the total volume of the flask");
                    valid = false;
                }
                else if (isNaN(vNum)) {
                    window.alert("Volume of analyte must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum);
                    console.log(molarity);
                    $($(v).parent().next().children(".flaskCalc")[0]).html('Molarity with Analyte: ' + molarity);
                }
            });
        } else if(myParam == "INTERNAL") {

            $(".flaskInput", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);
                var vNum = Number(v.val());

                if (v.val() == "") {
                    window.alert("Please enter a volume of analyte for the flask!");
                    valid = false;
                }

                else if (vNum <= 0) {
                    window.alert("Please enter a volume of analyte greater than 0");
                    valid = false;
                }
                else if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of analyte that is not greater than the total volume of the flask");
                    valid = false;
                }
                else if (isNaN(vNum)) {
                    window.alert("Volume of analyte must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum);

                    $($(v).parent().next().children(".flaskCalc")[0]).html('Molarity with Analyte: ' + molarity + '\n');
                }

            });

            $(".flaskInputIS", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);
                var vNum = Number(v.val());

                if (v.val() == "") {
                    window.alert("Please enter a volume of internal standard for the flask!");
                    valid = false;
                }

                else if (vNum <= 0) {
                    window.alert("Please enter a volume of internal standard greater than 0");
                    valid = false;
                }
                else if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of internal standard that is not greater than the total volume of the flask");
                    valid = false;
                }
                else if (isNaN(vNum)) {
                    window.alert("Volume of internal standard must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(internalMolarity, (totalVolume / 1000)).solute_molarity(vNum);

                    $($(v).parent().next().children(".flaskCalcIS")[0]).html('Molarity with Internal Standard: ' + molarity + '\n');
                }

            });

        } else if(myParam == "ADDITION") {
            $(".flaskInput", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);
                var vNum = Number(v.val());

                if (v.val() == "") {
                    window.alert("Please enter a volume of analyte for the flask!");
                    valid = false;
                }

                else if (vNum <= 0) {
                    window.alert("Please enter a volume of analyte greater than 0");
                    valid = false;
                }
               else if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of analyte that is not greater than the total volume of the flask");
                    valid = false;
                }
                else if (isNaN(vNum)) {
                    window.alert("Volume of analyte must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum + unknownVolume);
                    $($(v).parent().next().children(".flaskCalc")[0]).html('Molarity with Analyte: ' + molarity);
                }
            });
        }
    });

});
