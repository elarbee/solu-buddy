$(function() {

    //Only print the contents of the answer div when the print button is clicked.
    $('#printButton').click(function() {
        alert('Print Answer div!');
    });

    //Answer page control
    $("#nextButton").click(function() {
        $("#answerDiv").show();
        $("#inputDiv").hide();
    });

    //Back arrow for answer page
    $("#arrowContainer img").click(function() {
        $("#answerDiv").hide();
        $("#inputDiv").show();
    });

});