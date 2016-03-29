describe("Formula", function() {


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
         expect(is_valid_formula("4H2O")).toEqual(true);
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

        it("should get formula quantity from formula string", function(){
            expect(front_number("4H")).toEqual(4);
            expect(front_number("10NaCl")).toEqual(10);
        });
    });
});
