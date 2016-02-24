/**
 * Created by Howerton on 2/23/2016.
 */


/**
 * Just for testing, pay no attention to me!
 */
function no_args_make_compound(){
    var input = prompt("Enter compound");


    var components = string_to_components(input);

    for(var i = 0; i < components.length; i++){
        document.write("Compounds contents " + i + ": " + components[i].element.name + "<br />");
    }

    var compound = Compound(components);

    document.write("Compound weight: " + compound.total_atomic_weight());
}

/**
 * Stores a full chemical compound constructed from a single input string.
 * @param input String to parse
 * @constructor
 */
function Compound(components){
    var self = {};

    self.components = components;

    //print names of elements for debug purposes.
    for(var o = 0; o < components.length; o++){
        document.write("Component " + o + ": " + components[o].element.name + "<br />");
    }

    self.total_atomic_weight = function calculate_total_atomic_weight(){
        var sum;
        for(var i = 0; i < self.components.length; i++){
            sum += self.components[i].total_atomic_weight;
        }
    }
}


/**
 * Splits a single formula input string into an array of "component" strings consisting of just the element
 * followed by quantity.
 *
 *  Example uses:
 *
 *      //Get individual elements and their respective quantities from NaCl
 *      var compounds = string_to_components('NaCl');
 *
 *
 * @param input Formula string collected from user. (i.e. H2O or NaCl)
 * @returns {Array|{index: number, input: Compound_Component()}} Array of compound components
 */
function string_to_components(input){
    //Regex forces 1 capital letter, 0 or 1 lowercase, and any number of digits proceeding the element
    var segments = input.match(/[A-Z]{1}[a-z]?\d*/g);
    var components = [];

    for(var i = 0; i < segments.length; i++){
        //obtain element using regex
        var element = segments[i].match(/[A-Z]{1}[a-z]?/g)[0];

        //default is 1
        var quantity = 1;

        //tests the string to see if it has a quantity associated with the element using
        //  the regex.test(string) function. If there is a number, use as quantity. Else, defeault is 1.
        if(/\d+$/.test(segments[i])){
            quantity = segments[i].match(/\d+$/)[0];
        }

        components.push(Compound_Component(element, quantity));
    }

    return components;
}


/**
 * Creates a compound component from a single element symbol and quantity of the element in the compound.
 *
 *      ex. Water = H2O = {Compound_Component(H, 2), Compound_Component(O, 1)};
 *
 * @param symbol Symbol of individual element.
 * @param qty How many of a particular element in the compound.
 * @constructor New compound component.
 */
function Compound_Component(symbol, qty){

    var self = {};
    self.element = find_element(symbol);
    self.quantity = qty;
    self.total_atomic_weight = (self.element.atomic_weight * self.quantity);

    document.writeln("Element: " + self.element.name + " Quantity: " + self.quantity + "<br />");
    document.write("Total atomic weight: " + self.total_atomic_weight + "<br />");

}

