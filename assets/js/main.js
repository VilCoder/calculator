document.addEventListener("DOMContentLoaded", () => {
    function Calculator() {
        this.operations = {
            "+": (a, b) => a + b,
            "−": (a, b) => a - b,
            "x": (a, b) => a * b,
            "÷": (a, b) => a / b,
            "%": (a, b) => (a * b) / 100,
        }

        this.operate = function(a, operator, b) {
            return this.operations[operator](a, b);
        }
    }
    const showResult = document.querySelector(".calculator__result");
    const operatorChars = ["÷", "x", "−", "+", "%"];
    const buttons = document.querySelectorAll(".calculator__button");

    buttons.forEach(button => {
        button.addEventListener("mousedown", (event) => {
            event.target.style.scale = 0.9;
        });

        button.addEventListener("mouseup", (event) => {
            event.target.style.scale = 1;
        });

        button.addEventListener("click", () => {
            const clickedButton = button.textContent;

            if (button.id === "c") {
                showResult.textContent = "0";
                return;
            }

            if (button.id === "delete") {
                if (showResult.textContent.length === 1) {
                    showResult.textContent = "0";
                } else {
                    showResult.textContent = showResult.textContent.trim().slice(0, -1);
                }

                return;
            }

            if (button.id === "equal") {
                try {
                    const split = showResult.textContent.split(" "),
                        a = +split[0],
                        operator = split[1],
                        b = +split[2];
                
                    const calculator = new Calculator();
                    const operationResult = calculator.operate(a, operator, b);
                    
                    if (isNaN(operationResult) || !isFinite(operationResult)) {
                        showResult.textContent = "0";
                        return;
                    }

                    showResult.textContent = operationResult;
                } catch (error) {
                    console.log( "Something went wrong => " + error);
                }

                return;
            }

            if (showResult.textContent === "0") {
                showResult.textContent = clickedButton;
            } else {
                if (operatorChars.includes(clickedButton)) {
                    showResult.textContent += " " + clickedButton + " ";
                } else {
                    showResult.textContent += clickedButton;
                }
            }
        });
    });
});