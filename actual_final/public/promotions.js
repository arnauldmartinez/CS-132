/**
 * Name: Arnauld Martinez
 * Date: June 13th, 2024
 * 
 * This file contains the javascript populating the promotions page
 */

(function () {
    "use strict";

    /**
     * @param None
     * @returns None
     * Initializes the javascript for the page
     */
    async function init() {
        populatePromotions();
    }

    /**
     * @param None
     * @returns None
     * Populates the page with promotions
     */
    async function populatePromotions() {
        try {
            let upperDiv = qs("#promo-container");
                            
            for(let i = 1; i <= 5; i++) {
                let response = await fetch(`/promotion/${i}`);
                checkStatus(response);
                const promotion = await response.json();

                let promoBlock = gen("div");
                promoBlock.classList.add("info-block");
                promoBlock.id = `block${i}`;

                let header = gen("div");
                header.classList.add("header");
                header.id = `header${i}`;

                let h2 = gen("h2");
                h2.textContent = promotion.text;

                header.appendChild(h2);
                promoBlock.appendChild(header);
                upperDiv.appendChild(promoBlock);
            }
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * @param {Error} errMsg - error message to be handle and passed to the user
     * @returns None
     * Handles custom errors
     */
    function handleError(errMsg) {
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