<div id="savedSolutionsDimmer">
    <div id="modalCenter">
        <div id="savedSolutionsModal">
            <div id="modalHeader">
                <h2>My Saved Solutions</h2>
                <button class="closeModal">x</button>
            </div>
            <hr>
            <div id="modalContent">
                <select>
                    <option> Sample Solution 1</option>
                    <option> Sample Solution 1</option>
                    <option> Sample Solution 1</option>
                </select>
            </div>
        </div>
    </div>
</div>

<script>
$(function(){
    
    // Modal JavaScript
    
    //Modal Close button click handler
    $(".closeModal").click(function(){
       $("#savedSolutionsDimmer").css("display","none");
    });
    
    //Show modal when user clicks saved solutions button
    $("#savedSolutionButton").click(function(){
        $("#savedSolutionsDimmer").css("display","inline");
    });
    
    
});
</script>

<style>
    /* Style information for the "Saved Solutions Modal" */

    /* This fills entire screen with a transparent div behind the modal */
    #savedSolutionsDimmer{
        display: none;
        position: fixed;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
        background-color: rgba(80,80,80,0.5);
    }

    /* A container for the modal that helps center it */ 
    #modalCenter{
        position: absolute;
        top:25%;
        left:50%;
    }

    #savedSolutionsModal{
        position: relative;
        left:-50%;
        width:550px;
        height: 350px;
        border-radius: 35px;
        background-color: rgba(200,200,200,0.95);
        text-align: center;
    }

    #savedSolutionsModal h2{
        display: inline-block;
        font-family: sans-serif;
        padding-top: 10px;
    }

    #savedSolutionsModal button{
       background: transparent;
        width: 25px;
        height: 25px;
        border-radius: 5px;
        position: absolute;
        right:25px;
    }
</style>