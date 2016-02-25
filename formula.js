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

    /**
     * Calculates the molecular weight of the compound as the summation of each element's atomic weight multiplied by
     * the element's quantity.
     *  i.e. molecular_weight = SUM(element[0...n].atomic_weight * #(element[0...n]))
     * @returns {number} Molecular weight of the compound.
     */
    self.molecular_weight = function(){
        var sum = 0;
        for(var o = 0; o < self.components.length; o++){
            sum += self.components[o].get_component_atomic_weight();
        }
        return sum;
    };

    /**
     * Returns the molecular weight of the compound multiplied by the quantity of the compound,
     * giving the total molecular weight.
     * @returns {number} Total molecular weight (molecular weight * quantity)
     */
    self.total_molecular_weight = function(){
        return self.molecular_weight() * self.quantity;
    };

    /**
     * Creates a string description of the compound and returns it. Includes: formula, molecular weight,
     * quantity of the compound, total molecular weight, and information on each component (element name and quantity).
     *
     * Can be used to verify accuracy when debugging.
     * @returns {string} Description string.
     */
    self.get_description = function(){
        var desc = "<br />Compound Description<br />Formula: " + self.formula() +
            "<br />Molecular Weight: " + self.molecular_weight()+"<br />" +
            "Compound Quantity: " + self.quantity + "<br />Total Molecular Weight: " +
            self.total_molecular_weight() + "<br />";
        for(var i = 0; i < self.components.length; i++){
            desc = desc + "Element["+i+"]: "+components[i].element.name + "|| Qty: " +
                components[i].quantity + "<br />";
        }
        return desc;
    };

    /**
     * Creates the formula for the compound using component elements and their respective quantities.
     *
     * Example Usage
     *
     *  var water = new Compound('H2O');
     *
     *  var formula = water.formula();
     *
     *  -> formula == 'H2O'
     *
     * @returns {string} Formula for the compound.
     */
    self.formula = function(){
        var formula = (self.quantity == 1)? "" : self.quantity;
        for(var i = 0; i < self.components.length; i++){
            formula += components[i].element.symbol;
            formula += (components[i].quantity == 1)? "" : components[i].quantity;
        }
        return formula;
    };

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

    //displays alert if input is invalid.
    if(!/\d*[A-Z]{1}[a-z]?\d*/.test(input)){
        alert("Input: " + input + " is not valid! Please try again.");
    }
    //Regex forces 1 capital letter, 0 or 1 lowercase, and any number of digits proceeding the element
    //TODO: Add error checking to reject duplicate elements
    var segments = input.match(/[A-Z]{1}[a-z]?\d*/g);
    var components = [];

    var compound_qty = 1; //default value = 1


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
        var quantity = pieces[2] || 1; //default qty is 1

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

    /**
     * Calculates total component atomic weight as the product of the element's atomic weight and the quantity.
     *
     * @returns {number} Total atomic weight of the component (element.atomic_weight * quantity)
     */
    self.get_component_atomic_weight = function(){
        return (self.element.atomic_weight * self.quantity);
    };

    /**
     * Creates a description of the component using information including: element name, quantity, and total atomic weight.
     * @returns {string} The component description as a string.
     */
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