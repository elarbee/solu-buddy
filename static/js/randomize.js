/**
 * Author: William Robert Howerton III
 */


/**
 * Makes a random double between given low and high
 * @param low Minimum value of expected double
 * @param high Maximum value of expected double
 * @returns {*} Random double within limits
 */
function random_double(low, high){
    return precise_round((Math.random() * (high-low))+low, 4);
}

/**
 * Makes a random integer between given low and high
 * @param low Minimum value of expected integer
 * @param high Maximum value of expected integer
 * @returns {*} Random integer within limits.
 */
function random_int(low, high){
    return (Math.floor(Math.random() * (high-low))+low);
}

/**
 * Makes a random lower case character.
 * @returns {string} Random lower case character.
 */
function random_lower(){
    return String.fromCharCode(random_int(97, 122));
}

/**
 * Makes a random upper case character
 * @returns {string} random upper case character
 */
function random_upper(){
    return String.fromCharCode(random_int(65, 90));
}

/**
 * Simulates rolling dice by making a random number between 0 and the given max and then comparing the number to "chances".
 * If The generated number is lower than the chances, the roll "succeeeds" and true is returned. False is returned if the
 * roll fails. Chance is approximately (chances/max)%
 * @param chances Approximate chances out of max to succeed.
 * @param max Upper limit of the roll.
 * @returns {boolean} True if success, false otherwise.
 */
function roll_dice(chances, max){
    return (random_double(0, max) < chances);
}

/**
 * Creates a random valid formula using random elements. Length will be between given low and high.
 * @param low Minimum length
 * @param high Maximum length
 * @returns {string} Valid formula
 */
function random_formula(low, high){
    var length = random_int(low, high);

    var formula = "";

    if(roll_dice(50, 100)){
        formula += random_int(2, 20);
    }

    for(var i = 0; i < length; i++){

        formula += getRandomElementKey();

        if(roll_dice(50, 100)){
            formula += random_int(2, 30);
        }
        i = formula.length;
    }

    return formula;
}


function random_formula_w_ionic(chance_for_ionic, low, high){
    var length = random_int(low, high);

    var formula = "";

    if(roll_dice(50, 100)){
        formula += random_int(2, 1000);
    }
    for(var i = 0; i < length; i++){
        formula += getRandomElementKey();

        if(roll_dice(50, 100)){
            formula += random_int(2, 100);
        }

        if(roll_dice(chance_for_ionic, 100)){
            formula += random_ionic_formula(1,20);
        }
    }

    return formula;
}

/**
 * Creates a random valid ionic formula using random elements. Length will be between given low and high.
 * @param low Minimum length
 * @param high Maximum length
 * @returns {string} Valid formula
 */
function random_ionic_formula(low, high){
    var length = random_int(low, high);

    var formula = "(";
    for(var i = 0; i < length; i++){
        formula += getRandomElementKey();
        if(roll_dice(50, 100)){
            formula += random_int(2, 100);
        }
    }
    formula += ")";

    if(roll_dice(20, 100)){
        formula += random_int(2, 999);
    }

    return formula;
}

/**
 * Creates a random word between the given min and max length using lower and upper case letters.
 * @param min_length minimum length
 * @param max_length maximum length
 * @returns {string} Word
 */
function random_word(min_length, max_length){
    var length = random_int(min_length, max_length);
    var word = "";
    for(var i = 0; i < length; i++){
        if(roll_dice(50, 100)){
            word += random_upper();
        }else{
            word += random_lower();
        }
    }
    return word;
}

function random_choose(val1, val2){
    if(roll_dice(50, 100)){
        return val1;
    }else{
        return val2;
    }
}

var make_invalid = {
    'number' : function(){
        return random_double(-1000, 0);
    },

    'string' : function(){
        return random_shitstorm(0, 30);
    },

    'compound' : function(){
        return '';
    },

    'sm_volume' : function(){
        return random_double(-999, -.00001);
    },

    'lrg_volume' : function(){
        return random_double(-1000, -2000);
    },

    'percent' : function(){
        return random_choose(random_double(-10, 0), random_double(100.01, 110));
    },

    'mweight' : function(){
        return '';
    },

    'iterations' : function(){
        return random_choose(random_int(-5, 0), random_int(26, 50));
    },

    'molarity' : function(){
        return random_choose(random_double(-10, 0), random_double(25.00001, 110));
    },
    'smolarity' : function(){
        return random_choose(random_double(-10, 0), random_double(25.00001, 110));
    }
};

