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

    it("Should validate whether a number is greater than another.", function(){
        expect(new Validate("oops").greater(5).not()).toBe(true);
        expect(new Validate(NaN).greater(5).not()).toBe(true);
        expect(new Validate(Infinity).greater(5).is()).toBe(true);
        expect(new Validate(10).greater(5).is()).toBe(true);
        expect(new Validate(-5).greater(5).not()).toBe(true);

    });


});

describe("ValidatePage() Tests", function(){


    var invalid_elements =
            ["",                      //no fields accept blanks
            '-41322',                 //no fields accept negative numbers
            undefined,                //no fields accept undefined
            random_shitstorm(50, 100) //no fields should accept this
            ];

    var all_types = Object.keys(limits);

    var page_names = ['SOLID', 'VOLU', 'GRAV',
        'CONC_MOL', 'CONC_GRAV', 'CONC_VOL',
        'SERIAL', 'EXTERNAL', 'INTERNAL', 'ADDITION'];

    it("It should reject pages with only invalid elements.", function(){

        var test_amount = 50;
        var test_count = 0;
        page_names.forEach(function(el, idx, arr){
            for(var i = 0; i < test_amount; i++){
                var input_fields = Page_To_Inputs(el);
                var input_vals = {};
                input_fields.forEach(function(field, id, arr2){
                   input_vals[field] = invalid_elements[random_int(0, invalid_elements.length)];
                });


                test_count++;
                var start = window.performance.now();
                var validate = new ValidatePage(el);
                var valid = validate.test_page(input_fields);
                var time = window.performance.now() - start;

                if (valid) {
                    console.log(test_count + " time taken = " + time);
                    console.log(p + " expected " + !valid);
                    console.log(input_fields);
                    console.log(validate.error_message);
                }

                expect(valid).toEqual(false);

            }
        });
    });



    it("It should reject pages with values covering all invalid zones", function(){

        var test_amount = 50;
        var test_count = 0;

        var types_to_test = random_types();


        for(var i = 0; i < test_amount; i++){
            types_to_test = random_types();
            page_names.forEach(function(p, i, arr){

                var fields = Page_To_Inputs(p);
                var input_fields = random_field_vals(fields, types_to_test);

                test_count++;
                var start = window.performance.now();
                var validate = new ValidatePage(p);
                var valid = validate.test_page(input_fields);
                var time = window.performance.now() - start;

                if(contains(find_tag(fields, 'mass_answer'), fields) || contains(find_tag(fields, 'liquid_answer'), fields)){
                    if(input_fields[find_tag(fields, 'mass_answer')] > limits['number'].high
                        || input_fields[find_tag(fields, 'liquid_answer')] > limits['number'].high){
                        expect(valid).toEqual(false);
                    }
                }else{

                    if ((valid && types_to_test.length > 0)
                        || !valid && types_to_test.length == 0) {
                        console.log(test_count + " time taken = " + time);
                        console.log(p + " expected " + !valid);
                        console.log(input_fields);
                        console.log(validate.error_message);

                        console.log("===================================================");
                        console.log(types_to_test);
                        console.log("===================================================");

                    }

                    if(types_to_test.length > 0 && !types_to_test.forEach(function(el,i,ar){ return !contains(ar, el)})){
                        expect(valid).toEqual(false);
                    }else{
                        expect(valid).toEqual(true);
                    }
                }
            });
            types_to_test = random_types();
        }


    });

    function random_types(){
        var len = random_int(0, all_types.length);
        var types_to_test = [];
        for(var r = 0; r < len; r++){
            types_to_test.push(all_types[random_int(0, all_types.length)]);
        }
        return types_to_test;
    }

    // describe('Testing random entry generation.', function(){
    //
    //     it('Might be working', function(){
    //         var amount = 5;
    //
    //         for(var i = 0; i < amount; i++){
    //
    //             page_names.forEach(function(page, i, arr){
    //
    //                 var random_answers = random_field_vals(Page_To_Inputs(page), ['percent', 'string']);
    //                 var fields = Page_To_Inputs(page);
    //
    //                 for(var k = 0; k < fields.length; k++){
    //                     console.log(fields[k] + " = " + random_answers[fields[k]]);
    //                 }
    //                 // console.log("random answers "+page+": " + random_answers);
    //                 //
    //                 // console.log(random_answers['solvent_formula']);
    //             });
    //
    //         }
    //     });
    // });
});
