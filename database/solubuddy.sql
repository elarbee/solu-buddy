--
-- Database: `solubuddy`
--

-- --------------------------------------------------------

--
-- Table structure for table `solutions`
--

CREATE TABLE IF NOT EXISTS `single_solution_solid` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Solvent_Identity` varchar(20) NOT NULL,
  `Solute_Identity` varchar(20) NOT NULL,
  `Solute_Weight` decimal(10,3) NOT NULL,
  `Solution_Total_Volume` decimal(10, 4) NOT NULL,
  `Solution_Concentration` decimal(10,2) NOT NULL,
  `Mass_Solute_Add` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `single_solution_liquid_grav` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Solvent_Identity` varchar(20) NOT NULL,
  `Solute_Identity` varchar(20) NOT NULL,
  `Solute_Weight` decimal(10,3) NOT NULL,
  `Solution_Total_Volume` decimal(10, 4) NOT NULL,
  `Solution_Concentration` decimal(10,2) NOT NULL,
  `Mass_Solute_Add` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `single_solution_liquid_vol` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Solvent_Identity` varchar(20) NOT NULL,
  `Solute_Identity` varchar(20) NOT NULL,
  `Solute_Weight` decimal(10,3) NOT NULL,
  `Solute_Density` decimal(10,3) NOT NULL,
  `Solution_Total_Volume` decimal(10, 4) NOT NULL,
  `Solution_Concentration` decimal(10,2) NOT NULL,
  `Volume_Solute_Add` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `serial_dilution` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Solvent_Identity` varchar(20) NOT NULL,
  `Solute_Identity` varchar(20) NOT NULL,
  `Solute_Weight` decimal(10,3) NOT NULL,
  `Dilution_Flask_Volume` decimal(10, 4) NOT NULL,
  `Number_Flasks` int(11) NOT NULL,
  `Volume_Transfer` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)

) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `calibration_external` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Solvent_Identity` varchar(20) NOT NULL,
  `Analyte_Identity` varchar(20) NOT NULL,
  `Analyte_Weight` decimal(10,3) NOT NULL,
  `Unknown_Name` decimal(10,3) NOT NULL,
  `Number_Standards` int(11) NOT NULL,
  `Flask_Volumes` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `calibration_addition` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Solvent_Identity` varchar(20) NOT NULL,
  `Analyte_Identity` varchar(20) NOT NULL,
  `Analyte_Weight` decimal(10,3) NOT NULL,
  `Unknown_Name` decimal(10,3) NOT NULL,
  `Number_Standards` int(11) NOT NULL,
  `Flask_Volumes` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

