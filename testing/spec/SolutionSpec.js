/**
 * Created by Howerton on 3/31/2016.
 */
describe("Solution.js testing", function() {

    var solution = new Solution("NaCl", "H2O", 1, 1.5);

    it("Should be able to create its compounds accurately.", function() {

        expect(solution.solute.formula()).toEqual("NaCl");
        expect(solution.solvent.formula()).toEqual("H2O");
        expect(solution.volume).toEqual(1);
        expect(solution.solution_concentration).toEqual(1.5);
        expect(solution.single.sol.solution_calculator.solid()).toEqual(87.66405);
        expect(solution.solute.molecular_weight()).toEqual(58.4427);

    });

    //Uncomment the line below if you want to see the result. Currently works.
    //document.write(solution.single.sol.steps_html());


});
