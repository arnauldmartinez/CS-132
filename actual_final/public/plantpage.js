/**
 * Name: Arnauld Martinez
 * Date: June 13th, 2024
 * 
 * This file populates the html file corresponding to each product.
 */

(function () {
    "use strict";

    let numAdded = 0;

    /**
     * @param None
     * @returns None
     * Creates the information card when loaded
     */
    async function init() {
        createCard();
    }

    /**
     * @param None
     * @returns None
     * Creates an information card for the given plant
     */
    async function createCard() {
        let upperDiv = qs(".name");
        let plantName = upperDiv.id;
        try {
            let resp = await fetch(`/plant-info/${plantName}`);
            checkStatus(resp);
            resp = await resp.json();
            makeElement(plantName, resp);
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * @param {String} name - Name of the plant
     * @param {JSON} resp - Json data for the plant
     * Creates an information card given the name of the plant and data of the plant.
     * Adds the information to the DOM tree. Also creates an event listener to add items
     * to the cart.
     */
    async function makeElement(name, resp) {
        let upperDiv = qs(".name");

        let img = gen("img");
        img.src = `../images/${name}.jpg`;
        img.alt = name;

        let h4 = gen("h4");
        h4.classList.add("name");
        h4.textContent = name.charAt(0).toUpperCase() + name.slice(1);

        let p1 = gen("p");
        p1.classList.add("description");
        p1.textContent = resp[0];

        let p2 = gen("p");
        p2.classList.add("description");
        p2.textContent = `Price: $${resp[1]}`;

        let button = gen("button");
        button.classList.add("cart");
        button.textContent = "Add to Cart";
        button.addEventListener("click", () => addToCart(name));

        upperDiv.appendChild(img);
        upperDiv.appendChild(h4);
        upperDiv.appendChild(p1);
        upperDiv.appendChild(p2);
        upperDiv.appendChild(button);
    }

    /**
     * @param {String} name - Name of the plant
     * @returns None
     * Adds the plant to the cart
     */
    function addToCart(name) {
        let currentCart = JSON.parse(window.localStorage.getItem('martinezCart')) || [];
        currentCart.push(name);
        window.localStorage.setItem("martinezCart", JSON.stringify(currentCart));

        showMessage();
    }

    /**
     * @param None
     * @returns None
     * Adds a success message to the DOM tree if item was successfully added to the cart
     */
    function showMessage() {
        if(numAdded == 0) {
            numAdded += 1;
            let upperDiv = qs(".name");
            let p = gen("p");
            p.classList.add("success");
            p.textContent = `Successfully added ${numAdded} to cart`;
            upperDiv.appendChild(p);
        } else {
            numAdded += 1;
            qs(".success").textContent = `Successfully added ${numAdded} to cart`;
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