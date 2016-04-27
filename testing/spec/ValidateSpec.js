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