CREATE TABLE IF NOT EXISTS `calibration_internal` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Account_ID` int(11) NOT NULL,
  `Analyte_Solution_ID` int(11) NOT NULL,
  `Analyte_Solution_Type` varchar(20) NOT NULL,
  `Internal_Standard_Solution_ID` int(11) NOT NULL,
  `Internal_Standard_Solution_Type` varchar(20) NOT NULL,
  `Unknown_Name` varchar(20) NOT NULL,
  `Number_Standards` int(11) NOT NULL,
  `Flask_Volumes` decimal(10,4) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Table structure for table `accounts`
--

CREATE TABLE IF NOT EXISTS `accounts` (
  `ID` int(11) NOT NULL,
  `Username` varchar(25) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `First_Name` varchar(25) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


-- --------------------------------------------------------

--
-- Table structure for table `elements`
--

CREATE TABLE IF NOT EXISTS `elements` (
  `Name` varchar(20) NOT NULL,
  `Symbol` varchar(3) NOT NULL,
  `Atomic_Mass` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `elements`
--

INSERT INTO `elements` (`Name`, `Symbol`, `Atomic_Mass`) VALUES
(' Hydrogen', ' H ', 1.00794),
(' Helium', ' He', 4.0026),
(' Lithium', ' Li', 6.941),
(' Beryllium', ' Be', 9.01218),
(' Boron', ' B ', 10.811),
(' Carbon', ' C ', 12.0107),
(' Nitrogen', ' N ', 14.0067),
(' Oxygen', ' O ', 15.9994),
(' Fluorine', ' F ', 18.9984),
(' Neon', ' Ne', 20.1797),
(' Sodium', ' Na', 22.9898),
(' Magnesium', ' Mg', 24.305),
(' Aluminum or Alumini', ' Al', 26.9815),
(' Silicon', ' Si', 28.0855),
(' Phosphorus', ' P ', 30.9738),
(' Sulfur', ' S ', 32.065),
(' Chlorine', ' Cl', 35.453),
(' Argon', ' Ar', 39.948),
(' Potassium', ' K ', 39.0983),
(' Calcium', ' Ca', 40.078),
(' Scandium', ' Sc', 44.9559),
(' Titanium', ' Ti', 47.867),
(' Vanadium', ' V ', 50.9415),
(' Chromium', ' Cr', 51.9961),
(' Manganese', ' Mn', 54.938),
(' Iron', ' Fe', 55.845),
(' Cobalt', ' Co', 58.9332),
(' Nickel', ' Ni', 58.6934),
(' Copper', ' Cu', 63.546),
(' Zinc', ' Zn', 65.38),
(' Gallium', ' Ga', 69.723),
(' Germanium', ' Ge', 72.64),
(' Arsenic', ' As', 74.9216),
(' Selenium', ' Se', 78.96),
(' Bromine', ' Br', 79.904),
(' Krypton', ' Kr', 83.798),
(' Rubidium', ' Rb', 85.4678),
(' Strontium', ' Sr', 87.62),
(' Yttrium', ' Y ', 88.9059),
(' Zirconium', ' Zr', 91.22),
(' Niobium', ' Nb', 92.9064),
(' Molybdenum', ' Mo', 95.96),
(' Technetium', ' Tc', 98),
(' Ruthenium', ' Ru', 101.07),
(' Rhodium', ' Rh', 102.906),
(' Palladium', ' Pd', 106.42),
(' Silver', ' Ag', 107.868),
(' Cadmium', ' Cd', 112.411),
(' Indium', ' In', 114.818),
(' Tin', ' Sn', 118.71),
(' Antimony', ' Sb', 121.76),
(' Tellurium', ' Te', 127.6),
(' Iodine', ' I ', 126.904),
(' Xenon', ' Xe', 131.293),
(' Cesium', ' Cs', 132.905),
(' Barium', ' Ba', 137.327),
(' Lanthanum', ' La', 138.905),
(' Cerium', ' Ce', 140.116),
(' Praseodymium', ' Pr', 140.908),
(' Neodymium', ' Nd', 144.242),
(' Promethium', ' Pm', 145),
(' Samarium', ' Sm', 150.36),
(' Europium', ' Eu', 151.964),
(' Gadolinium', ' Gd', 157.25),
(' Terbium', ' Tb', 158.925),
(' Dysprosium', ' Dy', 162.5),
(' Holmium', ' Ho', 164.93),
(' Erbium', ' Er', 167.259),
(' Thulium', ' Tm', 168.934),
(' Ytterbium', ' Yb', 173.054),
(' Lutetium', ' Lu', 174.967),
(' Hafnium', ' Hf', 178.49),
(' Tantalum', ' Ta', 180.948),
(' Tungsten', ' W ', 183.84),
(' Rhenium', ' Re', 186.207),
(' Osmium', ' Os', 190.23),
(' Iridium', ' Ir', 192.217),
(' Platinum', ' Pt', 195.084),
(' Gold', ' Au', 196.967),
(' Mercury', ' Hg', 200.59),
(' Thallium', ' Tl', 204.383),
(' Lead', ' Pb', 207.2),
(' Bismuth', ' Bi', 208.98),
(' Polonium', ' Po', 209),
(' Astatine', ' At', 210),
(' Radon', ' Rn', 222),
(' Francium', ' Fr', 223),
(' Radium', ' Ra', 226),
(' Actinium', ' Ac', 227),
(' Thorium', ' Th', 232.038),
(' Protactinium', ' Pa', 231.036),
(' Uranium', ' U ', 238.029),
(' Neptunium', ' Np', 237),
(' Plutonium', ' Pu', 244),
(' Americium', ' Am', 243),
(' Curium', ' Cm', 247),
(' Berkelium', ' Bk', 247),
(' Californium', ' Cf', 251),
(' Einsteinium', ' Es', 252),
(' Fermium', ' Fm', 257),
(' Mendelevium', ' Md', 258),
(' Nobelium', ' No', 259),
(' Lawrencium', ' Lr', 262);

-- --------------------------------------------------------

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
    MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;

ALTER TABLE `serial_dilution`
    CHANGE `Solute_Weight` `Solution_Molarity` decimal(10,3);

ALTER TABLE `calibration_internal`
    DROP COLUMN `Analyte_Solution_ID`;

ALTER TABLE `calibration_internal`
    DROP COLUMN `Internal_Standard_Solution_ID`;

ALTER TABLE `calibration_internal`
    CHANGE `Analyte_Solution_Type` `Analyte_Identity` varchar(20);

ALTER TABLE `calibration_internal`
    CHANGE `Internal_Standard_Solution_Type` `Internal_Standard_Solution_Identity` varchar(20);

ALTER TABLE `calibration_internal`
    ADD COLUMN `Analyte_Weight` decimal(10, 3);

ALTER TABLE `calibration_internal`
    CHANGE `Analyte_Weight` `Analyte_Molarity` decimal(10, 3);

ALTER TABLE `calibration_internal`
    DROP COLUMN `Unknown_Name`;

ALTER TABLE `calibration_external`
    DROP COLUMN `Unknown_Name`;

ALTER TABLE `calibration_external`
  ADD COLUMN `Analyte_Molarity` DECIMAL(10, 3);

ALTER TABLE `calibration_addition`
    DROP COLUMN `Solvent_Identity`;

ALTER TABLE `calibration_addition`
    CHANGE `Analyte_Weight` `Analyte_Molarity` decimal(10, 3);

ALTER TABLE `calibration_addition`
  ADD COLUMN `Unknown_Volume` DECIMAL(10, 3);

ALTER TABLE `calibration_internal`
  CHANGE `Analyte_Weight` `Internal_Molarity` decimal(10,3);

ALTER TABLE `calibration_addition`
  MODIFY Unknown_Name varchar(20);

