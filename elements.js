/**
 * @author William Robert Howerton III
 * Feb. 23, 2016
 */

/**
 * Just for testing, pay no attention to me!
 */
function no_args_find_element(){
    var input = prompt("What element do you want?");
    document.write("Atomic Weight of Silver: " + elements_array[input].atomic_weight + "<br />");
    var message = "Atomic weight of " + input + " is " + elements_array[input].atomic_weight + "<br />";
    document.write(message);
}

var Hydrogen = {
    number:1,
    atomic_weight:1.0079,
    name:'Hydrogen',
    symbol:'H',
    group:1
};
var Helium = {
    number:2,
    atomic_weight:4.0026,
    name:'Helium',
    symbol:'He',
    group:18
};
var Lithium = {
    number:3,
    atomic_weight:6.941,
    name:'Lithium',
    symbol:'Li',
    group:1
};
var Beryllium = {
    number:4,
    atomic_weight:9.0122,
    name:'Beryllium',
    symbol:'Be',
    group:2
};
var Boron = {
    number:5,
    atomic_weight:10.811,
    name:'Boron',
    symbol:'B',
    group:13
};
var Carbon = {
    number:6,
    atomic_weight:12.0107,
    name:'Carbon',
    symbol:'C',
    group:14
};
var Nitrogen = {
    number:7,
    atomic_weight:14.0067,
    name:'Nitrogen',
    symbol:'N',
    group:15
};
var Oxygen = {
    number:8,
    atomic_weight:15.9994,
    name:'Oxygen',
    symbol:'O',
    group:16
};
var Fluorine = {
    number:9,
    atomic_weight:18.9984,
    name:'Fluorine',
    symbol:'F',
    group:17
};
var Neon = {
    number:10,
    atomic_weight:20.1797,
    name:'Neon',
    symbol:'Ne',
    group:18
};
var Sodium = {
    number:11,
    atomic_weight:22.9897,
    name:'Sodium',
    symbol:'Na',
    group:1
};
var Magnesium = {
    number:12,
    atomic_weight:24.305,
    name:'Magnesium',
    symbol:'Mg',
    group:2
};
var Aluminum = {
    number:13,
    atomic_weight:26.9815,
    name:'Aluminum',
    symbol:'Al',
    group:13
};
var Silicon = {
    number:14,
    atomic_weight:28.0855,
    name:'Silicon',
    symbol:'Si',
    group:14
};
var Phosphorus = {
    number:15,
    atomic_weight:30.9738,
    name:'Phosphorus',
    symbol:'P',
    group:15
};
var Sulfur = {
    number:16,
    atomic_weight:32.065,
    name:'Sulfur',
    symbol:'S',
    group:16
};
var Chlorine = {
    number:17,
    atomic_weight:35.453,
    name:'Chlorine',
    symbol:'Cl',
    group:17
};
var Argon = {
    number:18,
    atomic_weight:39.948,
    name:'Argon',
    symbol:'Ar',
    group:18
};
var Potassium = {
    number:19,
    atomic_weight:39.0983,
    name:'Potassium',
    symbol:'K',
    group:1
};
var Calcium = {
    number:20,
    atomic_weight:40.078,
    name:'Calcium',
    symbol:'Ca',
    group:2
};
var Scandium = {
    number:21,
    atomic_weight:44.9559,
    name:'Scandium',
    symbol:'Sc',
    group:3
};
var Titanium = {
    number:22,
    atomic_weight:47.867,
    name:'Titanium',
    symbol:'Ti',
    group:4
};
var Vanadium = {
    number:23,
    atomic_weight:50.9415,
    name:'Vanadium',
    symbol:'V',
    group:5
};
var Chromium = {
    number:24,
    atomic_weight:51.9961,
    name:'Chromium',
    symbol:'Cr',
    group:6
};
var Manganese = {
    number:25,
    atomic_weight:54.938,
    name:'Manganese',
    symbol:'Mn',
    group:7
};
var Iron = {
    number:26,
    atomic_weight:55.845,
    name:'Iron',
    symbol:'Fe',
    group:8
};
var Cobalt = {
    number:27,
    atomic_weight:58.9332,
    name:'Cobalt',
    symbol:'Co',
    group:9
};
var Nickel = {
    number:28,
    atomic_weight:58.6934,
    name:'Nickel',
    symbol:'Ni',
    group:10
};
var Copper = {
    number:29,
    atomic_weight:63.546,
    name:'Copper',
    symbol:'Cu',
    group:11
};
var Zinc = {
    number:30,
    atomic_weight:65.39,
    name:'Zinc',
    symbol:'Zn',
    group:12
};
var Gallium = {
    number:31,
    atomic_weight:69.723,
    name:'Gallium',
    symbol:'Ga',
    group:13
};
var Germanium = {
    number:32,
    atomic_weight:72.64,
    name:'Germanium',
    symbol:'Ge',
    group:14
};
var Arsenic = {
    number:33,
    atomic_weight:74.9216,
    name:'Arsenic',
    symbol:'As',
    group:15
};
var Selenium = {
    number:34,
    atomic_weight:78.96,
    name:'Selenium',
    symbol:'Se',
    group:16
};
var Bromine = {
    number:35,
    atomic_weight:79.904,
    name:'Bromine',
    symbol:'Br',
    group:17
};
var Krypton = {
    number:36,
    atomic_weight:83.8,
    name:'Krypton',
    symbol:'Kr',
    group:18
};
var Rubidium = {
    number:37,
    atomic_weight:85.4678,
    name:'Rubidium',
    symbol:'Rb',
    group:1
};
var Strontium = {
    number:38,
    atomic_weight:87.62,
    name:'Strontium',
    symbol:'Sr',
    group:2
};
var Yttrium = {
    number:39,
    atomic_weight:88.9059,
    name:'Yttrium',
    symbol:'Y',
    group:3
};
var Zirconium = {
    number:40,
    atomic_weight:91.224,
    name:'Zirconium',
    symbol:'Zr',
    group:4
};
var Niobium = {
    number:41,
    atomic_weight:92.9064,
    name:'Niobium',
    symbol:'Nb',
    group:5
};
var Molybdenum = {
    number:42,
    atomic_weight:95.94,
    name:'Molybdenum',
    symbol:'Mo',
    group:6
};
var Technetium = {
    number:43,
    atomic_weight:98,
    name:'Technetium',
    symbol:'Tc',
    group:7
};
var Ruthenium = {
    number:44,
    atomic_weight:101.07,
    name:'Ruthenium',
    symbol:'Ru',
    group:8
};
var Rhodium = {
    number:45,
    atomic_weight:102.9055,
    name:'Rhodium',
    symbol:'Rh',
    group:9
};
var Palladium = {
    number:46,
    atomic_weight:106.42,
    name:'Palladium',
    symbol:'Pd',
    group:10
};
var Silver = {
    number:47,
    atomic_weight:107.8682,
    name:'Silver',
    symbol:'Ag',
    group:11
};
var Cadmium = {
    number:48,
    atomic_weight:112.411,
    name:'Cadmium',
    symbol:'Cd',
    group:12
};
var Indium = {
    number:49,
    atomic_weight:114.818,
    name:'Indium',
    symbol:'In',
    group:13
};
var Tin = {
    number:50,
    atomic_weight:118.71,
    name:'Tin',
    symbol:'Sn',
    group:14
};
var Antimony = {
    number:51,
    atomic_weight:121.76,
    name:'Antimony',
    symbol:'Sb',
    group:15
};
var Tellurium = {
    number:52,
    atomic_weight:127.6,
    name:'Tellurium',
    symbol:'Te',
    group:16
};
var Iodine = {
    number:53,
    atomic_weight:126.9045,
    name:'Iodine',
    symbol:'I',
    group:17
};
var Xenon = {
    number:54,
    atomic_weight:131.293,
    name:'Xenon',
    symbol:'Xe',
    group:18
};
var Cesium = {
    number:55,
    atomic_weight:132.9055,
    name:'Cesium',
    symbol:'Cs',
    group:1
};
var Barium = {
    number:56,
    atomic_weight:137.327,
    name:'Barium',
    symbol:'Ba',
    group:2
};
var Lanthanum = {
    number:57,
    atomic_weight:138.9055,
    name:'Lanthanum',
    symbol:'La',
    group:3
};
var Cerium = {
    number:58,
    atomic_weight:140.116,
    name:'Cerium',
    symbol:'Ce',
    group:101
};
var Praseodymium = {
    number:59,
    atomic_weight:140.9077,
    name:'Praseodymium',
    symbol:'Pr',
    group:101
};
var Neodymium = {
    number:60,
    atomic_weight:144.24,
    name:'Neodymium',
    symbol:'Nd',
    group:101
};
var Promethium = {
    number:61,
    atomic_weight:145,
    name:'Promethium',
    symbol:'Pm',
    group:101
};
var Samarium = {
    number:62,
    atomic_weight:150.36,
    name:'Samarium',
    symbol:'Sm',
    group:101
};
var Europium = {
    number:63,
    atomic_weight:151.964,
    name:'Europium',
    symbol:'Eu',
    group:101
};
var Gadolinium = {
    number:64,
    atomic_weight:157.25,
    name:'Gadolinium',
    symbol:'Gd',
    group:101
};
var Terbium = {
    number:65,
    atomic_weight:158.9253,
    name:'Terbium',
    symbol:'Tb',
    group:101
};
var Dysprosium = {
    number:66,
    atomic_weight:162.5,
    name:'Dysprosium',
    symbol:'Dy',
    group:101
};
var Holmium = {
    number:67,
    atomic_weight:164.9303,
    name:'Holmium',
    symbol:'Ho',
    group:101
};
var Erbium = {
    number:68,
    atomic_weight:167.259,
    name:'Erbium',
    symbol:'Er',
    group:101
};
var Thulium = {
    number:69,
    atomic_weight:168.9342,
    name:'Thulium',
    symbol:'Tm',
    group:101
};
var Ytterbium = {
    number:70,
    atomic_weight:173.04,
    name:'Ytterbium',
    symbol:'Yb',
    group:101
};
var Lutetium = {
    number:71,
    atomic_weight:174.967,
    name:'Lutetium',
    symbol:'Lu',
    group:101
};
var Hafnium = {
    number:72,
    atomic_weight:178.49,
    name:'Hafnium',
    symbol:'Hf',
    group:4
};
var Tantalum = {
    number:73,
    atomic_weight:180.9479,
    name:'Tantalum',
    symbol:'Ta',
    group:5
};
var Tungsten = {
    number:74,
    atomic_weight:183.84,
    name:'Tungsten',
    symbol:'W',
    group:6
};
var Rhenium = {
    number:75,
    atomic_weight:186.207,
    name:'Rhenium',
    symbol:'Re',
    group:7
};
var Osmium = {
    number:76,
    atomic_weight:190.23,
    name:'Osmium',
    symbol:'Os',
    group:8
};
var Iridium = {
    number:77,
    atomic_weight:192.217,
    name:'Iridium',
    symbol:'Ir',
    group:9
};
var Platinum = {
    number:78,
    atomic_weight:195.078,
    name:'Platinum',
    symbol:'Pt',
    group:10
};
var Gold = {
    number:79,
    atomic_weight:196.9665,
    name:'Gold',
    symbol:'Au',
    group:11
};
var Mercury = {
    number:80,
    atomic_weight:200.59,
    name:'Mercury',
    symbol:'Hg',
    group:12
};
var Thallium = {
    number:81,
    atomic_weight:204.3833,
    name:'Thallium',
    symbol:'Tl',
    group:13
};
var Lead = {
    number:82,
    atomic_weight:207.2,
    name:'Lead',
    symbol:'Pb',
    group:14
};
var Bismuth = {
    number:83,
    atomic_weight:208.9804,
    name:'Bismuth',
    symbol:'Bi',
    group:15
};
var Polonium = {
    number:84,
    atomic_weight:209,
    name:'Polonium',
    symbol:'Po',
    group:16
};
var Astatine = {
    number:85,
    atomic_weight:210,
    name:'Astatine',
    symbol:'At',
    group:17
};
var Radon = {
    number:86,
    atomic_weight:222,
    name:'Radon',
    symbol:'Rn',
    group:18
};
var Francium = {
    number:87,
    atomic_weight:223,
    name:'Francium',
    symbol:'Fr',
    group:1
};
var Radium = {
    number:88,
    atomic_weight:226,
    name:'Radium',
    symbol:'Ra',
    group:2
};
var Actinium = {
    number:89,
    atomic_weight:227,
    name:'Actinium',
    symbol:'Ac',
    group:3
};
var Thorium = {
    number:90,
    atomic_weight:232.0381,
    name:'Thorium',
    symbol:'Th',
    group:102
};
var Protactinium = {
    number:91,
    atomic_weight:231.0359,
    name:'Protactinium',
    symbol:'Pa',
    group:102
};
var Uranium = {
    number:92,
    atomic_weight:238.0289,
    name:'Uranium',
    symbol:'U',
    group:102
};
var Neptunium = {
    number:93,
    atomic_weight:237,
    name:'Neptunium',
    symbol:'Np',
    group:102
};
var Plutonium = {
    number:94,
    atomic_weight:244,
    name:'Plutonium',
    symbol:'Pu',
    group:102
};
var Americium = {
    number:95,
    atomic_weight:243,
    name:'Americium',
    symbol:'Am',
    group:102
};
var Curium = {
    number:96,
    atomic_weight:247,
    name:'Curium',
    symbol:'Cm',
    group:102
};
var Berkelium = {
    number:97,
    atomic_weight:247,
    name:'Berkelium',
    symbol:'Bk',
    group:102
};
var Californium = {
    number:98,
    atomic_weight:251,
    name:'Californium',
    symbol:'Cf',
    group:102
};
var Einsteinium = {
    number:99,
    atomic_weight:252,
    name:'Einsteinium',
    symbol:'Es',
    group:102
};
var Fermium = {
    number:100,
    atomic_weight:257,
    name:'Fermium',
    symbol:'Fm',
    group:102
};
var Mendelevium = {
    number:101,
    atomic_weight:258,
    name:'Mendelevium',
    symbol:'Md',
    group:102
};
var Nobelium = {
    number:102,
    atomic_weight:259,
    name:'Nobelium',
    symbol:'No',
    group:102
};
var Lawrencium = {
    number:103,
    atomic_weight:262,
    name:'Lawrencium',
    symbol:'Lr',
    group:102
};
var Rutherfordium = {
    number:104,
    atomic_weight:261,
    name:'Rutherfordium',
    symbol:'Rf',
    group:4
};
var Dubnium = {
    number:105,
    atomic_weight:262,
    name:'Dubnium',
    symbol:'Db',
    group:5
};
var Seaborgium = {
    number:106,
    atomic_weight:266,
    name:'Seaborgium',
    symbol:'Sg',
    group:6
};
var Bohrium = {
    number:107,
    atomic_weight:264,
    name:'Bohrium',
    symbol:'Bh',
    group:7
};
var Hassium = {
    number:108,
    atomic_weight:277,
    name:'Hassium',
    symbol:'Hs',
    group:8
};
var Meitnerium = {
    number:109,
    atomic_weight:268,
    name:'Meitnerium',
    symbol:'Mt',
    group:9
};