var random_valid_vals = {

    'number' : function(){
        return random_double(limits['number'].low, limits['number'].high);
    },

    'string' : function(){
        return random_word(limits['string'].low, limits['string'].high);
    },

    'compound' : function(){
        return random_formula(limits['compound'].low, limits['compound'].high);
    },

    'sm_volume' : function(lrg_vol){
        return random_double(limits['sm_volume'].low, lrg_vol - .00001 || limits['sm_volume'].high );
    },

    'lrg_volume' : function(){
        return random_double(limits['lrg_volume'].low, limits['lrg_volume'].high);
    },

    'percent' : function(){
        return random_double(limits['percent'].low, limits['percent'].high);
    },

    'mweight' : function(solute){
        var compound = string_to_compound(solute);
        return (compound != null)? compound.molecular_weight() : null;
    },

    'iterations' : function(){
        return random_int(limits['iterations'].low, limits['iterations'].high);
    },

    'mass_answer' : function(solute, mol, vol, mpercent){
        var answ = SingleSolution(mol, vol, string_to_compound(solute).molecular_weight()).solid();
        if(mpercent > 0){
            answ *= (mpercent/100);
        }
        return answ;
    },

    'liquid_answer' : function(solute, mol, vol, mpercent, density){
        var answ = new SingleSolution(mol, vol, string_to_compound(solute).molecular_weight()).liquid.volume(density);
        if(mpercent > 0){
            answ = new SingleDilution(mol, vol).vol_transfer(string_to_compound(solute), mpercent, density);
        }
        return answ;
    },

    'molarity' : function(){
        return random_double(limits['molarity'].low, limits['molarity'].high);
    },

    'smolarity' : function(){
        return random_double(limits['molarity'].low, limits['molarity'].high);
    }
};

function vals(page, forced_invalids){
    
    var values = {};
    var fields = Page_To_Inputs(page);
    var ordered_fields = [];

    if(fields === undefined){
        console.log(page);
    }
    ordered_fields = ordered_fields.concat(fields.filter(function(el){
        var types = Field_To_Type(el);
        return types.indexOf('compound') > -1;
        }),
        fields.filter(function(el, i, arr){
            var types = Field_To_Type(el);
            return types.indexOf('lrg_volume') > -1;
        }),
        fields.filter(function(el, i, arr){
            var types = Field_To_Type(el);
            return types.indexOf('mweight') > -1;
        }),
        fields.filter(function(el, i, arr){
            var types = Field_To_Type(el);
            return types.indexOf('liquid_answer') == -1
                && types.indexOf('mass_answer') == -1
                && types.indexOf('lrg_volume') == -1
                && types.indexOf('mweight') == -1
                && types.indexOf('compound') == -1;
        }),
        fields.filter(function(el, i, arr){
            var types = Field_To_Type(el);
            return types.indexOf('liquid_answer') > -1
                || types.indexOf('mass_answer') > -1;
        }));

    ordered_fields.forEach(function(field){

        if(field == find_tag(fields, 'liquid_answer')){
            if(contains(find_tag(fields, 'smolarity'), fields)){
                values[field] = new SingleDilution(
                    find_tag(fields, 'molarity'),
                    find_tag(fields, 'lrg_volume'))
                    .solute_volume(find_tag(fields, 'smolarity'));
            }
        }
        var type = Field_To_Type(field)[(Field_To_Type(field).length - 1 < 0)? 0 : Field_To_Type(field).length - 1];
        values[field] = random_valid_vals[type](
            (Field_To_Type(field) == 'sm_volume') ? values[find_tag(fields, 'lrg_volume')] || '' : random_valid_vals['compound']() ,
            values[find_tag(fields, 'molarity')] || '',
            values[find_tag(fields, 'lrg_volume')] || '',
            values[find_tag(fields, 'percent')] || '',
            values['density'] || '');
    });


    // forced_invalids.forEach(function(invalid_type){
    //
    //     fields.forEach(function(f){
    //         if(contains(invalid_type, Field_To_Type(f))){
    //             if(invalid_type == 'mass_answer'
    //                 || invalid_type == 'liquid_answer'
    //                 || invalid_type == 'mweight'){
    //                 values[f] *= .9;
    //             }
    //             values[f] = make_invalid[invalid_type]();
    //         }
    //     });
    // });
    return values;
}

