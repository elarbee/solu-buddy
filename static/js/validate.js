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
        self.and(self.val != NaN);
        self.regex_test(/^-?[\d*]*$/);
        check_for_error("Failed integer test.");
        return self;
    };

    /**
     * Is a double
     */
    self.double = function is_a_double(){
        self.and(self.val != NaN);
        self.regex_test(/^-?\d+\.?\d*$/g);
        check_for_error("Failed double test.");
        return self;
    };

    /**
     * Only contains letters or digits
     */
    self.no_specials = function has_no_special_characters(){
        self.regex_test(/^[a-zA-Z\d*]*$/);
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

    self.less = function less_than_value(value){
        self.and(self.val < value);
        check_for_error("Failed less than test.");
        return self;
    };

    self.between_including = function between_and_including(low, high){
        self.and(self.val >= low).and(self.val <= high);
        check_for_error("Failed between including test.");
        return self;
    };

    self.between_not_including = function between_and_not_including(low, high){
        self.and(self.val > low).and(self.val < high);
        check_for_error("Failed between not including test.");
        return self;
    };

    self.equal = function(value){
        self.and(self.val == value);
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