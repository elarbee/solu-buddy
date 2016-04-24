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
