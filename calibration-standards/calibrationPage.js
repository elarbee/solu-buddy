$(function(){
    
        
    //Select box handler
    $("#pageSelect").change(function(){
       //External
       if($("#pageSelect").val() == "external"){
           //Change Header Text
           $("#headerDiv h2").text("Making Calibration Standards by External Standards Method");
           //Show External Standards Table
           $("#externalTable").css("display","inline");
           //Hide Internal Standards Table
           $("#internalTable").css("display","none");
       }
       //Internal
       if($("#pageSelect").val() == "internal"){
           //Change Header Text
           $("#headerDiv h2").text("Making Calibration Standards by Internal Standards Method");
           //Hide External Standards Table
           $("#externalTable").css("display","none");
           //Show Internal Standards Table
           $("#internalTable").css("display","inline");
       }
        //Addition
        if($("#pageSelect").val() == "addition"){
           //Change Header Text
           $("#headerDiv h2").text("Making Calibration Standards by The Standard Addition Model");
           //Show External Standards Table
           $("#externalTable").css("display","inline");
           //Hide Internal Standards Table
           $("#internalTable").css("display","none");
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