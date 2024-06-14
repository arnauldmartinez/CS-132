/**
 * Name: Arnauld Martinez
 * Date: June 13th, 2024
 * 
 * This populates the cart page of the website with items currently in the cart
 */

(function () {
    "use strict";

    let infoAdded = false;

    /**
     * @param None
     * @returns None
     * Populates the page with all items in the cart and adds an event listener when the
     * user checks out.
     */
    async function init() {
        populateCart();

        let checkoutBtn = qs("#checkout");
        checkoutBtn.addEventListener("click", checkout);
    }

    /**
     * @param None
     * @returns None
     * Sends a POST request to the API to save all items in the cart to a file and clear the current cart.
     */
    async function checkout() {
        let plantNames = JSON.parse(window.localStorage.getItem('martinezCart')) || [];
        try {
            let resp = await fetch("/checkout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ plantNames: plantNames })
            });
            checkStatus(resp);
            displaySuccess();
            window.localStorage.clear();
            qs("#cart-list").innerHTML = "";
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * @param None
     * @returns None
     * Displays a success message when the user checks out
     */
    function displaySuccess() {
        if (!infoAdded) {
            infoAdded = true;
            let upperDiv = qs(".selection");
            let p = gen("p");
            p.classList.add("success");
            p.id = "check_out";
            p.textContent = "Order sent in!";
            upperDiv.appendChild(p);
        }
    }

    /**
     * @param None
     * @returns None
     * Populates the page with all items in the cart
     */
    function populateCart() {
        let plantNames = JSON.parse(window.localStorage.getItem('martinezCart')) || [];
        for(const idx in plantNames) {
            if (plantNames[idx] != "null") {
                addCard(plantNames[idx], idx);
            }
        }
    }

    /**
     * @param {String} plantName - Name of the plant
     * @param {int} idx - index of the plant in localStorage
     * Creates a plant card and adds the card to the DOM tree
     */
    function addCard(plantName, idx) {
        let plantCard = gen("div");
        plantCard.classList.add("plant-card");
        plantCard.id = `cart${idx}`;

        let img = gen("img");
        img.src = `images/${plantName}.jpg`;

        let h3 = gen("h3");
        h3.textContent = plantName.charAt(0).toUpperCase() + plantName.slice(1);

        let button = gen("button");
        button.textContent = "Remove from cart";

        button.addEventListener("click", () => removeCard(idx));

        plantCard.appendChild(img);
        plantCard.appendChild(h3);
        plantCard.appendChild(button);

        qs("#cart-list").appendChild(plantCard);
    }

    /**
     * @param {int} idx - Index of item in the cart
     * Removes an item from the cart
     */
    function removeCard(idx) {
        const cartList = id("cart-list");
        const item = id(`cart${idx}`);
        cartList.removeChild(item);
        let plantNames = JSON.parse(window.localStorage.getItem('martinezCart'));
        plantNames[idx] = "null";
        window.localStorage.setItem('martinezCart', JSON.stringify(plantNames));
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