/**
 * Created by Howerton on 2/23/2016.
 */


/**
 * Just for testing, pay no attention to me!
 */
function no_args_make_compound(){
    var input = prompt("Enter compound");

    var compound = string_to_compound(input);

    for(var i = 0; i < compound.components.length; i++){
        document.write("Components[" + i + "]: " + compound.components[i].element.name + "<br />");
    }

    document.write("Compound weight: " + compound.compound_atomic_weight + "<br />");
    document.write("Compound quantity: " + compound.quantity + "<br />");
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
function Compound(components, qty){
    var self = {};

    self.components = components;
    self.compound_atomic_weight = 0;
    self.quantity = qty;

    for(var o = 0; o < self.components.length; o++){
        self.compound_atomic_weight += self.components[o].get_component_atomic_weight();
    }
    self.compound_atomic_weight *= self.quantity;

    return self;
}


/**
 * Constructs a compound from a single input string by separating the elements and their respective quantities and building
 * a "Compound" object using that information.
 *
 *  Example uses:
 *
 *      //Create water compound using formula 'H2O'
 *      var water = string_to_compound('H2O');
 *
 *      //Create compound for table salt using formula 'NaCl'
 *      var table_salt = string_to_compound('NaCl');
 *
 * @param input Formula string collected from user. (i.e. H2O or NaCl)
 * @returns {Compound} Compound object
 */
function string_to_compound(input){
    //Regex forces 1 capital letter, 0 or 1 lowercase, and any number of digits proceeding the element
    var segments = input.match(/[A-Z]{1}[a-z]?\d*/g);
    var components = [];
    var compound_qty = 1;

    if(/^\d+/g.test(input)){
        //check if input had a qty at the beginning
        compound_qty = input.match(/^\d+/)[0];
    }

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

    var comp = new Compound(components, compound_qty);
    return comp;
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

