function togglePassword(inputId, el){
    const input = document.getElementById(inputId);
    if(input.type === "password"){
        input.type = "text";
        el.textContent = "👀";
    } else {
        input.type = "password";
        el.textContent = "🙈";
    }
}

let users = JSON.parse(localStorage.getItem("users")) || [];

function signup(){
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    if(users.some(u=>u.email===email)){ alert("User already exists"); return; }
    users.push({name,email,password,role:"User",tasks:[],reports:[]});
    localStorage.setItem("users",JSON.stringify(users));
    alert("Signup successful"); window.location="index.html";
}

function login(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = users.find(u=>u.email===email && u.password===password);
    if(!user){ alert("Invalid credentials"); return; }
    localStorage.setItem("loggedIn","true");
    localStorage.setItem("currentUser",JSON.stringify(user));
    window.location="dashboard.html";
}

function resetPassword(){
    const email = document.getElementById("resetEmail").value;
    const password = document.getElementById("resetPassword").value;
    const user = users.find(u=>u.email===email);
    if(!user){ alert("User not found"); return; }
    user.password = password;
    localStorage.setItem("users",JSON.stringify(users));
    alert("Password reset successful"); window.location="index.html";
}