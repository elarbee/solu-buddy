function SingleSolution(concentration, solution_volume, molecular_weight) {
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
	var self = {};

	self.solid = function calculate_solid_mass() {
		/**
		 * Calculates the mass for the given solid solution. Returns the mass of the solute that should be added
		 * in grams.
		 */
		return concentration * solution_volume * molecular_weight;
	};

	self.liquid = {}; // Create dictionary that will hold the available liquid functions

	self.liquid.mass = self.solid; // Liquid gravimetric transfer is same as solid
	self.liquid.volume = function calculate_liquid_volumetrically(solute_density) {
		/**
		 * Calculates the volume of the solution that should be used to reach the desired concentration.
		 *
		 * @param solute_density: The density of the solute is needed in (g/mL).
		 * @return the resulting volume of the solute that should be added and is given in mL ( milliliters).
		 */
		return (concentration * solution_volume * molecular_weight) / solute_density;
	};

	return self;
}