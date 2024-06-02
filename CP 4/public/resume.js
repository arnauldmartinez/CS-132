/**
 * Name: Arnauld Martinez
 * Date: April 28th, 2024
 * 
 * This is resume.js, the javascript necessary to add the
 * congratulatory message when the user finishes reading the
 * resume.
 */

(function () {
    "use strict";

    let infoDisplayed = false;

    /**
     * Initializes event listeners for the checkbox
     * @param None
     * @returns None
     */
    function init() {
        let checkbox = qs("#check");
        checkbox.addEventListener("change", displayInfo);
    }

    /**
     * Adds a congratulatory message if the user read through the entire resume
     * @param None
     * @returns None
     */
    function displayInfo() {
        if(infoDisplayed == false) {
            let txt = document.createElement("p");
            txt.textContent = "Nice!";
            id("form").appendChild(txt);
            infoDisplayed = true;
        }
    }
    init();
})();