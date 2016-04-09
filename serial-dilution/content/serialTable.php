	<table>
        <tr>
            <td> <p>Enter a name for your solvent.</p> </td>
            <td> <p>How many dilution flasks will you use?</p> </td>
        </tr>
        <tr>
            <td> <input id="solventChemID" type="text" placeholder="Solvent" tabindex="1"></td>
            <td> <input id="numDilutions" type="number" placeholder="Number of dilutions." tabindex="4"> </td>
            <td></td>
        </tr>
        
        <tr>
            <td> <p>Enter a name for your solute.</p> </td>
            <td> <p>Dilution Flask Volume (ML)</p> </td>
        </tr>
        
        <tr>
            <td> <input id="soluteChemID" type="text" placeholder="Solute" tabindex="2"> </td>
            <td> <input id="flasksVolume" type="number" placeholder="Dilution Flask Volume" tabindex="5"> </td>
            <td> <button type="button" id="nextButton" tabindex="7">Next</button></td>
        </tr>
        
        <tr>
            <td> <p>What's your solute's Molecular weight? (M)</p> </td>
            <td> <p>How much solution will you transfer each time? (ML)</p> </td>
        </tr>
        
        <tr>
            <td><input id="soluteMW" type="number" placeholder="Solute Molecular Weight" tabindex="3"></td>
            <td><input id="volumeTransferred" type="number" placeholder="Solution Transferred Vol" tabindex="6"></td>
            <td></td>
        </tr>
    </table>