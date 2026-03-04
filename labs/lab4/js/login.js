
const validUsers = {
    "adminUser": "Password123!"
};

const attemptLogin = (event) => {
    event.preventDefault();


    const { value: uName } = document.getElementById('loginUser');
    const { value: uPass } = document.getElementById('loginPass');
    const info = document.getElementById('loginFeedback');
   
     const userInput = document.getElementById('loginUser');
     userInput.classList.add('error-border');

    try {
    
        if (validUsers[uName] && validUsers[uName] === uPass) {
            info.textContent = "Login Successful!";
            info.style.color = "green";
        } else {
       
            document.getElementById('loginUser').style.borderColor = "red";
            throw new Error("Invalid username or password.");
        }
    } catch (error) {
        info.textContent = error.message; 
        info.style.color = "red";
    }
};

document.getElementById('loginForm').addEventListener('submit', attemptLogin);