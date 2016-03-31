describe("Formula parsing and validation", function() {

    describe("is_valid_formula(str) function testing", function() {

          it("Should be able to validate a simple formula string", function () {
             expect(is_valid_formula("NaCl")).toEqual(true);
             expect(is_valid_formula("HNa")).toEqual(true);
             expect(is_valid_formula("HCl")).toEqual(true);
             expect(is_valid_formula("FeO")).toEqual(true);
    
          });
    
          it("Should be able to validate a formula with numbers", function () {
             expect(is_valid_formula("H2O")).toEqual(true);
             expect(is_valid_formula("Na2Cl13")).toEqual(true);
             expect(is_valid_formula("H2Cl15")).toEqual(true);
             expect(is_valid_formula("NaCl2H")).toEqual(true);
    
          });
    
          it("Should be able to validate a formula with numbers in front (multiple compounds)", function () {
             expect(is_valid_formula('4H2O')).toEqual(true);
             expect(is_valid_formula("5Na2Cl13")).toEqual(true);
             expect(is_valid_formula("13H2Cl15")).toEqual(true);
             expect(is_valid_formula("200NaCl2H")).toEqual(true);

          });
    
          it("should be able to reject duplicate elements", function () {
             expect(is_valid_formula("NaHH")).toEqual(false);
             expect(is_valid_formula("4NaHH")).toEqual(false);
             expect(is_valid_formula("Na2H4H5")).toEqual(false);
             expect(is_valid_formula("NaHClH")).toEqual(false);
             expect(is_valid_formula("NaClNa")).toEqual(false);
    
          });
    
          it("should be able to reject insufficient elements", function () {
             expect(is_valid_formula("")).toEqual(false);
             expect(is_valid_formula("na")).toEqual(false);
             expect(is_valid_formula("nahcl")).toEqual(false);
          });
    
          it("should be able to reject formulas with lowercase elements", function () {
             expect(is_valid_formula("Nacl")).toEqual(false);
             expect(is_valid_formula("H2o")).toEqual(false);
             expect(is_valid_formula("h2O")).toEqual(false);
          });
    });

    describe("front_number(str) function testing", function() {

        it("should obtain the formula quantity for a formula string", function () {
            expect(front_number("4NaCl")).toEqual(4);
            expect(front_number("NaCl")).toEqual(1);
            expect(front_number("Na200Cl")).toEqual(1);
        });

    });

    describe("string_to_compound_segments(str) function testing", function() {

        it("should break down a simple formula into its elements", function () {

            var test1 = "NaCl";
            expect(string_to_compound_segments(test1).length).toEqual(2);
            expect(string_to_compound_segments(test1)[0]).toEqual("Na");
            expect(string_to_compound_segments(test1)[1]).toEqual("Cl");

        });

        it("should break down a complex formula into its elements and respective quantities", function () {

            var test2 = "4H2ONa6Cl";
            expect(string_to_compound_segments(test2).length).toEqual(4);
            expect(string_to_compound_segments(test2)[0]).toEqual("H2");
            expect(string_to_compound_segments(test2)[1]).toEqual("O");
            expect(string_to_compound_segments(test2)[2]).toEqual("Na6");
            expect(string_to_compound_segments(test2)[3]).toEqual("Cl");

        });

    });

    describe("segment_to_pieces(segment) function testing", function() {

        it("should break down a simple element segment into its quantity and element", function () {

            var test1 = "Cl2";
            expect(segment_to_pieces(test1).length).toEqual(3);
            expect(segment_to_pieces(test1)[0]).toEqual("Cl2");
            expect(segment_to_pieces(test1)[1]).toEqual("Cl");
            expect(segment_to_pieces(test1)[2]).toEqual("2");

        });

        it("should break down a simple element segment without a leading number " +
            "into its quantity and element", function () {

            var test1 = "Fe";
            expect(segment_to_pieces(test1).length).toEqual(3);
            expect(segment_to_pieces(test1)[0]).toEqual("Fe");
            expect(segment_to_pieces(test1)[1]).toEqual("Fe");
            expect(segment_to_pieces(test1)[2]).toEqual("");

        });

        it("should break down a simple element segment into its quantity and element", function () {

            var test1 = "H200";
            expect(segment_to_pieces(test1).length).toEqual(3);
            expect(segment_to_pieces(test1)[0]).toEqual("H200");
            expect(segment_to_pieces(test1)[1]).toEqual("H");
            expect(segment_to_pieces(test1)[2]).toEqual("200");

        });


    });

    describe("sum_string_lengths(array) function testing", function() {

        it("should correctly sum the lengths of all strings in an array", function () {
            expect(sum_string_lengths(["o", "hi", "say", "cano", "youou"])).toEqual(15);
        });

    });

});

describe("compound creation", function(){

    describe("Compound creation", function () {

        it("should be able to create simple compounds", function () {

            var comp1 = string_to_compound("NaCl");
            expect(comp1.components[0].element.symbol).toEqual("Na");
            expect(comp1.components[0].quantity).toEqual(1);

            expect(comp1.components[1].element.symbol).toEqual("Cl");
            expect(comp1.components[1].quantity).toEqual(1);

            expect(comp1.formula()).toEqual("NaCl");
            expect(comp1.quantity).toEqual(1);
            expect(comp1.molecular_weight()).toEqual(58.4427);
            expect(comp1.total_molecular_weight()).toEqual(58.4427);


        });

        it("should be able to create compounds of more than 1 quantity", function () {

            var comp1 = string_to_compound("4NaCl");
            expect(comp1.components[0].element.symbol).toEqual("Na");
            expect(comp1.components[0].quantity).toEqual(1);

            expect(comp1.components[1].element.symbol).toEqual("Cl");
            expect(comp1.components[1].quantity).toEqual(1);

            expect(comp1.formula()).toEqual("4NaCl");
            expect(comp1.quantity).toEqual(4);
            expect(comp1.molecular_weight()).toEqual(58.4427);
            expect(comp1.total_molecular_weight()).toEqual(233.7708);


        });

        //TODO: make more tests here. need to test more complex compounds


    });

    describe("Compound components", function(){

        it("Should be able to create components with large quantities " +
            "and correctly compute total atomic weight", function () {

            expect(new Compound_Component("Fe", 2).get_component_atomic_weight()).toEqual(111.69);

        });

    });

});
