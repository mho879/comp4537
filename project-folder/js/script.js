/*
    Marco Ho (Set T)
    A01338160

    The following code was generated with the help of ChatGPT:
    - Game.generateRandomColor()
    - Game.wait()
    - Button.randomizePosition()
    - Messages.loadMessages()
    - Messages.init()
*/

/**
 * Constants for HTML elements
 */
const GO_BUTTON_ID = 'goButton';
const BUTTON_CONTAINER_ID = 'buttonContainer';
const CUSTOM_BUTTON_CLASS = 'customButton';
const BUTTON_ELEMENT = 'button';
const USER_INPUT_ID = 'UserInput';

/**
 * Constants for events
 */
const EVENT_CLICK = 'click';

/**
 * Constants for message Keys
 */
const NUMBER_RANGE = 'numberRange';
const EXCELLENT_MEMORY = 'excellentMemory'
const WRONG_ORDER = 'wrongOrder';


/**
 *  Button class
 */
class Button {
    constructor(number, color) {
        this.number = number;
        this.color = color;
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

        const randomX = Math.random() * (windowWidth - buttonWidth);
        const randomY = Math.random() * (windowHeight - buttonHeight);
    
        this.elementReference.style.top = `${randomY}`;
        this.elementReference.style.left = `${randomX}`;
    }

    /**
     * Makes the button element display its number on click
     */
    addClickFunction() {
        this.elementReference.addEventListener(EVENT_CLICK, () => {
            this.setInnerText(this.number);
        });
        
    }
}


/**
 * Game class
 */
class Game {
    /**
     * Constructor for class Game
     */
    constructor(language) {
        this.gameButtons = [];
        this.MessageHandler = new MessageDisplay(language);
        this.currentButtonCount = null;
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
        const buttonContainer = document.getElementById(BUTTON_CONTAINER_ID);
        this.gameButtons.forEach((currentButton) => {
            const buttonAsElement = document.createElement(BUTTON_ELEMENT);
            currentButton.setElementReference(buttonAsElement);
            currentButton.elementReference.className += CUSTOM_BUTTON_CLASS;
            currentButton.elementReference.style.background = currentButton.color;
            currentButton.elementReference.innerText = currentButton.number;
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
            button.elementReference.remove();
        });
        this.gameButtons = [];
    }

    /**
     * Adds click listeners to buttons and starts game
     */
    startButtonClickingGame() {
        this.currentButtonCount = 1;
        this.gameButtons.forEach(button => {
            const onClickHandler = this.createButtonClickHandler(button);
            button.elementReference.addEventListener(EVENT_CLICK, onClickHandler);
            button.onClickHandler = onClickHandler;
        });
    }


    /**
     * Creates onClick handler for buttons within this.gameButtons
     * 
     * @param {*} button the button to add the handler to
     * @returns the on-click handler
     */
    createButtonClickHandler(button) {
        return () => {
            if (button.number === this.currentButtonCount) {
                button.elementReference.innerText = button.number;
                this.currentButtonCount++;
                if (this.currentButtonCount > this.gameButtons.length) {
                    this.MessageHandler.showMessage(EXCELLENT_MEMORY);
                }
            } else {
                this.gameOver();
            }
        };
    }

    /**
     * Game over method for when the player clicks on the wrong box
     */
    gameOver() {
        this.gameButtons.forEach(button => {
            button.setInnerText(button.number);
            button.elementReference.removeEventListener(EVENT_CLICK, button.onClickHandler);
        })
        this.MessageHandler.showMessage(WRONG_ORDER)
    }

    /**
     * Initializes the game
     * 
     * @param {*} numberOfButtons the number of buttons to create between 3 and 7
     */
    async init(numberOfButtons) {
        if (numberOfButtons < 3 || numberOfButtons > 7) {
            this.MessageHandler.showMessage(NUMBER_RANGE);
        } else {
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
            });
            this.startButtonClickingGame();
        }
    }
}


/**
 * MessageDisplay class
 * Manages the various messages to display
 */
class MessageDisplay {
    constructor(language){
        this.language = language;
        this.messages = null;
        this.init();
    }

    /**
     * Loads messages from user.js in resppective language folder in lang/messages
     * 
     * @returns the default exports from a user.js file
     */
    async loadMessages() {
        const modulePath = `../lang/messages/${this.language}/user.js`;
        try {
            const module = await import(modulePath);
            return module.default;
        } catch (error) {
            console.error("Error loading module:", error);
            throw error;
        }
    }
    
    /**
     * Initializes loadMessages() and handles the Promise
     */
    async init() {
        try {
            this.messages = await this.loadMessages();
        } catch (error) {
            console.error("Error loading messages in MessageDisplay:", error);
        }
    }


    /**
     * Displays the message in an alert box provided the key exists within MessageDisplay.messages
     * 
     * @param {*} type the key for an existing message within MessageDisplay.messages
     */
    showMessage(type) {
        alert(this.messages[type]);
    }
    


}

const myGame = new Game(document.documentElement.lang);
document.getElementById(GO_BUTTON_ID).addEventListener(EVENT_CLICK, () => {
    myGame.init(document.getElementById(USER_INPUT_ID).value);
});