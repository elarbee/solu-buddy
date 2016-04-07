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

function calculate_error(theoretical, actual){

    return (Math.abs((actual - theoretical)/theoretical)*100);
}