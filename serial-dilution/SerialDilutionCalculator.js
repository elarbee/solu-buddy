function SerialDilution(numDilutions, flaskVolume, transferVolume){
    var flasks = [];
    var conc = 1;
    
    for(i=0;i<numDilutions;i++){
        
        conc*=(transferVolume/flaskVolume);
        
        //Remove floating point arithmetic artifacts
        var artifacts = conc.toFixed(i+1);
        //Remove Trailing zeroes
        var zeroes = artifacts.toString();
        flasks.push(Number(zeroes));
    }
    
    return flasks;
}


// 1/10, 1/10/10, 1/10/10/10
// 20/100, 20/100/100 