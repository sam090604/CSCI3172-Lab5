
let users = {
    "adminUser": "Password123!"
};

const handleRegistration = (event) => {
    event.preventDefault();

   
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const feedback = document.getElementById('feedback');
    const errorSet = new Set(); 
    try {
     
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,8}$/;
        if (!emailRegex.test(email)) errorSet.add("Invalid email format (TLD must be 2-8 chars).");

        if (/^[0-9]/.test(username) || /[^a-zA-Z0-9]/.test(username)) {
            errorSet.add("Username cannot start with a number or contain special characters.");
        }

        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
        if (!passRegex.test(password)) {
            errorSet.add("Password must be 12+ chars with Uppercase, Lowercase, Number, and Special char.");
        }

        if (password !== confirmPassword) errorSet.add("Passwords do not match.");

        if (errorSet.size > 0) {
            throw new Error([...errorSet][0]); 
        }

        
        if (users[username]) throw new Error("Username already exists.");
        users[username] = password;
        feedback.textContent = "You've been successfully registered!";
        feedback.style.color = "green";
        console.log("Database Updated:", JSON.stringify(users));

    } catch (err) {
        
        feedback.textContent = err.message;
        feedback.style.color = "red";
    }
};

document.getElementById('regForm').addEventListener('submit', handleRegistration);