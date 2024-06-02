/**
 * Name: Arnauld Martinez
 * Date: May 25th, 2024
 * 
 * This is game.js, the javascript necessary to update the Guessing Game
 * page on the website. It randomly generates an image and keeps track of 
 * the user's score.
 */

(function () {
    "use strict";

    let BASE_EP = "https://dog.ceo/api/breeds/image/random";
    let correctBreed = "";
    let totalScore = 0;
    // Boolean to determine whether the 'Wrong' or 'Correct' label is displayed
    let resultDisplayed = false;
    // Boolean to determine whether the photo was added
    let photoDisplayed = false;

    /**
     * Initializes event listeners for the next button
     * @param None
     * @returns None
     */
    async function init() {
        getPhoto();
        let submitButton = qs("#submit-btn");
        submitButton.addEventListener("click", checkGuess);
    }

    /**
     * Gets a random photo from the dog API and updates the DOM tree
     * accordingly
     * @param None
     * @returns None
     */
    async function getPhoto() {
        try {
            let resp = await fetch(BASE_EP, {
                method: "GET",
            });
            checkStatus(resp);
            let data = await resp.json();
            correctBreed = getBreed(data.message);
            
            if(photoDisplayed) {
                let img = qs("#rand-image");
                img.id = "rand-image";
                img.src = data.message;
                img.alt = correctBreed;
            } else {
                let img = document.createElement("img");
                img.id = "rand-image";
                img.src = data.message;
                img.alt = correctBreed;
                qs("#dog-image").appendChild(img);
                photoDisplayed = true;
            }

        } catch (err) {
            handleError(err);
        }
    }

    /**
     * Gets the breed of the dog from the data field of the dog API
     * @param data: String of the data fetched from the dog API
     * @returns None
     */
    function getBreed(data) {
        let dataSplit = data.split("/");
        let distToBreed = 2;
        let breed = dataSplit[dataSplit.length - distToBreed].replace("-", " ").split(" ").reverse().join(" ");
        return breed;
    }

    /**
     * Checks whether a guess is correct or not. Updates the DOM tree
     * accordingly.
     * @param None
     * @returns None
     */
    function checkGuess() {
        let guess = qs("#guess");
        if(guess.value.toLowerCase() === correctBreed.toLowerCase()) {
            totalScore += 1;
            getPhoto();
            guess.value = "";
            if(!resultDisplayed) {
                correctResult();
            } else {
                id("result").textContent = "Correct!";
            }
            id("score").textContent = "Score: " + totalScore.toString();
        } else if (!resultDisplayed) {
            wrongResult();
        } else {
            id("result").textContent = "Wrong";
        }
    }

    /**
     * Updates the DOM tree based on a correct answer
     * @param None
     * @returns None
     */
    function correctResult() {
        let p = document.createElement("p");
        p.id = "result";
        p.textContent = "Correct!";
        qs("#game").appendChild(p);
        resultDisplayed = true;
    }

    /**
     * Updates the DOM tree based on an incorrect answer
     * @param None
     * @returns None
     */
    function wrongResult() {
        let p = document.createElement("p");
        p.id = "result";
        p.textContent = "Wrong";
        qs("#game").appendChild(p);
        resultDisplayed = true;
    }
    
    /**
     * Adds a user friendly error message if the API throws an error.
     * @param None
     * @returns None
     */
    function handleError(errMsg) {
        if (typeof errMsg === "string") {
            qs("#message-area").textContent = errMsg;
        } else {
            // the err object was passed, don't want to show it on the page;
            // instead use generic error message.
            qs("#message-area").textContent =
                "An error ocurred fetching the Spotify data. Please try again later.";
        }
        qs("#message-area").classList.remove("hidden");
    }

    init();
})();