
let studentName = "Ana";
let age = 22;
let isStudent = true;


if (isStudent === true) {
    console.log(studentName + " is a student.");
} else {
    console.log(studentName + " is not a student.");
}


let futureAge = age + 8;


let message = studentName + " is " + age + " years old, in 8 years they will be " + futureAge;


document.getElementById("display-box").innerText = message;