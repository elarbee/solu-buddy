/**
 * Created by Howerton on 2/23/2016.
 */

var ionic_reg = /[(](([A-Z][a-z]?\d*)*)[)](\d*)/g;

var match_ionic = /(\(([A-Z][a-z]?\d*)*\)\d*)*/g;

var match_non_ionic = /([A-Z][a-z]?\d*)+/g;

var good_regex = /^(\d*\(?[A-Z][a-z]?\d*\)?\d*)+$/;
var split_segment_reg = /([A-Z][a-z]?)(\d*)/;
var split_compound_reg = /[A-Z][a-z]?\d*/g;
var outside_parentheses_reg = /([^[\)]+)(?:$|[\(])/g;

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
function Compound(components, qty, formula_str){
    var self = {};

    self.components = components;
    self.compound_atomic_weight = 0;
    self.quantity = qty;
    self.sub_compounds = [];
    self.formula = formula_str;


    /**
     * Returns the molecular weight of the compound multiplied by the quantity of the compound,
     * giving the total molecular weight.
     * @returns {number} Total molecular weight (molecular weight * quantity)
     */
    self.total_molecular_weight = function(){
        return self.molecular_weight() * self.quantity;
    };


    self.add_sub_compounds = function(sub_compounds){

        for(var i = 0; i<sub_compounds.length; i++){
            var pieces = split_sub_compound(sub_compounds[i]);
            var formula = pieces[3] + pieces[1];

            this.sub_compounds.push(string_to_compound(formula));
        }
    };

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

        if(self.sub_compounds.length > 0){
            for(var i = 0; i < self.sub_compounds.length; i++){
                sum += self.sub_compounds[i].total_molecular_weight();
            }
        }
        return sum;
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

    var compound_qty = front_number(input);
    var formula = input;
    var sub_compounds;

    /**
     * Checks to see if the input string has any parentheses. If it does, it has sub-compounds.
     */
    if( /[(](([A-Z][a-z]?\d*)*)[)](\d*)/g.test(input)){
        sub_compounds = string_to_ionic_compounds(input);

        for(var i = 0; i < sub_compounds.length; i++){
            formula = formula.replace(sub_compounds[i], "");
        }
    }
    //Gets segments from the leftover formula.
    var segments = string_to_compound_segments(formula);

    try {
        var components = segments_to_compound_components(segments);
    }catch (e){
        console.log("formula = " + input);
    }
    var comp = new Compound(components, parseInt(compound_qty), input);

    if(sub_compounds != null){
        comp.add_sub_compounds(sub_compounds);
    }

    return comp;

}



/**
 * Creates a compound component from a single element symbol and quantity of the element in the compound.
 *
 *      ex. Water = H2O = {Compound_Component(H, 2), Compound_Component(O, 1)};
 *
 * @param symbol Symbol of individual element.
 * @param qty How many of a particular element in the compound. n n
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

    return self;
}

/**
 * Tests whether the compound formula has a valid format or not.
 *
 * is_valid_formula("nacl") == false
 * is_valid_formula("NaCl") == true
 * is_valid_formula("H2OH") == false
 *
 * @str Formula string to test.
 * @return Returns true if valid, false if invalid.
 *
 * */
function is_valid_formula(str) {

    good_regex.lastIndex = 0;
    var is_valid = good_regex.test(str).valueOf();

    if(!is_valid){
        return false;
    }

    var formulaString = str;
    var qty = 0;


    /* Gets rid of the leading number for validation*/
    if(/^\d+/.test(str)){
        qty = str.match(/^\d+/)[0];
        /* Place remaining substring into formulaString */
        formulaString = str.substring(qty.length);
    }


    if(is_valid){

        var parenthesis_count = (formulaString.match(/\(|\)/g) || []).length;
        var accepted_length = 0;
        var compounds = [];
        /**
         * Has parenthesis.
         */
        if(parenthesis_count > 0){

            /**
             * Uneven number of parenthesis, return false.
             */
            if(parenthesis_count % 2 != 0){
                return false;
            }

            var temp = string_to_ionic_compounds(formulaString);

            /**
             * For each ionic compound, break it down and push normal compounds to array.
             */
            for(var i = 0; i < temp.length; i++){
                var pieces = split_sub_compound(temp[i]);
                //Push normal compound from ionic compounds
                compounds.push(pieces[1]);
                //Increment count of compound qty length
                accepted_length += pieces[3].length;
                //Increment count of parenthesis
                accepted_length += 2;
            }

        }else{
            //Formula string is plain compound
            compounds.push(formulaString);

        }

        /**
         * Make sure elements are legal.
         */
        for(var c = 0; c < compounds.length; c++){
            var segments = string_to_compound_segments(compounds[c]);

            for(var e = 0; e < segments.length; e++){

                if(find_element(segment_to_pieces(segments[1])[1]) == null){
                    return false;
                }
                accepted_length += segments[e].length;
            }
        }

        console.log("formula: " + str);
        console.log("string length: " + formulaString.length);
        console.log("accepted length: " + accepted_length);
        /**
         *  All elements are legal by now.
         */
        if(accepted_length == formulaString.length){
            return true;
        }else{
            return false;
        }



        // console.log("formula: " + formulaString);
        // console.log("segments: " + segments);
        // console.log("ionic segments: " + ionic_segments);
        // console.log("length of string: " + formulaString.length);
        // console.log("length of segments: " + sum_string_lengths(segments) + sum_string_lengths(ionic_segments));
        // console.log("accepted segment length: " + accepted_segments_length);
        // console.log("accepted length: " + accepted_length);



        //If the total length of segments obtained from the string are not equal to the original
        //string, then there is an invalid piece.
        //is_valid = sum_string_lengths(segments) + sum_string_lengths(ionic_segments) == formulaString.length;
    }

    return is_valid.valueOf();
}


/**
 * Breaks a segment string down into an array containing the element and quantity
 *      index 0 = element + quantity
 *      index 1 = element
 *      index 2 = quantity
 *
 * @param segment string to break down
 * @returns {Array|{index: number, input: string}} array whos contents are:
 *      [0] = element+quantity
 *      [1] = element
 *      [2] = quantity
 *
 */
function segment_to_pieces(segment){
    var reg = /([A-Z][a-z]?)(\d*)/;
    if(reg.test(segment)){
        return segment.match(reg);
    }else{
        return [];
    }
}

/**
 * Breaks a formula string down into an array of elements and their respective quantities
 * @param str formula string to break down.
 * @returns {Array|{index: number, input: string}} an array of elements concatenated with their quantities
 */
function string_to_compound_segments(str){
    var reg = /[A-Z][a-z]?\d*/g;
    if(reg.test(str)){
        return str.match(reg);
    }else{
        return [];
    }
}


/**
 * Obtains the occurrences of a given formula.
 * @param str Formula string
 * @returns {number} number of times formula occurs.
 */
function front_number(str){

    var form_qty = 1;
    if(/^\d+/g.test(str)){
        //check if input had a qty at the beginning
        form_qty = parseInt(str.match(/^\d+/)[0]);
    }
    return form_qty;
}

/**
 * Sums the length of all strings in an array
 * @param array Array of strings
 * @returns {number} returns total length of all strings in array.
 */
function sum_string_lengths(array){
    var total_length = 0;
    for(var i = 0; i < array.length; i++){
        total_length += array[i].length;
    }
    return total_length;
}


/**
 * Will break down a string containing ionic compounds into ionic compounds
 * with their trailing quantities.
 *
 * Will not accept empty parenthesis or mis-matched parenthesis
 * @param str Formula with ionic compounds (i.e. '(HFe10)13(H2O)4')
 * @returns {Array|{index: number, input: string}} Array of compounds
 *  (i.e. ['(HFe10)13', '(H2O)4'])
 */
function string_to_ionic_compounds(str){
    var reg = /\((([A-Z][a-z]?\d*)+)\)(\d*)/g;
    if(reg.test(str)){
        return str.match(reg);
    }else{
        return [];
    }
}

/**
 * Splits a sub-compound into an array of pieces to use in building ionic compounds.
 *
 * example usage:
 * var water = (H2O)4
 *  var pieces = split_sub_compound(water);
 *
 *          pieces[0] == "(H2O)4";
 *          pieces[1] == "H2O";
 *          pieces[3] == "4";
 *
 * @param str Sub compound to split. Must be enclosed by parentheses with its quantity trailing at the end.
 * @returns {Array|{index: number, input: string}} String array of pieces.
 */
function split_sub_compound(str){
    var pieces = /\((([A-Z][a-z]?\d*)+)\)(\d*)/g.exec(str);
    return pieces;
}

/**
 * Turns an array of formula string segments into Compound_Components
 * @param segments Formula segments, i.e. Fe2, Cl9 (element+qty)
 * @returns {Array} Array of Compound_Components
 */
function segments_to_compound_components(segments){
    var components = [];


    /*
     Populate components array with components created from the parsed string.
     */
    for(var i = 0; i < segments.length; i++){

        //index 0 = element + quantity
        //index 1 = element
        //index 2 = quantity
        var pieces = segment_to_pieces(segments[i]);

        var element = pieces[1]; //get element symbol
        var quantity = parseInt(pieces[2]) || 1; //default qty is 1

        var component = new Compound_Component(element, quantity);

        if(component != undefined){
            components.push(component);
        }
    }

    return components;
}

/**
 * Will
 * @param str
 * @returns {*}
 */
function remove_parentheses(str){
    if(/([^[\)]+)(?:$|[\(])/g.test(str)){
        return /([^[\)]+)(?:$|[\(])/g.exec(str)[0].replace("(", "").replace(")", "");
    }
    else{
        return str;
    }
}

