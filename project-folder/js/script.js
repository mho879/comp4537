// const gameWindow = document.getElementById("gameWindow")
const goButton = document.getElementById("goButton")

// Define button class for the N buttons being generated on the screen
class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
    }
    move() {
        // code for moving the object
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
        for (let i = 0; i < numberOfButtons; i++) {
            this.gameButtons.push(new Button(i + 1, this.generateRandomColor()))
        }
        setTimeout(() => {this.renderButtons()}, numberOfButtons * 1000);
        setTimeout(this.renderButtons.bind(this), numberOfButtons * 1000);
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
     * Moves buttons
     */
    moveButtons() {

    }

    /**
     * Updates the gameWindow property's value with the current window size
     */
    updateWindowDimensions() {
        this.gameWindow = document.getElementById("gameWindow")
    }

    /**
     * Render custom button on DOM
     */
    renderButtons() {
        const buttonContainer = document.getElementById("buttonContainer");
        for (let i = 0; i < this.gameButtons.length; i++) {
            let customButton = document.createElement("button");
            customButton.className += "customButton";
            customButton.style.background = this.gameButtons[i].color;
            customButton.innerText = `${i + 1}`
            buttonContainer.appendChild(customButton);
        }
    }
}

class Message {
    constructor(number, color) {
        this.number = number;
        this.color = color;
    }
}

goButton.addEventListener("click", () => {
    const myGame = new Game(document.getElementById("buttonCount").value);
});