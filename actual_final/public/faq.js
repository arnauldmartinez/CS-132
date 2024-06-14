/**
 * Name: Arnauld Martinez
 * Date: June 13th, 2024
 * 
 * This file populates the FAQ page of website.
 */

(function () {
    "use strict";

    let infoShown = [false, false, false, false, false];
    const NUM_INFO = 5;
    /**
     * @param None
     * @returns None
     * Populates the page with the selected questions and answers when loaded.
     */
    async function init() {
        populateQuestions();
    }

    /**
     * @param None
     * @returns None
     * Populates the page with the questions/answers
     */
    async function populateQuestions() {
        try {               
            for(let i = 1; i <= NUM_INFO; i++) {
                let response = await fetch(`/question/${i}`);
                checkStatus(response);
                const question = await response.json();
                addQuestion(question, i);
            }
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * @param {JSON} question - selected question
     * @param {int} i - question index
     * Adds the selected question to the DOM tree
     */
    function addQuestion(question, i) {
        let upperDiv = qs("#faq-container");

        let faqBlock = gen("div");
        faqBlock.classList.add("info-block");
        faqBlock.id = `block${i}`;

        let header = gen("div");
        header.classList.add("header");
        header.id = `header${i}`;

        let h2 = gen("h2");
        h2.textContent = question.text;

        let button = gen("button");
        button.textContent = "+";
        button.id = `button${i}`;
        button.addEventListener("click", () => addInfo(i));

        header.appendChild(h2);
        header.appendChild(button);

        faqBlock.appendChild(header);
        upperDiv.appendChild(faqBlock);
    }

    /**
     * @param {int} i - index of the answer to be shown
     * Adds the answer to the webpage
     */
    async function addInfo(i) {
        if(!infoShown[i]) {
            try {
                let response = await fetch(`/answer/${i}`);
                checkStatus(response);
                const answerInfo = await response.json();
                showAnswer(answerInfo.text, i);
                infoShown[i] = true;
            } catch (error) {
                handleError(error);
            }
        }
    }

    /**
     * @param {String} text - selected answer
     * @param {int} i - corresponding index
     * Adds the answer to the DOM tree
     */
    async function showAnswer(text, i) {
        let upperDiv = qs(`#block${i}`);
        let p = gen("p");
        p.textContent = text;
        upperDiv.appendChild(p);
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