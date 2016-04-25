/**
 * Created by Howerton on 3/31/2016.
 */
describe('Solution.js testing', function() {



    describe("Single solution", function () {

        var solution = new Solution('NaCl', 'H2O', 1, 1.5);

        it('Should be able to create its compounds accurately.', function() {

            expect(solution.solute.formula).toEqual('NaCl');
            expect(solution.volume).toEqual(1);
            expect(solution.solution_concentration).toEqual(1.5);
            expect(solution.single.sol.solution_calculator.solid()).toEqual(87.66405);
            expect(solution.solute.molecular_weight()).toEqual(58.4427);

        });

        it('Should have correct information in the generated steps for solutions using solid solutes', function () {

            var steps = solution.single.sol.steps_html();

            expect(steps.indexOf(solution.solute.formula)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.volume+"")).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solution_concentration)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.single.sol.solution_calculator.solid())).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solute.molecular_weight()+"")).toBeGreaterThan(0);
        });

        it('Should have correct information in the generated steps for solutions using liquid solutes measured volumetrically', function () {

            var steps = solution.single.gravimetric.steps_html();

            expect(steps.indexOf(solution.solute.formula)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.volume+"")).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solution_concentration)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.single.volumetric.solution_calculator.solid())).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solute.molecular_weight()+"")).toBeGreaterThan(0);
        });

        it('Should have correct information in the generated steps for solutions using liquid solutes measured gravimetrically', function () {

            var density = 5;
            var steps = solution.single.volumetric.steps_html(density);

            expect(steps.indexOf(solution.solute.formula)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.volume+"")).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solution_concentration)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.single.volumetric.solution_calculator.liquid.volume(density))).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solute.molecular_weight()+"")).toBeGreaterThan(0);
        });

    });

    describe("Single solution made from a concentrated stock solution", function() {

        var targ_molarity = 1.5;
        var targ_volume_l = 1;
        var solute = string_to_compound('HNa');
        var solution = new Solution('HNa', 'H2O', targ_volume_l, targ_molarity);
        var dilution = new SingleDilution(targ_molarity, targ_volume_l);

        it('Should have correct information in the generated steps for solutions using liquid concentrated solutes and a known solute molarity', function () {

            var m1 = 5;
            var steps = solution.concentrated.steps_html_mol(m1);

            expect(steps.indexOf(solution.solute.formula)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.volume+"")).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solution_concentration)).toBeGreaterThan(0);
            expect(steps.indexOf(dilution.solute_volume(m1))).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solute.molecular_weight()+"")).toBeGreaterThan(0);
        });

        it('Should have correct information in the generated steps for solutions using concentrated liquid solutes ' +
            'with a known mass % measured gravimetrically', function () {

            var mass_percent = 50;
            var steps = solution.concentrated.steps_html_grav(mass_percent);

            expect(steps.indexOf(solution.solute.formula)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.volume+"")).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solution_concentration)).toBeGreaterThan(0);
            expect(steps.indexOf(dilution.grav_mass(solute, mass_percent)+"")).toBeGreaterThan(0);
        });

        it('Should have correct information in the generated steps for solutions using liquid solutes ' +
            'with a known mass % measured volumetrically', function () {

            var mass_percent = 50;
            var density = 5;
            var steps = solution.concentrated.steps_html_vol(mass_percent, density);

            expect(steps.indexOf(solution.solute.formula)).toBeGreaterThan(0);
            expect(steps.indexOf(solution.volume+"")).toBeGreaterThan(0);
            expect(steps.indexOf(solution.solution_concentration)).toBeGreaterThan(0);
            expect(steps.indexOf(dilution.vol_transfer(solute, mass_percent, density)+"")).toBeGreaterThan(0);
        });

    });



    //Uncomment the line below if you want to see the result. Currently works.
    //document.write(solution.single.sol.steps_html());


});
