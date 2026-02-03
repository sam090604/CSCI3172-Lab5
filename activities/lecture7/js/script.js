// --- Part 1: Time-based Greeting ---
const now = new Date();
const hour = now.getHours();
let greetingMessage = "";

if (hour < 12) {
    greetingMessage = "Good Morning!";
} else if (hour < 15) {
    greetingMessage = "Hey! I think we are in class!";
} else {
    greetingMessage = "Welcome!";
}

document.getElementById("greeting").innerHTML = greetingMessage;

// --- Part 2: Four-Function Calculator ---
function calculate(operation) {
    const num1 = parseFloat(document.getElementById("number1").value);
    const num2 = parseFloat(document.getElementById("number2").value);
    const resultDisplay = document.getElementById("calcResult");
    let result = 0;

    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.innerHTML = "Result: Please enter valid numbers";
        return;
    }

    switch (operation) {
        case 'add': result = num1 + num2; break;
        case 'subtract': result = num1 - num2; break;
        case 'multiply': result = num1 * num2; break;
        case 'divide': result = num2 !== 0 ? num1 / num2 : "Cannot divide by zero"; break;
    }

    resultDisplay.innerHTML = "Result: " + result;
}

// --- Part 3: Array Functions ---

// Returns 'even' or 'odd' based on the NUMBER of items in the array
function evenOddArray(arr) {
    return arr.length % 2 === 0 ? "even" : "odd";
}

// Returns a string describing if each individual item is even or odd
function evenOddArrayItems(arr) {
    return arr.map(num => (num % 2 === 0 ? "even" : "odd")).join(", ");
}

// Main function to handle UI interaction for the array
function analyzeArray() {
    const inputString = document.getElementById("arrayInput").value;
    // Convert comma-separated string to an array of numbers
    const numArray = inputString.split(',').map(item => parseFloat(item.trim())).filter(item => !isNaN(item));

    if (numArray.length === 0) {
        alert("Please enter a valid array of numbers.");
        return;
    }

    document.getElementById("evenOddTotal").innerHTML = evenOddArray(numArray);
    document.getElementById("evenOddItems").innerHTML = evenOddArrayItems(numArray);
}


