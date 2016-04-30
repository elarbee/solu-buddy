/**
 * Author: William Robert Howerton III
 */

/**
 * Function used to uniformly validate fields and shorten length of code in other files.
 *
 *
 * @param value Any value we are checking for validity.
 * **Note: Any empty or undefined value is automatically invalid.
 *
 * @returns {{}}
 * @constructor
 */
function Validate(value){

    var self = {};

    /**
     * If initial value is empty or undefined, validity is automatically false.
     * @type {boolean}
     */
    self.valid = ((value != "") && (value != undefined));
    self.val = value;
    self.error = "";

    if(!self.valid){
        self.error += "Value is empty or undefined.\n";
    }

    function check_for_error(msg){
        if(!self.valid){
            self.error += msg + " Value is " + self.val + "\n";
        }
    }
    /**
     * Contains no decimals.
     */
    self.integer = function is_an_integer(){
        self.and(!isNaN(self.val));
        self.regex_test(/^-?[\d*]+$/);
        check_for_error("Failed integer test.");
        return self;
    };

    /**
     * Is a double
     */
    self.double = function is_a_double(){
        self.and(!isNaN(self.val));
        self.regex_test(/^-?\d+\.?\d*$/);
        check_for_error("Failed double test.");
        return self;
    };

    /**
     * Only contains letters or digits
     */
    self.no_specials = function has_no_special_characters(){
        self.regex_test(/^[a-zA-Z\d*]+$/);
        check_for_error("Failed no specials test.");
        return self;
    };

    self.not_zero = function not_less_than_or_equal_to_zero(){
        self.and(self.val > 0);
        check_for_error("Failed not zero test.");
        return self;
    };

    self.only_letters = function only_contains_letters(){
        self.regex_test(/^[a-zA-Z]*$/);
        check_for_error("Failed only letters test.");
        return self;
    };

    /**
     * Passes the given regex
     * @param regex Regular expression
     * @returns {{}}
     */
    self.regex_test = function test_against_regex(regex){
        self.and(regex.test(self.val));
        return self;
    };

    self.and = function and_against_boolean(bool){
        self.valid = (self.valid && bool);
        return self;
    };


    self.or = function or_against_boolean(bool){
        self.valid = (self.valid || bool);
        return self;
    };

    self.greater = function greater_than_value(value){
        self.and(self.val > value);
        check_for_error("Failed greater than test.");
        return self;
    };

    self.between_including = function between_and_including(low, high){
        self.and(self.val >= low).and(self.val <= high);
        check_for_error("Failed between including test.");
        return self;
    };

    self.is = function return_boolean(){
        return self.valid;
    };

    self.not = function return_boolean(){
        return !self.valid;
    };

    return self;
}

function Field_To_Type(field){
    var field_to_type = {
        'solvent_formula' : ['string'],
        'unknown' : ['string'],
        'solventChemID' : ['string'],
        'soluteChemID' : ['string'],
        'internal_formula' : ['string'],
        'solute_formula' : ['compound'],
        'analyte_formula' : ['compound'],
        'solution_concentration' : ['number'],
        'solute_concentration' : ['number'],
        'analyte_molarity' : ['number'],
        'internal_molarity' : ['number'],
        'solute_percent_mass' : ['number', 'percent'],
        'total_volume' : ['number','lrg_volume'],
        'flasksVolume' : ['number', 'lrg_volume'],
        'total_volume_standards' : ['number', 'lrg_volume'],
        'solute_volume' : ['number', 'sm_volume'],
        'volumeTransferred' : ['number', 'sm_volume'],
        'unknown_volume' : ['number', 'sm_volume'],
        'massToAdd' : ['number'],
        'solute_molec_weight' : ['number', 'mweight'],
        'analyte_molec_weight' : ['number', 'mweight'],
        'density' : ['number'],
        'numDilutions' : ['number', 'iterations'],
        'molaritySolution' : ['number'],
        'num_standards' : ['number', 'iterations']
    };

    return field_to_type[field];
}

function Page_To_Inputs(page){
    var page_to_inputs = {
        'SOLID' : ['solvent_formula'
            ,'solute_formula'
            ,'solution_concentration'
            ,'total_volume'
            ,'solute_molec_weight'
            ,'massToAdd'],

        'GRAV' : ['solvent_formula'
            ,'solute_formula'
            ,'solution_concentration'
            ,'total_volume'
            ,'solute_molec_weight'
            ,'massToAdd'],

        'VOLU' : ['solvent_formula'
            ,'solute_formula'
            ,'solution_concentration'
            ,'total_volume'
            ,'solute_molec_weight'
            ,'solute_volume'
            ,'density'],

        'CONC_MOL' : ['solvent_formula'
            ,'solute_formula'
            ,'solution_concentration'
            ,'total_volume'
            ,'solute_concentration'
            ,'solute_volume'],

        'CONC_GRAV' : ['solvent_formula'
            ,'solute_formula'
            ,'solution_concentration'
            ,'total_volume'
            ,'massToAdd'
            ,'solute_percent_mass'],

        'CONC_VOL' : ['solvent_formula'
            ,'solute_formula'
            ,'solution_concentration'
            ,'total_volume'
            ,'solute_percent_mass'
            ,'solute_volume'
            ,'density'],

        'SERIAL' : ['solventChemID'
            ,'soluteChemID'
            ,'numDilutions'
            ,'molaritySolution'
            ,'flasksVolume'
            ,'volumeTransferred'],

        'EXTERNAL' : ['solvent_formula'
            ,'analyte_formula'
            ,'analyte_molec_weight'
            ,'analyte_molarity'
            ,'num_standards'
            ,'total_volume_standards'],

        'INTERNAL' : ['analyte_molarity'
            ,'analyte_formula'
            ,'internal_formula'
            ,'internal_molarity'
            ,'num_standards'
            ,'total_volume_standards'],

        'ADDITION' : ['analyte_molarity'
            ,'analyte_formula'
            ,'num_standards'
            ,'unknown'
            ,'unknown_volume'
            ,'total_volume_standards']
    };
    return page_to_inputs[page];
}