function random_field_vals(fields, guaranteed_invalids){

    var fields_to_vals = {};

    if(contains(find_tag(fields, 'mass_answer'), fields)){
        var total_vol_field = find_tag(fields, 'lrg_volume');
        var solute_field = find_tag(fields, 'compound');
        var mol_field = 'solution_concentration';
        var solvent_field = 'solvent_formula';

        fields_to_vals[total_vol_field] = random_valid_vals['lrg_volume']();
        fields_to_vals[solute_field] = random_valid_vals['compound']();
        fields_to_vals[mol_field] = random_double(.0001, 20);
        fields_to_vals[solvent_field] = random_valid_vals['string']();

        var massp = 0;
        //for concentrated stuff
        var massp_field = find_tag(fields, 'percent');
        if(contains(massp_field, fields)){
            fields_to_vals[massp_field] = random_valid_vals['percent']();
            massp = fields_to_vals[massp_field];
        }


        var mweight_field = find_tag(fields, 'mweight');
        if(contains(mweight_field, fields)){
            fields_to_vals[mweight_field] = random_valid_vals['mweight'](fields_to_vals[solute_field]);
        }

        fields_to_vals[find_tag(fields, 'mass_answer')] =
            random_valid_vals['mass_answer'](
                fields_to_vals[solute_field],
                fields_to_vals[mol_field],
                fields_to_vals[total_vol_field],
                massp);
    }

    else if(contains(find_tag(fields, 'liquid_answer'), fields)){

        var total_vol_field = find_tag(fields, 'lrg_volume');
        var solute_field = find_tag(fields, 'compound');
        var mol_field = 'solution_concentration';
        var solvent_field = 'solvent_formula';
        var density_field = 'density';

        fields_to_vals[total_vol_field] = random_valid_vals['lrg_volume']();
        fields_to_vals[solute_field] = random_valid_vals['compound']();
        fields_to_vals[mol_field] = random_double(.0001, 20);
        fields_to_vals[solvent_field] = random_valid_vals['string']();
        fields_to_vals[density_field] = random_double(.5, 20);

        var massp = 0;
        //for concentrated stuff
        var massp_field = find_tag(fields, 'percent');

        if(contains(massp_field, fields)){
            fields_to_vals[massp_field] = random_valid_vals['percent']();
            massp = fields_to_vals[massp_field];
        }

        var mweight_field = find_tag(fields, 'mweight');
        if(contains(mweight_field, fields)){
            fields_to_vals[mweight_field] = random_valid_vals['mweight'](fields_to_vals[solute_field]);
        }

        var solute_mol_field = 'solute_concentration';

        if(contains(solute_mol_field, fields)){
            fields_to_vals[solute_mol_field] = random_double(.00001, 20);

            fields_to_vals[find_tag(fields, 'liquid_answer')] =
                new SingleDilution(
                    fields_to_vals[mol_field],
                    fields_to_vals[total_vol_field],
                    fields_to_vals[solute_mol_field]
                );
        }else {

            fields_to_vals[find_tag(fields, 'liquid_answer')] =
                random_valid_vals['liquid_answer'](
                    fields_to_vals[solute_field],
                    fields_to_vals[mol_field],
                    fields_to_vals[total_vol_field],
                    fields_to_vals[density_field],
                    massp);
        }
    }

    else{

        var lrg_vol = find_tag(fields, 'lrg_volume');
        if(lrg_vol != null){
            fields_to_vals[lrg_vol] = random_valid_vals['lrg_volume']();
        }
        if(find_tag(fields, 'mweight') != null){
            fields_to_vals[find_tag(fields, 'compound')] = random_valid_vals['compound']();
            fields_to_vals[find_tag(fields, 'mweight')] = random_valid_vals['mweight'](fields_to_vals[find_tag(fields, 'compound')]);
        }

        fields.forEach(function(field, i, arr){

            var type = Field_To_Type(field)[Field_To_Type(field).length - 1];

            if(field != lrg_vol && field != find_tag(fields, 'mweight')  && field != find_tag(fields, 'compound')){
               if(field == find_tag(fields, 'sm_volume')){
                   fields_to_vals[field] = random_valid_vals['sm_volume'](fields_to_vals[lrg_vol]);
               }
               fields_to_vals[field] = random_valid_vals[type]();
           }
        });
    }

    guaranteed_invalids.forEach(function(invalid_type, k, arr){

        fields.forEach(function(f, i, arr2){

            if(contains(invalid_type, Field_To_Type(f))){
                if(invalid_type == 'mass_answer'
                    || invalid_type == 'liquid_answer'
                    || invalid_type == 'mweight'){

                    fields_to_vals[f] *= .9;
                }
                fields_to_vals[f] = make_invalid[invalid_type]();
            }

        });

    });

    return fields_to_vals;
}