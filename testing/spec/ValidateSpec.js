/**
 * Author: William Robert Howerton III
 */

describe("Validate", function() {


    it("Should initiate correctly", function() {
        expect(new Validate("").is()).toEqual(false);

    });

    it("Should be able to use and(val) correctly", function() {
        expect(new Validate("").and(true).is()).toEqual(false);
        expect(new Validate("999").and(true).is()).toEqual(true);
        expect(new Validate("999").and(false).is()).toEqual(false);
        expect(new Validate("").and(false).is()).toEqual(false);
    });

    it("Should be able to use or(val) correctly", function() {
        expect(new Validate("").or(true).is()).toEqual(true);
        expect(new Validate("999").or(true).is()).toEqual(true);
        expect(new Validate("999").or(false).is()).toEqual(true);
        expect(new Validate("").or(false).is()).toEqual(false);


    });

    it("Should be able to reject bad double values", function(){
        expect(new Validate("11000.222.3").double().is()).toEqual(false);
        expect(new Validate("sadasf").double().is()).toEqual(false);
        expect(new Validate("jyrjjh222.3").double().is()).toEqual(false);
        expect(new Validate("3").double().is()).toEqual(true);

    });

    it("Should be able to validate integers.", function(){
        expect(new Validate(999).integer().is()).toEqual(true);
        expect(new Validate(999).integer().not_zero().is()).toEqual(true);
        expect(new Validate("0").integer().not_zero().is()).toEqual(false);
    });

    it("Should validate a string of letters only.", function(){
        expect(new Validate("asdfdsafsadfsd").only_letters().is()).toEqual(true);
        expect(new Validate("dasfdsafaf3").only_letters().is()).toEqual(false);
        expect(new Validate("sadasafdsadfsad/").only_letters().is()).toEqual(false);
    });
    it("Should validate a string without any special characters.", function(){
        expect(new Validate("asdfds64554afsadfsd").no_specials().is()).toEqual(true);
        expect(new Validate("dasfd452safaf3").no_specials().is()).toEqual(true);
        expect(new Validate("sadasafds4524adfsad/").no_specials().is()).toEqual(false);
        expect(new Validate("").no_specials().is()).toEqual(false);
    });

    it("Should validate whether number is between two other numbers.", function(){
        expect(new Validate("0").between_including(0, 100).is()).toEqual(true);
        expect(new Validate("-4").between_including(-500, 100).is()).toEqual(true);
        expect(new Validate("-4").between_including(0, 100).is()).toEqual(false);
        expect(new Validate("5550").between_including(5000, 6000).is()).toEqual(true);
    });

    it("Testing", function(){
        var int = "5";
        expect(new Validate(int).integer().between_including(0,10).is()).toEqual(true);
        console.log(new Validate("dasfdsafaf3").only_letters().error);
    });


});

describe("ValidatePage() Tests", function(){


    var invalid_elements =
            ["",                      //no fields accept blanks
            '-41322',                 //no fields accept negative numbers
            undefined,                //no fields accept undefined
            random_shitstorm(50, 100) //no fields should accept this
            ];

    var page_names = ['SOLID', 'VOLU', 'GRAV',
        'CONC_MOL', 'CONC_GRAV', 'CONC_VOL',
        'SERIAL', 'EXTERNAL', 'INTERNAL', 'ADDITION'];

    it("It should reject pages with only invalid elements.", function(){

        var test_amount = 50;

        page_names.forEach(function(el, idx, arr){
            for(var i = 0; i < test_amount; i++){
                var input_fields = Page_To_Inputs(el);
                var input_vals = {};
                input_fields.forEach(function(field, id, arr2){
                   input_vals[field] = invalid_elements[random_int(0, invalid_elements.length)];
                });

                expect(new ValidatePage(el).test_page(input_fields)).toEqual(false);
            }
        });
    });

    it("It should reject pages with some valid elements and some invalid.", function(){

        var test_amount = 20;
        var test_count = 0;
        for(var t = 0; t < test_amount; t++) {
            page_names.forEach(function (el, idx, arr) {

                for (var o in invalid_elements) {

                    var fields = Page_To_Inputs(el);
                    var input_fields = {};
                    var solute = random_formula_w_ionic(20, 1, 10);

                    for (var l in fields) {
                        for (var k in fields) {

                            input_fields[fields[k]] = random_choose(
                                random_valid_field_val(fields[k], solute),
                                invalid_elements[o]
                            );

                        }
                        input_fields[fields[1]] = solute;

                        input_fields[fields[random_int(0, fields.length)]] = invalid_elements[random_int(0, invalid_elements.length)];

                        test_count++;
                        var start = window.performance.now();
                        var valid = new ValidatePage(el).test_page(input_fields);
                        var time = window.performance.now() - start;

                        if (valid) {
                            console.log(test_count + " time taken = " + time);
                            console.log(input_fields);
                        }
                        expect(valid).toEqual(false);
                        input_fields = {};
                    }
                }
            });
        }
    });

    it("It should reject pages with values covering all invalid zones", function(){

        var test_amount = 50;
        var test_count = 0;

        page_names.forEach(function(p, i, arr){

            var fields = Page_To_Inputs(p);
            var input_fields = {};

            var solute = random_formula_w_ionic(20, 0, 10);

            fields.forEach(function(f, i2, arr2){
                input_fields[f] = random_invalid_field_val(f, solute);
            });

            test_count++;
            var start = window.performance.now();
            var valid = new ValidatePage(p).test_page(input_fields);
            var time = window.performance.now() - start;

            if (valid) {
                console.log(test_count + " time taken = " + time);
                console.log(input_fields);
            }
            expect(valid).toEqual(false);
            input_fields = {};


        });

        console.log(string_to_compound("C3H4OH(COOH)").molecular_weight());
    });


});
