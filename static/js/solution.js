/**
 * Created by Howerton on 3/31/2016.
 */
function Solution(solute, solvent, volume, solution_concentration){
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