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
        'solution_concentration' : ['number', 'molarity'],
        'solute_concentration' : ['number', 'smolarity'],
        'analyte_molarity' : ['number', 'smolarity'],
        'internal_molarity' : ['number', 'molarity'],
        'solute_percent_mass' : ['number', 'percent'],
        'total_volume' : ['number','lrg_volume'],
        'flasksVolume' : ['number', 'lrg_volume'],
        'total_volume_standards' : ['number', 'lrg_volume'],
        'solute_volume' : ['number', 'sm_volume', 'liquid_answer'],
        'volumeTransferred' : ['number', 'sm_volume'],
        'unknown_volume' : ['number', 'sm_volume'],
        'massToAdd' : ['number', 'mass_answer'],
        'solute_molec_weight' : ['number', 'mweight'],
        'analyte_molec_weight' : ['number', 'mweight'],
        'density' : ['number'],
        'numDilutions' : ['number', 'iterations'],
        'molaritySolution' : ['number', 'molarity'],
        'num_standards' : ['number', 'iterations']
    };

    return field_to_type[field];
}

    var limits = {

        'percent' : {
            low : 0.0000001,
            high : 100,
            invalid_low : 0,
            invalid_high : 101,
            regex : /^-?\d+\.?\d*$/,
            invalids : [NaN, undefined, Infinity, '']
        },

        'string' : {
            low : 1,
            high : 20,
            invalid_low : 0,
            invalid_high : 21,
            regex : /^[a-zA-Z\d*]+$/,
            invalids : [undefined, '', '???']
        },

        'compound' : {
            low : 1,
            high : 20,
            invalid_low : 0,
            invalid_high : 21,
            invalids : [undefined, null, '']
        },

        'sm_volume' : {
            low : 0.0000001,
            high : 999999,
            invalid_low : 0,
            invalid_high : 1000000,
            regex : /^-?\d+\.?\d*$/,
            invalids : [NaN, undefined, Infinity, '']
        },

        'lrg_volume' : {
            low : 0.0000001,
            high : 999999,
            invalid_low : 0,
            invalid_high : 1000000,
            regex : /^-?\d+\.?\d*$/,
            invalids : [NaN, undefined, Infinity, '']
        },

        'mweight' : {
            low : 0.0000001,
            high : 999999,
            invalid_low : 0,
            invalid_high : 1000000,
            invalids : [NaN, undefined, Infinity, '']
        },

        'number' : {
            low : 0.0000001,
            high : 999999,
            invalid_low : 0,
            invalid_high : 1000000,
            invalids : [NaN, undefined, Infinity, '']
        },

        'iterations' : {
            low : 1,
            high : 25,
            invalid_low : 0,
            invalid_high : 26,
            regex : /^-?[\d*]+$/,
            invalids : [NaN, undefined, Infinity, '']
        },

        'molarity' : {
            low : .00000001,
            high : 25,
            invalid_low : 0,
            invalid_high : 25.00001,
            regex : /^-?\d+\.?\d*$/,
            invalids : [NaN, undefined, Infinity, '']
        },

        'smolarity' : {
            low : .00000001,
            high : 25,
            invalid_low : 0,
            invalid_high : 25.00001,
            regex : /^-?\d+\.?\d*$/,
            invalids : [NaN, undefined, Infinity, '']
        }
    };



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

function find_tag(fields, tag_to_match){
    for(var i = 0; i < fields.length; i++){
        var tags = Field_To_Type(fields[i]);

        for(var k = tags.length; k > -1; k--){
            var temp_tag = tags[k];
            if(temp_tag == tag_to_match){
                return fields[i];
            }
        }
    }
    return null;
}

