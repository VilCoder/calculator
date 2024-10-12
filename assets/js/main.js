document.addEventListener("DOMContentLoaded", () => {
    function calculator(str) {
        const split = stringSplit(str),
            a = +split[0],
            operator = split[1],
            b = +split[2],
            temp = split[3];

        const operationResult = operate(a, operator, b);
        
        if (isNaN(operationResult) || !isFinite(operationResult)) {
            resultDisplay.textContent = "0";
            aritmeticCount = 0;
            return;
        }

        if (aritmeticCount > 0) aritmeticCount -= 1;

        if (temp) {
            resultDisplay.textContent = operationResult + temp;
            return;
        }
        
        resultDisplay.textContent = operationResult;
    }

    function operate(a, operator, b) {
        const operations = {
            "+": (a, b) => a + b,
            "-": (a, b) => a - b,
            "*": (a, b) => a * b,
            "/": (a, b) => a / b,
            "%": (a, b) => (a * b) / 100,
        }

        if (!Number.isInteger(operations[operator](a, b))) {
            return operations[operator](a, b).toFixed(1);
        }
        
        return operations[operator](a, b);
    }

    function stringSplit(str) {
        const split = [];
        let index = 0;

        for (let i = 0; i < str.length; i++) {
            if (aritmeticChars.includes(str[i])) {

                if(i === 0) {
                    continue;
                }

                split.push(str.slice(index, i));

                split.push(str[i]);

                index = i + 1;
            }
        }

        split.push(str.slice(index));

        return split;
    }

    function updateDisplay(char) {
        const validChars = "0123456789+-*/%.";

        if (resultDisplay.textContent === "0" && validChars.includes(char)) {
            resultDisplay.textContent = char;
        } else {
            if (validChars.includes(char)) {
                resultDisplay.textContent += char;
            }
        }
    }

    function deleteDisplay(id) {
        if (id === "delete" || id === "backspace") {
            if (resultDisplay.textContent.length === 1) {
                resultDisplay.textContent = "0";
            } else {
                resultDisplay.textContent = resultDisplay.textContent.slice(0, -1);
            }
        } else {
            resultDisplay.textContent = "0";
        }
    }

    function reseatAritmeticCount(char) {
        const lastChar = resultDisplay.textContent.at(-1);

        if(char === "c" || aritmeticChars.includes(lastChar)){
            aritmeticCount = 0;
        }
    }

    function toggleDecimalButton() {
        // Find and split the content matching any arithmetic operator
        const lastNumber = resultDisplay.textContent.split(/[\+\-\*\/%]/).pop(); 

         // If the last number already contains a decimal point, it does not allow adding another one.
        if (lastNumber.includes(".")) {
            return false; // Indicates that the decimal point should not be added
        } else {
            return true; // Indicates that the decimal point can be added
        }
    }

    const resultDisplay = document.querySelector(".calculator__result");
    const buttons = document.querySelectorAll(".calculator__button");
    const aritmeticChars = "+-*/%";
    let aritmeticCount = 0;

    document.addEventListener("keydown", (event) => {
        const selectedKey = event.key.toLocaleLowerCase();

        // We only add if toggleDecimalButton returns true
        if (selectedKey === "." && !toggleDecimalButton()) {
            return;  // Avoid adding the period is there is already one in the current number
        }

        updateDisplay(selectedKey);

        if (selectedKey === "backspace" || selectedKey === "c") {
            reseatAritmeticCount(selectedKey);

            deleteDisplay(selectedKey);

            return;
        }

        if (aritmeticChars.includes(selectedKey) && resultDisplay.textContent.length > 1) {
            aritmeticCount++;
        }

        if (selectedKey === "=" || aritmeticCount === 2) {
            try {
                calculator(resultDisplay.textContent);
            } catch (error) {
                console.log( "Somethig went wrong => " + error);
            }
        } 
    });
        
    buttons.forEach(button => {        
        button.addEventListener("mousedown", (event) => {
            event.target.style.scale = 0.9;
        });
        
        button.addEventListener("mouseup", (event) => {
            event.target.style.scale = 1;
        });
        
        button.addEventListener("click", () => {
            const clickedButton = button.textContent;

            // We only add if toggleDecimalButton returns true
            if (clickedButton === "." && !toggleDecimalButton()) {
                return;  // Avoid adding the period is there is already one in the current number
            }

            if (button.id === "c" || button.id === "delete") {

                reseatAritmeticCount(button.id);

                deleteDisplay(button.id);
                
                return;
            }

            updateDisplay(clickedButton);

            if (aritmeticChars.includes(clickedButton) && resultDisplay.textContent.length > 1) {
                aritmeticCount++;
            }
            
            if (button.id === "equal" || aritmeticCount === 2) {
                try {
                    calculator(resultDisplay.textContent);
                } catch (error) {
                    console.log( "Somethig went wrong => " + error);
                }
            }
        });
    });
});