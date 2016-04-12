<!-- This form is included into the solution page if the user is passing the formula on to another page. -->
<form action="../calibration-standards/calibration.php?value=INTERNAL" method="post">

    <?= "<script> var formulaValue = \"". $_GET['passTo'] . "\" ;</script>";   ?>

    <?php if(isset($_GET['value'])){
            switch($_GET['value']){
                case "SOLID":
                    echo "<button type=\"button\" id=\"nextButton\" onclick=\"localStorage.setItem(formulaValue,JSON.stringify(createSolidSolutionFromHTMLInput()));\">Next</button>";
                    break;
                case "GRAV":
                    echo "<button type=\"button\" id=\"nextButton\" onclick=\"localStorage.setItem(formulaValue,JSON.stringify(createGravimetricSolutionFromHTMLInput()));\">Next</button>";
                    break;
                case "VOLU":
                    echo "<button type=\"button\" id=\"nextButton\" onclick=\"localStorage.setItem(formulaValue,JSON.stringify(createVolumetricSolutionFromHTMLInput()));\">Next</button>";
                    break;
            }
       
        }
    ?>

</form>