/*  Alex Elarbee 2016
 *  Using this code to make a standardized solution object from input on the single solution page.
 */

// SOLID SOLUTION

// Builds and returns a javascript object representation of a solid cehmical solution.

function createSolidSolution(solventChemicalID, soluteID, soluteMolWeight, solutionTotalVolume, solutionConcentration){
   var solution = {
       SolventID:solventChemicalID,
       SoluteID:soluteID,
       SoluteMolWeight:soluteMolWeight,
       SolutionTotalVolume:solutionTotalVolume,
       SolutionConcentration:solutionConcentration
   } 
   return solution;
}

// LIQUID GRAVIMETRIC SOLUTION
// Builds and returns a javascript object representation of a liquid gravimetric chemical solution.

function createGravimetricSolution(solventChemicalID, soluteID, soluteMolWeight, solutionConcentration){
   var solution = {
       SolventID:solventChemicalID,
       SoluteID:soluteID,
       SoluteMolWeight:soluteMolWeight,
       SolutionConcentration:solutionConcentration
   } 
   return solution;
}

// LIQUID VOLUMETRIC SOLUTION
// Builds and returns a javascript object representation of a liquid volumetric chemical solution.
function createVolumetricSolution(solventChemicalID, soluteID, soluteMolWeight, densityOfPureSolid, solutionConcentration){
   var solution = {
       SolventID:solventChemicalID,
       SoluteID:soluteID,
       SoluteMolWeight:soluteMolWeight,
       DensityOfPureSolid:densityOfPureSolid,
       SolutionConcentration:solutionConcentration
   } 
   return solution;
}

//Takes the input from the 'solution.php' page and creates a solution object.
// Only use this on the 'Solid Solution' page.
function createSolidSolutionFromHTMLInput(){
    
    var solventChemicalID = document.getElementById("solvent_formula").value;
    var soluteID = document.getElementById("solute_formula").value;
    var soluteMolWeight = document.getElementById("solute_molec_weight").value;
    var solutionTotalVolume = document.getElementById("totalVolume").value;
    var solutionConcentration = document.getElementById("solution_concentration").value;
    
    return createSolidSolution(solventChemicalID, soluteID, soluteMolWeight, solutionTotalVolume, solutionConcentration);
}


//Takes the input from the 'solution.php' page and creates a solution object.
// Only use this on the 'Gravimetric Liquid Solution' page.
function createGravimetricSolutionFromHTMLInput(){
    
    var solventChemicalID = document.getElementById("solvent_formula").value;
    var soluteID = document.getElementById("solute_formula").value;
    var soluteMolWeight = document.getElementById("solute_molec_weight").value;
    var solutionConcentration = document.getElementById("solution_concentration").value;
    
    return createGravimetricSolution(solventChemicalID, soluteID, soluteMolWeight, solutionConcentration);
}


//Takes the input from the 'solution.php' page and creates a solution object.
// Only use this on the 'Volumetric Liquid Solution' page.
function createVolumetricSolutionFromHTMLInput(){
    
    var solventChemicalID = document.getElementById("solvent_formula").value;
    var soluteID = document.getElementById("solute_formula").value;
    var soluteMolWeight = document.getElementById("solute_molec_weight").value;
    var densityOfPureSolid = document.getElementById("density").value;
    var solutionConcentration = document.getElementById("solution_concentration").value;
    
    return createVolumetricSolution(solventChemicalID, soluteID, soluteMolWeight, densityOfPureSolid, solutionConcentration);
}