function ValidatePage(page_name){

    if(page_name == 'CONC'){
        page_name = $('#knownSelect').val();
    }

    var max_flask_number = 25;

    var fields_to_values = {};

    var error_messages = {
        'number' : "Numbers should be in the correct format and greater than 0.",
        'compound' : "Solute compounds should be a valid chemical formula.",
        'string' : "Names should not contain any special characters.",
        'percent' : "The mass percent of your solute should be greater than 0% and at most 100%",
        'sm_volume' : "Volume transferred can not be larger than your containing flask.",
        'lrg_volume' : "Volume transferred can not be larger than your containing flask.",
        'mweight' : function(val, error){
            return "The molecular weight you entered is ".concat(val)
                .concat(" and incorrect.").concat(" You are off by ").concat(error+".");
            },
        'iterations' : ("Total number of flasks may not exceed " + max_flask_number)
    };

    var class_verification = {
        'number' : function(fields, val){
            var validator = new Validate(val).double().greater(0);
            if(validator.not()){
                add_message(error_messages['number']);
            }
            return validator.is();
        },

        'compound' : function(fields, val){
            var valid = is_valid_formula(val);
            if(!valid){
                add_message(error_messages['compound']);
            }
            return valid;
        },

        'string' : function(fields, val){
            var validator = new Validate(val).no_specials();

            if(validator.not()){
                add_message(error_messages['string']);
            }
            return validator.is();
        },

        'percent' : function(fields, val){
            var valid = class_verification['number'];

            if(valid){
                if(val > 100 || val <= 0) {
                    add_message(error_messages['percent']);
                    valid = false;
                }
            }
            return valid;
        },

        'sm_volume' : function(fields, val){
            var lg_vol = Number(fields_to_values[find_tag(fields, 'lrg_volume')]);

            if(val >= lg_vol){
                add_message(error_messages['sm_volume']);
                return false;
            }else{
                return true;
            }
        },

        'lrg_volume' : function(fields, val){
            var sm_vol = Number(fields_to_values[find_tag(fields, 'sm_volume')]);

            if(sm_vol >= val){
                add_message(error_messages['lrg_volume']);
                return false;
            }else{
                return true;
            }
        },

        'mweight' : function(fields, val){
            var solute_formula = fields_to_values[find_tag(fields, 'compound')];
            var real_m_weight = string_to_compound(solute_formula).molecular_weight();
            var error = calculate_error(real_m_weight, val);
            if(error > accepted_percent_error){
                add_message(error_messages['mweight'](val, error));
                return false;
            }else{
                return true;
            }
        },

        'iterations' : function(fields, val){
            if(val > max_flask_number){
                add_message(error_messages['iterations']);
                return false;
            }else{
                return true;
            }
        }
    };

    function find_tag(fields, tag_to_match){
        for(var i = 0; i < fields.length; i++){
            var tags = Field_To_Type(fields[i]);
            for(var k = 0; k < tags.length; k++){
                var temp_tag = tags[k];
                if(temp_tag == tag_to_match){
                    return fields[i];
                }
            }
        }
        return null;
    }

    var accepted_percent_error = 2;

    var self = {};
    self.error_message = "";

    function check_page(page_name){
        var valid = true;
        var fields = Page_To_Inputs(page_name);

        /**
         * Only difference is how to initiate the field_to_values
         */
        fields.forEach(function(el, idx, arr){
           fields_to_values[el] = $('#'+el+'').val();
        });

        fields.forEach(function(el, i, arr){

            var input_classes = Field_To_Type(el);

            input_classes.forEach(function(elem, idx, arr2){
                valid = valid && class_verification[elem](fields, fields_to_values[el]);
            });
        });

        return valid;
    }

    self.test_page = function(fields_to_vals){
        /**
         * Only difference is how to initiate the field_to_values
         */
        fields_to_values = fields_to_vals;

        var valid = true;
        var fields = Page_To_Inputs(page_name);


        fields.forEach(function(el, i, arr){

            var input_classes = Field_To_Type(el);

            input_classes.forEach(function(elem, idx, arr2){
                valid = valid && class_verification[elem](fields, fields_to_values[el]);
            });
        });

        return valid;
    };

    self.is_valid = function(){
        return check_page(page_name);
    };

    function add_message(msg){
        self.error_message += msg + "<br>";
    }

    return self;
}