function ValidatePage(page_name){

    if(page_name == 'CONC'){
        page_name = $('#knownSelect').val();
    }

    var fields_to_values = {};
    var class_verification = {
        'number' : function(fields, val){
            var validator = new Validate(val)
                .not_zero()
                .double()
                .between_including(limits['number'].low, limits['number'].high);
            if(validator.not()){
                add_message(error_messages['number']);
            }
            return validator.is();
        },

        'molarity' : function(fields, val){
            var validator = new Validate(val)
                .not_zero()
                .double()
                .between_including(limits['molarity'].low, limits['molarity'].high);
            if(validator.not()){
                add_message(error_messages['molarity']);
            }
            return validator.is();
        },

        'smolarity' : function(fields, val){
            var validator = new Validate(val)
                .not_zero()
                .double()
                .between_including(limits['molarity'].low, limits['molarity'].high);
            if(validator.not()){
                add_message(error_messages['molarity']);
            }
            return validator.is();
        },

        'compound' : function(fields, val){
            if(is_valid_formula(val)){
                var validator = new Validate(val.length)
                    .not_zero()
                    .between_including(limits['compound'].low, limits['compound'].high)
                    .and(is_valid_formula(val));
            }else{
                return false;
            }
            var valid = validator.is();
            if(!valid){
                add_message(error_messages['compound']);
            }
            return valid;
        },

        'string' : function(fields, val){
            var validator = new Validate(val)
                .no_specials();

            if(validator.is()){
                validator.and(new Validate(val.length)
                    .between_including(limits['string'].low, limits['string'].high).is());
            }
            if(validator.not()){
                add_message(error_messages['string']);
            }
            return validator.is();
        },

        'percent' : function(fields, val){
            var valid = class_verification['number'](fields, val);
            if(!isNaN(val)){
                if(val > 100 || val <= 0) {
                    add_message(error_messages['percent']);
                    valid = false;
                }
            }
            return valid;
        },

        'sm_volume' : function(fields, val){
            var lg_vol = Number(fields_to_values[find_tag(fields, 'lrg_volume')]);
            var validator = new Validate(lg_vol)
                .double()
                .not_zero()
                .between_including(limits['sm_volume'].low, limits['sm_volume'].high)
                .and(!(val >= lg_vol));

            if(validator.not()){
                add_message(error_messages['sm_volume']);
                return false;
            }else{
                return true;
            }
        },

        'lrg_volume' : function(fields, val){
            var validator = new Validate(val)
                .not_zero()
                .double()
                .between_including(limits['lrg_volume'].low, limits['lrg_volume'].high);

            if(validator.not()){
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
            var validator = new Validate(val)
                .not_zero()
                .double()
                .between_including(limits['mweight'].low, limits['mweight'].high)
                .and(!isNaN(error))
                .and(!(error > accepted_percent_error));

            if(validator.not()){
                add_message(error_messages['mweight'](val, error));
                return false;
            }else{
                return true;
            }
        },

        'iterations' : function(fields, val){
            var validator = new Validate(val)
                .not_zero()
                .integer()
                .between_including(limits['iterations'].low, limits['iterations'].high);
            if(validator.not()){
                add_message(error_messages['iterations']);
                return false;
            }else{
                return true;
            }
        }
    };

    var error_messages = {
        'number' : "Numbers must be beteween ".concat(limits['number'].low+" ").concat("and").concat(" " + limits['number'].high),
        'compound' : "Solute compounds should be a valid chemical formula. Length should be from ".concat(limits['compound'].low+" ")
            .concat(" to ").concat(limits['compound'].high+" ").concat("characters in length."),
        'string' : "Names should not contain any special characters and should be between ".concat(limits['string'].low+" ")
            .concat("and ").concat(limits['string'].high+" characters in length."),
        'percent' : "The mass percent of your solute should be greater than 0% and at most 100%",
        'sm_volume' : "Volume transferred can not be larger than your containing flask. It should be between "
            .concat(limits['sm_volume'].low+" and ").concat(limits['sm_volume'].high+"."),
        'lrg_volume' : "Volume transferred can not be larger than your containing flask.It should be between "
            .concat(limits['lrg_volume'].low+" and ").concat(limits['lrg_volume'].high+"."),
        'mweight' : function(val, error){
            return "The molecular weight you entered is ".concat(val)
                .concat(" and incorrect.").concat(" You are off by ").concat(error+".");
            },
        'iterations' : "Total number of flasks may not exceed ".concat(limits['iterations'].high+"").concat(" and must be at least")
                .concat(limits['iterations'].low+"."),
        'molarity' : "Total number of flasks may not exceed ".concat(limits['molarity'].high+"").concat(" and must be at least")
                .concat(limits['molarity'].low+"."),
        'smolarity' : "Total number of flasks may not exceed ".concat(limits['molarity'].high+"").concat(" and must be at least")
                .concat(limits['molarity'].low+".")
    };

    var accepted_percent_error = 2;

    var self = {};
    self.error_message = "";

    function check_page(page_name){
        var valid = true;
        var fields = Page_To_Inputs(page_name);

        /**
         * Only difference is how to initiate the field_to_values
         */
        for(var k = 0; k < fields.length; k++){
            fields_to_values[fields[k]+''] = $('#'+fields[k]+'').val();
            // fields_to_values[fields[k]+''] = document.getElementById(fields[k]).value;
        }
        console.log(fields_to_values);

        fields.forEach(function(el, i,  arr){
            var input_classes = Field_To_Type(el);
            input_classes.forEach(function(elem, idx, arr2){
                valid = valid && class_verification[elem](fields, fields_to_values[el]);
            });
        });

        fields_to_values = {};
        return valid;
    }

    self.test_page = function(fields_to_vals){
        /**
         * Only difference is how to initiate the field_to_values
         */
        fields_to_values = fields_to_vals;

        var valid = true;
        var fields = Page_To_Inputs(page_name);

        fields.forEach(function(el, i,  arr){

            var input_classes = Field_To_Type(el);

            input_classes.forEach(function(elem, idx, arr2){
                // if(elem != 'mass_answer' && elem != 'liquid_answer'){
                try {
                    valid = valid && class_verification[elem](fields, fields_to_values[el]);
                }catch(ex){
                    console.log(page_name);
                    console.log(el + ' input class ' + elem);
                    console.log('val = ' + fields_to_values[el]);
                    ex.error;
                }
                // }
            });
        });

        fields_to_values = {};

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