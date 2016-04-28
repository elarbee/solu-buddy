/**
 * Created by root on 4/6/16.
 */
/**
 * Counts the number of significant digits.
 * @param n Number string of which to count the number of significant digits.
 * @returns {number}
 */
function count_sig_figs(n) {
    var log10 = Math.log(10);
    n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
    if (n == 0) return 0;
    while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n

    return Math.floor(Math.log(n) / log10) + 1; //get number of digits
}

/**
 * Rounds a number to a specific number of decimal places.
 *
 * ACCURATE ROUND LIMIT = 13 DECIMAL PLACES. DO NOT GO ABOVE 13.
 *
 * @param num Number to round
 * @param decimals To round to.
 * @returns {string}
 */
function precise_round(num, decimals) {
    decimals = (decimals > 13)? 13 : decimals;
    var t=Math.pow(10, decimals);
    return parseFloat((Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals));
}

/**
 * Gets the minimum number from an array of numbers.
 * @param arr Array of numbers
 * @returns {*} minimum in the array, or 0 if the array is empty.
 */
function find_min(arr){
    if(arr.length == 0){
        return 0;
    }else{
        var min = arr[0];

        for(var i = 1; i < arr.length; i ++){
            if(min > arr[i]){
                min = arr[i];
            }
        }

        return min;
    }
}

/**
 * Calculates the % error between two numbers.
 *
 * @param theoretical Ideal/theoretical/expected number.
 * @param actual Actual number.
 * @returns {number} Percent error between expected and actual. (0-100)
 */
function calculate_error(theoretical, actual){

    return (Math.abs((actual - theoretical)/theoretical)*100);
}


/**
 * Function for calculating amount of solute to add when creating a single solution from a concentrated stock solution.
 * Formula: M1 * V1 = M2 * V2
 *
 * Example Usage:
 *
 * var solute = string_to_formula("NaCl");
 *
 * //create a single dilution using a liquid solute and gravimetric transfer with a known mass %.
 * var mass_to_add = new SingleDilution(1.5, 1).grav_mass(solute, 5);
 *
 * @param target_molarity Target Molarity for final solution.
 * @param target_volume Target volume for final solution in Liters.
 * @constructor
 */
function SingleDilution(target_molarity, target_volume){
    
    var self = {};

    /**
     * Calculates molarity required to achieve a target concentration (target molarity) of solute in a total
     * target volume (target_volume) while diluting a chosen volume in Liters (v1).
     * @param v1 Volume of solute to dilute.
     * @returns {number} Molarity required of solute. (M1)
     */
    self.solute_molarity = function calculate_solute_molarity(v1){
        return (target_molarity * target_volume)/v1;
    };

    /**
     * Calculates volume required to achieve a target concentration (target molarity) of solute in a total
     * target volume (target_volume) while diluting a solute with a specific concentration (M1)
     * @param M1 Molarity of solute to dilute.
     * @returns {number} Volume required of solute in Liters. (v1)
     */
    self.solute_volume = function calculate_solute_volume(M1){
        return (target_molarity * target_volume)/M1;
    };


    /**
     * Calculates mass to gravimetrically transfer when making a solution from a stock concentrated solute when the
     * % mass is known.
     * @param solute Compound object for the solution's solute.
     * @param solute_mass_percent Percentage of mass belonging to the solute.
     * @returns {number} Returns calculated mass to add to the solvent.
     */
    self.grav_mass = function calculate_transferred_gravimetric_mass(solute, solute_mass_percent){
        //mass to add if mass/vol % was 100 for the solute.
        var minimum_mass_to_add = new SingleSolution(target_molarity, target_volume, solute.molecular_weight()).solid();
        return minimum_mass_to_add * (solute_mass_percent/100);
    };

    /**
     * Calculates volume to volumetrically transfer when making a solution from a stock concentrated solute when the
     * % mass and density of solute is known.
     * @param solute Compound object for the solution's solute.
     * @param solute_mass_percent Percentage of mass belonging to the solute.
     * @param density Density of solute.
     * @returns {number} Returns calculated volume to add to the solvent.
     */
    self.vol_transfer = function calculate_transferred_volumetric_volume(solute, solute_mass_percent, density){

        var solution = new SingleSolution(target_molarity, target_volume, solute.molecular_weight());
        //mass to add if mass/vol % was 100 for the solute.
        var minimum_vol_to_add = solution.liquid.volume(density);
        
        return minimum_vol_to_add * (solute_mass_percent/100);
    };

    return self;

}