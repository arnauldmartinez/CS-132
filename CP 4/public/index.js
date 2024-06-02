/**
 * Name: Arnauld Martinez
 * Date: May 4th, 2024
 * 
 * This is index.js, the javascript necessary to iterate
 * through the fun facts about Arnauld.
 */

(function () {
    "use strict";

    let factIdx = 0;
    let factLen = 3;
    let displayAdded = false;

    /**
     * Initializes event listeners for the next button
     * @param None
     * @returns None
     */
    function init() {
        let nextButton = qs("#next-btn");
        nextButton.addEventListener("click", nextFact);
    }
    
    /**
     * Iterates through a series of fun facts about Arnauld
     * @param None
     * @returns None
     */
    function nextFact() {
        let facts = qsa(".fact");
        facts[factIdx].classList.toggle("hidden");
        if(factIdx == 2 && displayAdded == false) {
            addDisplay();
        }
        factIdx = (factIdx + 1) % factLen;
        facts[factIdx].classList.toggle("hidden");
    }

    /**
     * Adds a congratulatory display to signify when the user has clicked
     * through all the facts.
     * @param None
     * @returns None
     */
    function addDisplay() {
        let finish = document.createElement("p");
        finish.textContent = "You know everything about Arnauld!";
        qs("#facts").appendChild(finish);
        displayAdded = true;
    }
    init();
})();