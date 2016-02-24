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
        print(compound.components[i].element.name);
        print(compound.components[i].get_description());

    }

    print(compound.get_description());
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

    self.get_description = function(){
        var desc = "<br />Compound Description<br />Formula: " + self.get_formula() +
            "<br />Total Atomic Weight: " + self.compound_atomic_weight+"<br />" +
            "Compound Quantity: " + self.quantity + "<br />";
        for(var i = 0; i < self.components.length; i++){
            desc = desc + "Element["+i+"]: "+components[i].element.name + "|| Qty: " +
                components[i].quantity + "<br />";
        }
        return desc;
    };

    self.get_formula = function(){
        var formula = (self.quantity == 1)? "" : self.quantity;
        for(var i = 0; i < self.components.length; i++){
            formula += components[i].element.symbol;
            formula += (components[i].quantity == 1)? "" : components[i].quantity;
        }
        return formula;
    }

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
    if(!/\d*[A-Z]{1}[a-z]?\d*/.test(input)){
        alert("Input: " + input + " is not valid! Please try again.");
    }
    //Regex forces 1 capital letter, 0 or 1 lowercase, and any number of digits proceeding the element
    //TODO: Add error checking to reject duplicate elements
    var segments = input.match(/[A-Z]{1}[a-z]?\d*/g);
    var components = [];
    var compound_qty = 1;

    if(/^\d+/g.test(input)){
        //check if input had a qty at the beginning
        compound_qty = input.match(/^\d+/)[0];
    }

    /*
        Populate components array with components created from the parsed string.
     */
    for(var i = 0; i < segments.length; i++){

        //index 0 = element + quantity
        //index 1 = element
        //index 2 = quantity
        var pieces = segments[i].match(/([A-Z]{1}[a-z]?)(\d*)/);

        var element = pieces[1]; //get element symbol
        var quantity = 1; //default qty is 1

        //checks second position to see if the element had a quantity associated with it. If it did,
        //  quantity is updated to that value. Otherwise, quantity is 1 by default.
        if(pieces[2].length > 0){
            quantity = pieces[2];
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

    self.get_description = function(){
        var desc = "<br />Component Description<br />Element: " + self.element.name +"<br />Quantity: " + self.quantity +
            "<br />Atomic Weight: " + self.get_component_atomic_weight() + "<br />";
        return desc;
    };

    return self;
}

function print(str){
    document.write(str + "<br />");
}