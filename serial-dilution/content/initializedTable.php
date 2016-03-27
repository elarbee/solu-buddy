	<table>
        <tr>
            <td> <p><?= "Your custom solution"; ?> </p></td>
            <td> <input id="solventChemID" type="text" placeholder="Solvent Chemical Identity"></td>
            <td> <input id="numDilutions" type="text" placeholder="Number of dilutions to prepare"> </td>
            <td> <a href="#answerDiv"><button id="nextButton">Next</button></a></td>
        </tr>
        <tr>
            <td><img  style="width:35px"src="beaker.png"> </td>
            <td> <input id="soluteChemID" type="text" placeholder="Solute Chemical Identity (i.e., Formula)"> </td>
            <td> <input id="flasksVolume" type="text" placeholder="Volume of flasks in which dilutions are prepared"> </td>
            <td> <button id="homeButton" onClick="window.location.href='../'">SoluBuddy Home</button> </td>
        </tr>
        <tr>
            <td></td>
            <td><input id="soluteMW" type="text" placeholder="Solute Molecular Weight"></td>
            <td><input id="volumeTransferred" type="text" placeholder="Volume of solution transferred to next flask"></td>
            <td></td>
        </tr>
    </table>