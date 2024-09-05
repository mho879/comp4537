/*
    Marco Ho (Set T)
    A01338160

    The following code was generated with the help of ChatGPT:
    - Game.generateRandomColor()
    - Button.randomizePosition()
*/

// Define button class for the N buttons being generated on the screen
class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.id = `button${this.number}`;
        // this.elementReference = document.createElement("button");
    }
    /**
     * Moves the button to a random position within the window
     * 
     */
    randomizePosition() {
        const buttonElement = document.getElementById(this.id);
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
        const windowWidth = window.innerWidth / rootFontSize;
        const windowHeight = window.innerHeight / rootFontSize;
        buttonElement.style.transform = `translate(${Math.random() * (windowWidth - 10)}em, ${Math.random() * (windowHeight - 5)}em)`;
    }
    hideText() {
        document.getElementById(`${this.id}`).innerText = "";
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
                button.randomizePosition();
            });
        }
        this.gameButtons.forEach((button) => {
            button.hideText();
        });
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