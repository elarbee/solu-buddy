<!-- This form is included into the solution page if the user is passing the formula on to another page. -->0
<form action="../serial-dilution/serial.php" method="post">
    <input id="initialSolutionInput" type="hidden" name="initialSolution" value="null">
    <?php if(isset($_GET['value'])){
            switch($_GET['value']){
                case "SOLID":
                    echo "<button id=\"nextButton\" onclick=\"document.getElementById('initialSolutionInput').value = JSON.stringify(createSolidSolutionFromHTMLInput())\">Next</button>";
                    break;
                case "GRAV":
                    echo "<button id=\"nextButton\" onclick=\"document.getElementById('initialSolutionInput').value = JSON.stringify(createGravimetricSolutionFromHTMLInput())\">Next</button>";
                    break;
                case "VOLU":
                    echo "<button id=\"nextButton\" onclick=\"document.getElementById('initialSolutionInput').value = JSON.stringify(createVolumetricSolutionFromHTMLInput())\">Next</button>";
                    break;
            }
        }
    ?>
    
</form>