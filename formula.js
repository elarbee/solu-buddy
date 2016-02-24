/**
 * Created by Howerton on 2/23/2016.
 */


/**
 * Just for testing, pay no attention to me!
 */
function no_args_make_compound(){
    var input = prompt("Enter compound");
    //var silver = find_element(input);
   // document.write("Silver total weight: " + silver.atomic_weight + "<br />");

    var component = Compound_Component(input, 5);
    document.write("Compound total weight: " + component.component_atomic_weight() + "<br />");

}

/**
 * Stores a full chemical compound constructed from a single input string.
 * @param input String to parse
 * @constructor
 */
function Compound(input){
    var self = {};
    self.components = string_to_compound(input);

    for(var o = 0; o < components.length; o++){
        document.write(components.element.name);
    }
    self.total_atomic_weight = function calculate_total_atomic_weight(){
        var sum;
        for(var i = 0; i < self.components.length; i++){
            sum += self.components[i].component_atomic_weight();
        }
    }


}

/**
 * Separates individual elements and their respective quantities from the compound string.
 * @param parameters String to parse (i.e. NaCl, H2O)
 * @returns returns a Compound "object".
 */
function string_to_compound(parameters){
    var input = parameters.input;

    var components;

    for(var i = 0; i < input.length; i++ ){

        //found start of compound
        if(is_uppercase(input.charAt(i))){
            //check next position to see if it's a number
            if(is_numeric(input.charAt(i+1))){
                //if true, entire symbol has been found including number
                components.push(Compound_Component(input.charAt(i), input.charAt(i+1)));
                document.write("Element found: " + input.charAt(i) + " quantity = " + input.charAt(i+1));
            }else{
                //not numeric, check if uppercase
                if(is_uppercase(input.charAt(i+1))){
                    //found next symbol with no quantity for last. create element from last piece with default
                    // quantity 1 and continue
                    components.push(Compound_Component(input.charAt(i), 1));
                    i += 1; //set i to current position
                    document.write("Element found: " + input.charAt(i) + " quantity = " + 1);
                    continue;
                }
                else{
                    //is lowercase, check next (i+2) for quantity
                    if(is_numeric(input.charAt(i+2))){
                        //next char was quantity, finish Upper-lower symbol with quantity
                        components.push(Compound_Component(input.charAt(i) + input.charAt(i+1), input.charAt(i+2)));

                        document.write("Element found: " + input.charAt(i)+input.charAt(i+1) + " quantity = " + input.charAt(i+2));

                        i += 2; //update i
                        continue;
                    }else{
                        if(is_uppercase(input.charAt(i+2))){
                            //next element found, no quantity found. Use default quantity 1
                            components.push(Compound_Component(input.charAt(i)+input.charAt(i+1), 1));

                            document.write("Element found: " + input.charAt(i)+input.charAt(i+1) + " quantity = " + 1);

                            i += 1; //set i to current position
                            continue;
                        }else{
                            //found an upper-lower-lower combination, raise error
                            alert("Error with symbol: " + input.charAt(i) + input.charAt(i+1) + input.charAt(i+2));
                            continue;
                        }
                    }

                }
            }
        }
    }

    return components;
}

/**
 * Tests whether a char is numeric or not.
 * @param char Character to test
 * @returns {boolean} true if numeric, false otherwise
 */
function is_numeric(char){
    if (!isNaN(char * 1)){
        return true;
    }else{
        return false;
    }
}

/**
 * Tests whether a char is uppercase or not.
 * @param char Character to test.
 * @returns {boolean} True if uppercase, false if lowercase.
 */
function is_uppercase(char){
    if (!isNaN(char * 1)){
        alert('character is numric');
    }else{
        if (char == char.toUpperCase()) {
            return true;
        }
        if (char == char.toLowerCase()){
            return false;
        }
    }
}

/**
 * Creates a compound component from a single element symbol and number of occurrences of the element in the compound.
 *
 *      ex. Water = H2O = {Compound_Component(H, 2), Compound_Component(O, 1)};
 * @param symbol Symbol of individual element.
 * @param occurrences How many of a particular element in the compound.
 * @constructor New compound component.
 */
function Compound_Component(symbol, occurrences){
    //if(!is_uppercase(symbol.charAt(0))){
    //    alert("Symbol found without uppercase beginning letter.");
    //}
    var self = {};
    self.element = find_element(symbol);
    self.occurences = occurrences;
    self.component_atomic_weight = function calculate_atomic_weight() {

        document.write(self.element.atomic_weight * self.occurences+"<br />");
        return (self.element.atomic_weight * self.occurences);
    }
}

