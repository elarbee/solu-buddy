$(function(){
	
    $("#landing").click(function(){
		$('#landing').slideUp();
	});
    
    
    //Event handler for the "one new solution".
    $("#singleSelect").change(function(){
        
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
    });
});
