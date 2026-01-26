// Create an array of possible answers
const eightBallAnswers = [
    "It is certain", 
    "Reply hazy, try again", 
    "Don't count on it", 
    "My sources say no"
];

const fortuneSayings = [
    "A golden egg of opportunity falls into your lap.",
    "Your high-minded principles spell success.",
    "Live this day as if it were your last.",
    "Your life will be happy and peaceful.",
    "Reach for joy and all else will follow.",
    "Move in the direction of your dreams.",
    "Bloom where you are planted.",
    "Appreciate. Appreciate. Appreciate.",
    "Happy News is on its way.",
    "Hard work pays off in the future."
];
  
// Create a function to fetch the question the user has asked 	
// Our function should also check from an empty value

function askQuestion() {
    const question = document.getElementById('userQuestion').value;

    if (question.trim() === "") {
        alert("Please enter a question!");
        return;
    }

    getAnswer(question);
}
function getAnswer(question) {
    // Randomly select which array to use
    const isFortune = Math.random() < 0.5;
    const selectedList = isFortune ? fortuneSayings : eightBallAnswers;
    
    // Pick a random index from the chosen array
    const randomIndex = Math.floor(Math.random() * selectedList.length);
    const finalAnswer = selectedList[randomIndex];

    // Update the HTML paragraph
    document.getElementById('answer').innerText = finalAnswer;

    // Log to console
    console.log("Question: " + question);
    console.log("Source: " + (isFortune ? "Fortune" : "8-Ball"));
    console.log("Answer: " + finalAnswer);

    return finalAnswer;
}