/*
    Marco Ho (Set T)
    A01338160

    The following code was generated with the help of ChatGPT:
    - Game.generateRandomColor()
    - Button.randomizePosition()
*/

/**
 *  Button class
 */
class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
        this.id = `button${this.number}`;
        this.elementReference = null;
    }
    /**
     * Setter for elementRefrence
     * 
     * @param {Element} buttonFromDOM reference to the relative button on the DOM
     */
    setElementReference(buttonFromDOM) {
        this.elementReference = buttonFromDOM;
    }

    /**
     * Sets the inner text of the button element
     *
     * @param {string} text string to set the inner text to
     */
    setInnerText(text) {
        this.elementReference.innerText = text;
    }

    /**
     * Randomizes the position of this button within the viewport height & width
     */
    randomizePosition() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const buttonWidth = this.elementReference.offsetWidth;
        const buttonHeight = this.elementReference.offsetHeight;

        // Calculate random positions ensuring the button stays within bounds
        const randomX = Math.random() * (windowWidth - buttonWidth);
        const randomY = Math.random() * (windowHeight - buttonHeight);
    
        this.elementReference.style.top = `${randomY}`;
        this.elementReference.style.left = `${randomX}`;
    }

    /**
     * Makes the button element display its number on click
     */
    addClickFunction() {
        this.elementReference.addEventListener('click', () => {
            this.setInnerText(this.number);
        });
        
    }
}

/**
 * Game class for managing the game
 */
class Game {
    /**
     * Constructor for class Game
     */
    constructor(s) {
        this.gameButtons = [];
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
     * Render buttons on DOM
     * Loops through array gameButtons and creates a button element for each
     */
    renderButtons() {
        const buttonContainer = document.getElementById("buttonContainer");
        this.gameButtons.forEach((currentButton) => {
            const buttonAsElement = document.createElement("button");
            currentButton.setElementReference(buttonAsElement);
            currentButton.elementReference.className += "customButton";
            currentButton.elementReference.style.background = currentButton.color;
            currentButton.elementReference.innerText = currentButton.number;
            currentButton.elementReference.id = currentButton.id;
            buttonContainer.appendChild(currentButton.elementReference);
        });
    }

    /**
     * Waits for N miliseconds
     * 
     * @param {int} ms the time to wait in milliseconds
     * @returns a promise that invokes setTimeout
     */
    wait(ms) {
        return new Promise((_) => setTimeout(_, ms));
    }

    /**
     * Removes buttons stored in gameButtons from the DOM and resets the gameButtons array
     */
    clearButtons() {
        this.gameButtons.forEach((button) => {
            document.getElementById(`${button.id}`).remove();
        });
        this.gameButtons = [];
    }

    /**
     * Initializes the game
     * 
     * @param {*} numberOfButtons the number of buttons to create between 3 and 7
     */
    async init(numberOfButtons) {
        this.clearButtons();
        for (let i = 0; i < numberOfButtons; i++) {
            this.gameButtons.push(new Button(i + 1, this.generateRandomColor()))
        }
        await this.wait(numberOfButtons * 1000);
        this.renderButtons();
        for (let j = 0; j < numberOfButtons; j++) {
            await this.wait(2000);
            if (j == 0) {
                this.gameButtons.forEach((button) => {
                    button.elementReference.style.position = 'absolute';
                    button.elementReference.style.margin = '0px';
                });
            }
            this.gameButtons.forEach((button) => {
                button.randomizePosition();
            });
        }
        this.gameButtons.forEach((button) => {
            button.setInnerText("");
            button.addClickFunction();
        });
    }
}

class Message {
    constructor(number, color) {
        this.number = number;
        this.color = color;
    }
}

const myGame = new Game(0);
document.getElementById("goButton").addEventListener("click", () => {
    myGame.init(document.getElementById("buttonCount").value);
});