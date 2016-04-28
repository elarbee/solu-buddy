/**
 * Created by root on 4/6/16.
 */
describe("Utility Functions", function() {


    describe("Count number of significant figures.", function(){
        it("Should count the number of significant figures in numbers without a decimal.", function() {

            var tests_to_expected = {42:2,
                899999:6,
                900:1,
                900000:1,
                900001:6,
                0:0};

            Object.keys(tests_to_expected).forEach(function(el, idx, arr){
               expect(count_sig_figs(el)).toEqual(tests_to_expected[el]);
            });

        });

        it("Should count the number of significant figures in negative numbers without a decimal.", function() {

            //Negative numbers need to be entered to array as string
            var tests_to_expected = {
                "-42":2,
                "-899999":6,
                "-900":1,
                "-900000":1,
                "-900001":6};

            Object.keys(tests_to_expected).forEach(function(el,idx,arr){
                expect(count_sig_figs(el)).toEqual(tests_to_expected[el]);
            });

        });

        it("Should count the number of significant figures in numbers with a decimal.", function() {

            var tests_to_expected = {
                42.2:3,
                899999.19293:11,
                899999.100001:12,
                890000.100001:12,
                900000.1:7,
                0.0:0};

            Object.keys(tests_to_expected).forEach(function(el,idx,arr){
                expect(count_sig_figs(el)).toEqual(tests_to_expected[el]);
            });


        });

        it("Should count the number of significant figures in negative numbers with a decimal.", function() {

            var tests_to_expected = {
                "-42.4":3,
                "-899999.19293":11,
                "-899999.100001":12,
                "-890000.100001":12,
                "-900000.1":7};

            Object.keys(tests_to_expected).forEach(function(el,idx,arr){
                expect(count_sig_figs(el)).toEqual(tests_to_expected[el]);
            });

        });
    });

    describe("Find minimum number in an array.", function(){
        it("Should be able to accommodate negative numbers as minimums.", function() {
            var arr = [1,2,3,4,-5,6,7,-10];

            expect(find_min(arr)).toEqual(-10);

        });

        it("Should be able to accommodate float numbers.", function() {

            var arr = [1.34,2.234,3.0,4.4,-5.1,6.3,7.1238,-234.2343];
            expect(find_min(arr)).toEqual(-234.2343);

            var arr = [1.34,2.234,3.0,4.4,5.1,6.3,7.1238,234.2343];
            expect(find_min(arr)).toEqual(1.34);
        });

        it("Should be able to accommodate empty arrays", function() {
            var arr = [];
            expect(find_min(arr)).toEqual(0);
        });

    });

    describe("Calculate Percent Error", function(){

        it("Should be able to calculate error for positive and negative integers.", function(){
                var positive_test_vals = [100000, 2, 984734, 129364726, 5006];
                var negative_test_vals = [-100000, -2, -91864123, -11233, -5006];

            /*
             Multiplier will result in an error of exactly ((1-multiplier)*100)
             */
            var multiplier_to_error_expected = {
                .5 : 50,
                .95 : 5,
                .9 : 10,
                .001 : 99.9,
                .05 : 95,
                0.0 : 100};

            Object.keys(multiplier_to_error_expected).forEach(function(el,idx){
                for(var pos in positive_test_vals){
                    var pos_val = positive_test_vals[pos];
                    /*
                        Must use .toPrecision(6) to negate small error which occurs around decimal place 10 or so.
                        *Note: 6 is arbitrary in this case.
                     */
                    expect(calculate_error(pos_val, pos_val*el).toPrecision(6)).toEqual(multiplier_to_error_expected[el].toPrecision(6));
                }

                for(var neg in negative_test_vals){
                    var neg_val = negative_test_vals[neg];
                    /*
                        Must use .toPrecision(6) to negate small error which occurs around decimal place 10 or so.
                        *Note: 6 is arbitrary in this case.
                     */
                    expect(calculate_error(neg_val, neg_val*el).toPrecision(6)).toEqual(multiplier_to_error_expected[el].toPrecision(6));
                }



            });

        });
    });

    describe("Round a number to a specific number of decimal places.", function(){
        it("Should be able to round numbers.", function() {

            expect(precise_round(20.35439, 4)).toEqual(20.3544);
            expect(precise_round(20.3544, 3)).toEqual(20.354);

        });

        it("Should be able to round numbers using a 0 decimal count.", function() {

            expect(precise_round(20.35439, 0)).toEqual(20);
            expect(precise_round(-20.35439, 0)).toEqual(-20);

        });

        it("Should be able to round negative numbers.", function() {

            expect(precise_round(-20.35439, 4)).toEqual(-20.3544);
            expect(precise_round(-20.3544, 3)).toEqual(-20.354);

        });

        it("Should be able to round to 13 decimal places accurately.", function() {

            expect(precise_round(120.394850348958493, 13)).toEqual(120.3948503489585);
            expect(precise_round(120.394850348958493, 18)).toEqual(120.3948503489585);
        });

        it("Should be able to round negative numbers to 13 decimal places accurately.", function() {

            expect(precise_round(-120.394850348958493, 13)).toEqual(-120.3948503489585);
            expect(precise_round(-120.394850348958493, 18)).toEqual(-120.3948503489585);
        });

    });

    describe("Create a single dilution object.", function(){
       
        it("Should be able to create simple dilutions.", function(){
           var dilution = new SingleDilution(1, 1);
            var nacl = string_to_compound("NaCl");
            expect(dilution.solute_volume(5)).toEqual(.2);
            expect(dilution.solute_molarity(2)).toEqual(.5);

            expect(dilution.grav_mass(nacl, 100)).toEqual(58.4427);
            expect(dilution.grav_mass(nacl, 50)).toEqual(29.22135);

        });
    });

    describe("Random element creation.", function(){

        it("Should never return an invalid element.", function(){

            for(var i = 0; i < 10000; i++){
                expect(find_element(getRandomElementKey())).toBeDefined();
            }

        });
    });
    describe("Verifying string is number only.", function(){

        it("Should accept simple numbers", function(){

            var regex = /^-?\d+\.?\d*$/g;

            expect(regex.test("5.5")).toEqual(true);
            expect(regex.test("-5.5")).toEqual(false);
            expect(regex.test("")).toEqual(false);
            expect(regex.test("5.5.")).toEqual(false);


        });
    });

    describe("Testing random_formula_w_ionic and is_valid_formula", function(){

        it("Let's see what happens", function(){
            for(var i = 0; i < 500; i++){
                var formula = random_formula_w_ionic(40, 2, 100);
                expect(is_valid_formula(formula)).toEqual(true);
                // expect(string_to_compound(formula.replace(")", "("))).toEqual(undefined);
            }
        });
    });
});
