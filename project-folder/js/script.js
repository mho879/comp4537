/*
    Marco Ho (Set T)
    A01338160

    The following code was generated using ChatGPT:
    - code within method Game.generateRandomColor()
*/

// Define button class for the N buttons being generated on the screen
class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.id = `button${this.number}`;
        // this.elementReference = document.createElement("button");
    }
    moveButton() {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        document.getElementById(`${this.id}`).style.transform = `translate(${Math.floor(Math.random() * windowWidth)}px, ${Math.floor(Math.random() * windowHeight)}px)`;
    }
}

/**
 * Game class for managing the game
 */
class Game {
    /**
     * Constructor for class Game
     * 
     * @param {string} numberOfButtons the number of buttons to create between 3 and 7
     */
    constructor(numberOfButtons) {
        this.gameWindow = this.updateWindowDimensions
        this.gameButtons = [];
        this.init(numberOfButtons);
        // setTimeout(() => {
        //     this.renderButtons.bind(this)

        //     setTimeout(() => {
                // this.gameButtons.forEach((button) => {
                //     button.moveButton();
                // }
        //     )}, 5000);
        // }, numberOfButtons * 1000);
    } 

    /**
     * Generates a random hexadecimal color string
     * 
     * @returns a random hexadecimal color string
     */
    generateRandomColor() {
        // Generate a random number between 0 and 16777215 (which is 0xFFFFFF in decimal)
        const randomNum = Math.floor(Math.random() * 16777215);
        // Convert the random number to a hexadecimal string and pad with leading zeros if necessary
        const hexColor = `#${randomNum.toString(16).padStart(6, '0')}`;
        return hexColor;
    }

    /**
     * Moves button
     */
    moveButtons(buttonToMove) {
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;

        // Get the root font size (usually from the <html> or <body> tag)
        let rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

        // Get the button's width and height in em from its computed style
        let buttonWidthEm = parseFloat(getComputedStyle(buttonToMove).width);
        let buttonHeightEm = parseFloat(getComputedStyle(buttonToMove).height);

        // Convert button dimensions from em to px
        let buttonWidthPx = buttonWidthEm * rootFontSize;
        let buttonHeightPx = buttonHeightEm * rootFontSize;
        buttonToMove.style.left = Math.floor(Math.random() * (windowWidth - buttonWidthPx)) + 'px';
        buttonToMove.style.top = Math.floor(Math.random() * (windowHeight - buttonHeightPx)) + 'px';

    }

    /**
     * Updates the gameWindow property's value with the current window size
     */
    updateWindowDimensions() {
        this.gameWindow = document.getElementById("gameWindow")
    }

    /**
     * Render buttons on DOM
     * Loops through array gameButtons and creates a button element for each
     */
    renderButtons() {
        const buttonContainer = document.getElementById("buttonContainer");
        this.gameButtons.forEach((currentButton) => {
            currentButton.elementReference = document.createElement("button");
            currentButton.elementReference.className += "customButton";
            currentButton.elementReference.style.background = currentButton.color;
            currentButton.elementReference.innerText = currentButton.number;
            currentButton.elementReference.id = currentButton.id
            buttonContainer.appendChild(currentButton.elementReference);
        });
    }

    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async init(numberOfButtons) {
        for (let i = 0; i < numberOfButtons; i++) {
            this.gameButtons.push(new Button(i + 1, this.generateRandomColor()))
        }
        await this.wait(numberOfButtons * 1000);
        this.renderButtons();
        for (let j = 0; j < numberOfButtons; j++) {
            await this.wait(2000);
            if (j == 0) {
                this.gameButtons.forEach((button) => {
                    document.getElementById(`${button.id}`).style.position = 'absolute';
                });
            }
            this.gameButtons.forEach((button) => {
                button.moveButton();
            });
        }
    }
}

class Message {
    constructor(number, color) {
        this.number = number;
        this.color = color;
    }
}


document.getElementById("goButton").addEventListener("click", () => {
    new Game(document.getElementById("buttonCount").value);
});