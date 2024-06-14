/**
 * Name: Arnauld Martinez
 * Date: June 13th, 2024
 * 
 * This page creates a contact form that users can use to communicate with developers. Answers are saved
 * in messages.json.
 */

(function () {
    "use strict";

    let infoShown = false;

    /**
     * @param None
     * @returns None
     * Adds an event listener when the submit button is pressed
     */
    async function init() {
        let form = qs("#contact-form");
        form.addEventListener("submit", (event) => submitForm(event));
    }

    /**
     * @param {Event} event - current event
     * @returns None
     * Submits the form using a POST request to the API
     */
    async function submitForm(event) {
        event.preventDefault();
        let params = new FormData(id("contact-form"));
        try {
            let resp = await fetch("/addMessage", { method : "POST", body : params });
            checkStatus(resp);
            displaySuccess();
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * @param None
     * @returns None
     * Displays a success message when the form is successfully submitted
     */
    function displaySuccess() {
        let upperDiv = qs("#contact");
        if (!infoShown) {
            let p = gen("p");
            p.textContent = "Form submitted successfully";
            p.classList.add("success");
            upperDiv.appendChild(p);
            infoShown = true;
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