/**
 * Name: Arnauld Martinez
 * Date: June 13th, 2024
 * 
 * This file contains the javascript necessary to display and filter through all plants in the nursery
 */

(function () {
    "use strict";

    /**
     * Populates the page with all the plants and adds an event listener for the filter
     * @param None
     * @returns None
     */
    async function init() {
        populatePlants();
        let filter = qs("#plant-filter");
        filter.addEventListener("change", populatePlants);
    }

    /**
     * Populates the page with all the plants according to the selected filter
     * @param None
     * @returns None
     */
    async function populatePlants() {
        const type = qs('#plant-filter').value;
        try {
            let response = await fetch(`/plant-filter/${type}`);
            checkStatus(response);

            const plantsJson = await response.json();
            let plants  = plantsJson["items"];
            const upperDiv = qs(".plant-list");
            upperDiv.innerHTML = "";

            for (let idx = 0; idx < plants.length; idx++) {
                createCard(plants[idx]);
            }
        } catch(error) {
            handleError(error);
        }
    }

    /**
     * @param {String} name - Name of the plant 
     * @returns None
     * Creates a plant card and populates the DOM tree
     */
    function createCard(name) {
        const upperDiv = qs(".plant-list");
        const plantCard = gen("div");
        plantCard.classList.add('plant-card');
        
        const redir = gen("a");
        redir.href = "plants/" + name + ".html";

        const img = gen("img");
        img.src = "images/" + name + ".jpg";
        img.alt = name;

        const h4 = gen("h4");
        h4.textContent = name.charAt(0).toUpperCase() + name.slice(1);

        redir.appendChild(img);

        plantCard.appendChild(redir);
        plantCard.appendChild(h4);
        upperDiv.appendChild(plantCard);
    }

    /**
     * @param {Error} errMsg - error message to be handle and passed to the user
     * @returns None
     * Handles custom errors
     */
    async function handleError(errMsg) {
        if (typeof errMsg === "string") {
            qs("#message-area").textContent = errMsg;
        } else {
            qs("#message-area").textContent =
                "An error ocurred when interacting with the server. Please try again later.";
        }
        qs("#message-area").classList.remove("hidden");
    }

    init();
})();