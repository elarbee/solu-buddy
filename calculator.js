/**
 * Function for calculating the amount of solute that should be added in order to create a single solution. Handles
 * creating a solution from a solid solute and a liquid solute (both gravimetrically and volumetrically).
 *
 * Example usage:
 *
 * //Create a single solution for NaCl
 * var solution = SingleSolution(.01, 1, 58.44);
 *
 * // Using the same solution we can then easily get the solid and liquid amounts.
 * var solid_mass = solution.solid();
 * var liquid_mass = solution.liquid.mass();
 * var liquid_volume = solution.liquid.volume(.8); // .8 would be the density of the liquid solute
 *
 * @param concentration: the desired concentration of the solution in mol/L (moles per liter).
 * @param solution_volume: the volume of the total solution in Liters.
 * @param molecular_weight: the molecular weight for the solute being used in g/mol (grams per mole.
 */
function SingleSolution(concentration, solution_volume, molecular_weight) {

	var self = {};

	/**
	 * Calculates the mass for the given solid solution. Returns the mass of the solute that should be added
	 * in grams.
	 */
	self.solid = function calculate_solid_mass() {
		return concentration * solution_volume * molecular_weight;
	};

	self.liquid = {}; // Create dictionary that will hold the available liquid functions

	self.liquid.mass = self.solid; // Liquid gravimetric transfer is same as solid
	/**
	 * Calculates the volume of the solution that should be used to reach the desired concentration.
	 *
	 * @param solute_density: The density of the solute is needed in (g/mL).
	 * @return {number} the resulting volume of the solute that should be added and is given in mL ( milliliters).
	 */
	self.liquid.volume = function calculate_liquid_volumetrically(solute_density) {
		return (concentration * solution_volume * molecular_weight) / solute_density;
	};

	return self;
}

/**
 * Calculates the values need to perform a serial dilution for a solution using a previously made solution.
 *
 * Example usage:
 *
 * // Create SerialDilution object, with concentration of original solution.
 * var solution = SerialDilution(.001);
 *
 * // Get the new concentration when we transfer 50 mL, into 250 mL flask and we do it only once.
 * var new_concentration = solution.concentration(50, 250, 1); // equal to .0002
 *
 * // The amount of volume that should be transferred one time to get a solution with .0002 mol using 250 mL beakers.
 * var volume_to_transfer = solution.volume_transfer(.0002, 250, 1); // equal to 50
 *
 * var number_of_transfers = solution.number_of_transfers(.0002, 250, 50); // equal to 1
 *
 * @return {number} the concentration of the new solution in mol (moles).
 */
function SerialDilution(original_concentration){
	var self = {};

	/**
	 * Calculate the concentration for the new solution.
	 *
	 * @param volume_transferred - the volume that is to be transferred between the flasks at each step.
	 * @param volume_flask - the volume of the flasks that the original solution shall be transferred into.
	 * @param number_of_transfers - the number of times this transfer will happen, most likely the number of flasks
	 *  available.
	 * @returns {number} the concentration for the new solution in moles.
	 */
	self.concentration = function calculate_new_concentration(volume_transferred, volume_flask, number_of_transfers){
		return original_concentration * Math.pow((volume_transferred / volume_flask), number_of_transfers);
	};

	/**
	 * Calculates the amount of the solution that should be transferred between the beakers at each step in the
	 * serial dilution.
	 *
	 * @param new_concentration - the concentration wanted from the new solution, in mol.
	 * @param volume_flask - the volume of the flasks that the original solution shall be transferred into.
	 * @param number_of_transfers - the number of times this transfer will happen, most likely the number of flasks
	 *  available.
	 * @returns {number} the amount of the solution to tranfer.
	 */
	self.volume_transfer = function calculate_volume_transfer(new_concentration, volume_flask, number_of_transfers){
		return Math.pow((new_concentration / original_concentration), 1/number_of_transfers) * volume_flask;
	};

	/**
	 * Calculates the number of times a stock solution should be transferred to flasks of the specified size in order to
	 * create a new solution with the specified concentration.
	 *
	 * @param new_concentration - the concentration wanted from the new solution, given in mol.
	 * @param volume_flask - the volume of the flasks being used for the dilution, given in Liters.
	 * @param volume_transferred - the volume that is to be transferred between the flasks at each step.
	 * @returns {number} the number of times the solution should be transferred between the flasks.
	 */
	self.number_of_transfers = function calculate_number_transfers(new_concentration, volume_flask, volume_transferred){
		return Math.log((new_concentration / original_concentration)) / Math.log((volume_transferred / volume_flask));
	};

	return self;
}