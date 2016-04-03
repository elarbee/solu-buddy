<div id="makeItNowDimmer1">
    <div id="modalCenter1">
        <div id="makeItNowModal1">
            <div id="modalHeader1">
                <h2>What sort of solution would you like to make?</h2>
                <button class="closeModal1">x</button>
            </div>
            <hr>
            <form action="../single-solution/solution.php">
                <select name="value" id="singleSelect1">
                  <option value="SOLID">It is a pure solid, i.e. in a bottle, and I will add it by mass.</option>
                  <option value="liquid">It is a pure (i.e., neat) liquid.</option>
                  <option value="conc">It is a concentrated stock solution (like conc. HCL or NaOH).</option>
                </select>
                <br>
                <input type="hidden" name="passTo" value="calibration1">
                <button id="singleButton1" type="submit">Go</button>
            </form>

             <form action="../single-solution/solution.php">
                <div id="liquidDiv1">
                    <p>What information do you know about this liquid substance, and hence how will you transfer a portion of it into the solution?</p>
                    <select name="value" id="liquidSelect1">
                      <option value="GRAV">I know the solute molecular mass, and I will do a gravimetric transfer.</option>
                      <option value="VOLU">I know the solute molecular mass and density, and I will do a volumetric transfer.</option>
                    </select>
                    <br>
                    <input type="hidden" name="passTo" value="calibration1">
                    <button id="liquidButton1" type="submit">Go</button>
                </div>
            </form>

        </div>
    </div>
</div>

<script>
$(function(){
    
    // Modal JavaScript
    
    //Modal Close button click handler
    $(".closeModal1").click(function(){
       $("#makeItNowDimmer1").css("display","none");
    });
    
    //Show modal when user clicks saved solutions button
    $("#makeItNowButton1").click(function(){
        $("#makeItNowDimmer1").css("display","inline");
    });
    
    
    /*
     *       Java Script from the index page that controls the liquid <select> element.
     */
    
    //Event handler for the "one new solution" panel.
    $("#singleSelect1").change(function(){
        liquidExpander();
    });
    
    //Expands the liquid div if the user selects the liquid option.
    function liquidExpander(){
        //If the user selects liquid option
       if($("#singleSelect1").val() == 'liquid'){
           //Show the liquid div
           $("#liquidDiv1").css("display","inline");
           //Hide the go button
           $("#singleButton1").css("display","none");
       }
        else{
            //Hide the liquid div
            $("#liquidDiv1").css("display","none");
            //Show the go button
           $("#singleButton1").css("display","inline");
        } 
    }
    
    //Run it so that if the user comes back to the page and the liquid option is selected the liquid div will expand.
    liquidExpander();
    
    
});
</script>

<style>
    /* Style information for the "Saved Solutions Modal" */

    /* This fills entire screen with a transparent div behind the modal */
    #makeItNowDimmer1{
        display: none;
        position: fixed;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
        background-color: rgba(80,80,80,0.5);
        z-index: 1;
    }

    /* A container for the modal that helps center it */ 
    #modalCenter1{
        position: absolute;
        top:25%;
        left:50%;
    }

    #makeItNowModal1{
        position: relative;
        left:-50%;
        width:550px;
        height: 350px;
        border-radius: 35px;
        background-color: rgba(200,200,200,0.95);
        text-align: center;
    }

    #makeItNowModal1 h2{
        display: inline-block;
        font-family: sans-serif;
        padding-top: 10px;
    }

    #makeItNowModal1 button{
       background: transparent;

    }
    
    #modalHeader1 button{
        width: 25px;
        height: 25px;
        border-radius: 5px;
        position: absolute;
        right:25px;
    }
</style>