$(function(){
    
    //Event handler for the "one new solution" panel.
    $("#singleSelect").change(function(){
        liquidExpander();
    });
    
    //Expands the liquid div if the user selects the liquid option.
    function liquidExpander(){
        //If the user selects liquid option
       if($("#singleSelect").val() == 'liquid'){
           //Show the liquid div
           $("#liquidDiv").css("display","inline");
           //Hide the go button
           $("#singleButton").css("display","none");
       }
        else{
            //Hide the liquid div
            $("#liquidDiv").css("display","none");
            //Show the go button
           $("#singleButton").css("display","inline");
        } 
    }
    
    //Run it so that if the user comes back to the page and the liquid option is selected the liquid div will expand.
    liquidExpander();
});
