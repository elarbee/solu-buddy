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
        document.write("Components[" + i + "]: " + components[i].element.name + "<br />");
    }

    var compound = Compound(components);

    document.write("Compound weight: " + compound.compound_atomic_weight);
}

/**
 * Stores a full chemical compound constructed from an array of compound components. Array of compound components
 * constructed using the string_to_components(string) function.
 *
 * Example use:
 *
 *          //create components
 *          var components = string_to_components(input);
 *          //create compound
 *          var compound = Compound(components);
 *
 *
 *          //using compound
 *          var weight = compound.compound_atomic_weight;
 *
 *          //listing components
 *          for(var i = 0; i < compound.components.length; i++){
 *              document.write("Component["+i+"]: " + compound.components[i].name;
 *          }
 *
 * @param components Array of components used to make the compound.
 * @constructor
 */
function Compound(components){
    var self = {};

    self.components = components;
    self.compound_atomic_weight = 0;

    for(var o = 0; o < self.components.length; o++){
        self.compound_atomic_weight += self.components[o].get_component_atomic_weight();
    }

    return self;
}


/**
 * Splits a single formula input string into an array of "component" strings consisting of just the element
 * followed by quantity.
 *
 *  Example uses:
 *
 *      //Get individual elements and their respective quantities from NaCl
 *      var components = string_to_components('NaCl');
 *
 *      var table_salt_compound = Compound(components);
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


        var component = new Compound_Component(element, quantity);
        components.push(component);
    }

    document.writeln("Components length: " + components.length + "<br />");

    for(var i = 0; i < components.length; i++){
        document.writeln("Component["+i+"]: " + components[i].get_component_atomic_weight() + "<br />");
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
    self.get_component_atomic_weight = function(){
        return (self.element.atomic_weight * self.quantity);
    };

    return self;
}

function test(){
    document.write("check<br />");
}

