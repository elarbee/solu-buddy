describe("Element", function() {


    it("Should be able to find the right element using string in double quotes", function() {

        var elements_to_test = ["H", "Mt"];
        var expected_names = ["Hydrogen", "Meitnerium"];
        var expected_numbers = [1, 109];

        for(var i in elements_to_test){
            var element = find_element(elements_to_test[i]);
            expect(element.name).toEqual(expected_names[i]);
            expect(element.number).toEqual(expected_numbers[i]);
        }
    });

    it("Should be able to find the right element using string in single quotes", function() {
        var elements_to_test = ['H', 'Mt'];
        var expected_names = ["Hydrogen", "Meitnerium"];
        var expected_numbers = [1, 109];

        for(var i in elements_to_test){
            var element = find_element(elements_to_test[i]);
            expect(element.name).toEqual(expected_names[i]);
            expect(element.number).toEqual(expected_numbers[i]);
        }
    });

    it("should return undefined if no element is found.", function() {

        var invalid_elements = ['Nl', '55', '?', 'Hello!', 'Hz'];

        for(var i in invalid_elements){
            var element = find_element(invalid_elements[i]);
            expect(element).toEqual(undefined);
        }
    });

});
