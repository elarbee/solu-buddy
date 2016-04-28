<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width">

    <link rel="stylesheet" href="/static/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/static/css/header-styles.css">
    <link rel="stylesheet" type="text/css" href="/static/css/style.css">
    <link rel="stylesheet" type="text/css" href="/static/css/navBar.css">
	
	
    <!-- jQuery -->
    <script src="/static/js/jquery-1.11.3.min.js"></script>
    <script src="/static/js/bootstrap.js"></script>
    <script src="/landing.js"></script>
    <script src="/static/js/calculator.js"></script>
</head>
<body>
<?php
session_start();
require ("dynamicHelpers.php");
renderHead( ["title" => "Logged Landing Page", "navField1" => "Account Settings", "navField2" => "Saved Solutions",
    "navField3" => "Chemistry Terms", "navField4" => "Create Solution(s)"] );
?>
	<div id="choices">
        
        <!-- Option 1 -->
        <!-- Float left -->
		<div id="single">
            <!-- Display:table for vertical alignment -->
            <div  class="optionDiv">
                <div class="panel">
                    <h2> I am preparing just one new solution... </h2>
                    <p>There is some solute that you are adding to the mixture. In what form is the solute before you add it?</p>
                   
                    <form action="single-solution/solution.php">
                    <select name="value" id="singleSelect">
                      <option value="SOLID">It is a pure solid, i.e. in a bottle, and I will add it by mass.</option>
                      <option value="liquid">It is a pure (i.e., neat) liquid.</option>
                      <option value="CONC">It is a concentrated stock solution (like conc. HCL or NaOH).</option>
                    </select>
                    <br>
                    <button id="singleButton" type="submit">Go</button>
                    </form>
                    
                     <form action="single-solution/solution.php">
                        <div id="liquidDiv">
                            <p>What information do you know about this liquid substance, and hence how will you transfer a portion of it into the solution?</p>
                            <select name="value" id="liquidSelect">
                              <option value="GRAV">I know the solute molecular mass, and I will do a gravimetric transfer.</option>
                              <option value="VOLU">I know the solute molecular mass and density, and I will do a volumetric transfer.</option>
                            </select>
                            <br>
                            <button id="liquidButton" type="submit">Go</button>
                        </div>
                    </form>
                    
                </div>
            </div>
		</div>
        
        <!-- Option 2 -->
        <!-- Display: inline-block (Centers div) -->
        <div id="multiple">
             <!-- Display:table for vertical alignment -->
            <div  class="optionDiv">
                <div class="panel">
                    <h2> I am preparing multiple solutions by serial dilution. </h2>
                    <br>
                    <button type="button" onClick="window.location.href='serial-dilution/serial.php'">Go</button>
                </div>
            </div>
        </div>

        
        <!-- Option 3 -->
        <!-- Float right -->
		<div id="calibration">
             <!-- Display:table for vertical alignment -->
            <div class="optionDiv">
                <div class="panel">
                    <h2> I am preparing a set of calibration standards </h2>
                    <p>What method are you using to make the standards?</p>
                    <form action="calibration-standards/calibration.php">
                        <select name="value" id="calibrationSelect">
                          <option value="EXTERNAL">External Standard Method</option>
                          <option value="INTERNAL">Internal Standard Method</option>
                          <option value="ADDITION">Standard Addition Method</option>
                        </select>
                        <br>
                        <button id="calibrationButton" type="submit">Go</button>
                    </form>
                </div>
            </div>
		</div>
        
	</div>
</body>
</html>

<script>
    localStorage.clear();
</script>
