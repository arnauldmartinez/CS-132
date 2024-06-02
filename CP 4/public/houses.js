/**
 * Name: Arnauld Martinez
 * Date: June 2nd, 2024
 * 
 * This is houses.js, the javascript necessary to update the DOM tree for
 * houses.html.
 */

(function () {
    "use strict";

    let infoAdded = false;

    /**
     * Initializes event listeners for the Lloyd, Venerable, and Bechtel buttons
     * @param None
     * @returns None
     */
    async function init() {
        let lloydButton = qs("#lloyd");
        let venButton = qs("#ven");
        let bechtelButton = qs("#bechtel");

        lloydButton.addEventListener("click", () => addHouseInfo("lloyd"));
        venButton.addEventListener("click", () => addHouseInfo("venerable"));
        bechtelButton.addEventListener("click", addBechtel);
    }

    /**
     * Adds information about the specified house to the DOM tree
     * @param {string} house Undergraduate house at caltech
     * @returns None
     */
    async function addHouseInfo(house) {
        try {
            let resp = await fetch(`/houses/${house}`);
            checkStatus(resp);
            const data = await resp.text();
            addData(data);
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * Adds information about bechtel to the DOM tree
     * @param None
     * @returns None
     */
    async function addBechtel() {
        try {
            let resp = await fetch("/bechtel");
            checkStatus(resp);
            const data = await resp.json();
            addData(data.text);
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * Helper function to add text to the DOM tree
     * @param {string} data
     * @returns None
     */
    async function addData(data) {
        if (!infoAdded) {
            let info = gen("p");
            info.textContent = data;
            info.id = "desc";
            qs("#info").appendChild(info);
            infoAdded = true;
        } else {
            qs("#desc").textContent = data;
        }
    }
    
    /**
     * Adds a user friendly error message if the API throws an error.
     * @param {string} errorMsg Error message to be thrown
     * @returns None
     */
    function handleError(errMsg) {
        if (typeof errMsg === "string") {
            qs("#message-area").textContent = errMsg;
        } else {
            qs("#message-area").textContent =
                "An error ocurred fetching the housing data. Please try again later.";
        }
        qs("#message-area").classList.remove("hidden");
    }

    init();
})();