/**
 * Contains all elements identified by their Symbol.
 */
elements_array = {
    'H': Hydrogen,
    'He': Helium,
    'Li': Lithium,
    'Be': Beryllium,
    'B': Boron,
    'C': Carbon,
    'N': Nitrogen,
    'O': Oxygen,
    'F': Fluorine,
    'Ne': Neon,
    'Na': Sodium,
    'Mg': Magnesium,
    'Al': Aluminum,
    'Si': Silicon,
    'P': Phosphorus,
    'S': Sulfur,
    'Cl': Chlorine,
    'Ar': Argon,
    'K': Potassium,
    'Ca': Calcium,
    'Sc': Scandium,
    'Ti': Titanium,
    'V': Vanadium,
    'Cr': Chromium,
    'Mn': Manganese,
    'Fe': Iron,
    'Co': Cobalt,
    'Ni': Nickel,
    'Cu': Copper,
    'Zn': Zinc,
    'Ga': Gallium,
    'Ge': Germanium,
    'As': Arsenic,
    'Se': Selenium,
    'Br': Bromine,
    'Kr': Krypton,
    'Rb': Rubidium,
    'Sr': Strontium,
    'Y': Yttrium,
    'Zr': Zirconium,
    'Nb': Niobium,
    'Mo': Molybdenum,
    'Tc': Technetium,
    'Ru': Ruthenium,
    'Rh': Rhodium,
    'Pd': Palladium,
    'Ag': Silver,
    'Cd': Cadmium,
    'In': Indium,
    'Sn': Tin,
    'Sb': Antimony,
    'Te': Tellurium,
    'I': Iodine,
    'Xe': Xenon,
    'Cs': Cesium,
    'Ba': Barium,
    'La': Lanthanum,
    'Ce': Cerium,
    'Pr': Praseodymium,
    'Nd': Neodymium,
    'Pm': Promethium,
    'Sm': Samarium,
    'Eu': Europium,
    'Gd': Gadolinium,
    'Tb': Terbium,
    'Dy': Dysprosium,
    'Ho': Holmium,
    'Er': Erbium,
    'Tm': Thulium,
    'Yb': Ytterbium,
    'Lu': Lutetium,
    'Hf': Hafnium,
    'Ta': Tantalum,
    'W': Tungsten,
    'Re': Rhenium,
    'Os': Osmium,
    'Ir': Iridium,
    'Pt': Platinum,
    'Au': Gold,
    'Hg': Mercury,
    'Tl': Thallium,
    'Pb': Lead,
    'Bi': Bismuth,
    'Po': Polonium,
    'At': Astatine,
    'Rn': Radon,
    'Fr': Francium,
    'Ra': Radium,
    'Ac': Actinium,
    'Th': Thorium,
    'Pa': Protactinium,
    'U': Uranium,
    'Np': Neptunium,
    'Pu': Plutonium,
    'Am': Americium,
    'Cm': Curium,
    'Bk': Berkelium,
    'Cf': Californium,
    'Es': Einsteinium,
    'Fm': Fermium,
    'Md': Mendelevium,
    'No': Nobelium,
    'Lr': Lawrencium,
    'Rf': Rutherfordium,
    'Db': Dubnium,
    'Sg': Seaborgium,
    'Bh': Bohrium,
    'Hs': Hassium,
    'Mt': Meitnerium
};

/**
 * Note: Pass only the element's symbol here. The element is retrieved
 * using a string, so any string received from prompt input or etc will do.
 * Do not attempt to wrap the variable in single quotes ( '   ' ), as this will cause errors.
 *
 * ex.
 * var input = prompt("What element are you searching for?");
 *              input <-- 'Ag' (from user)
 * element silver = find_element(input);
 * document.write("The atomic weight of " + input + " is " + silver.atomic_weight + "<br />");
 * @param element_symbol Case sensitive element symbol of the element to retrieve.
 * @returns Element object containing
 *              number (atomic number),
 *              atomic_weight,
 *              name,
 *              symbol,
 *          and group (periodic table group).
 */
function find_element(element_symbol){
    return elements_array[element_symbol];
}