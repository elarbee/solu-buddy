$(function(){
    
    //Answer page control
    $("#nextButton").click(function(){
        $("#answerDiv").slideDown("slow");
    });
    
    //Back arrow for answer page
    $("#arrowContainer img").click(function(){
       $("#answerDiv").slideUp("fast");
    });
    
});