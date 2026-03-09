// Load users
let users = JSON.parse(localStorage.getItem("users")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const totalUsersEl = document.getElementById("totalUsers");
const totalTasksEl = document.getElementById("totalTasks");
const totalReportsEl = document.getElementById("totalReports");

function updateDashboardCards(){
    totalUsersEl.textContent = users.length;
    totalTasksEl.textContent = tasks.length;
    let totalReports = users.reduce((acc, u)=> acc + (u.reports ? u.reports.length : 0), 0);
    totalReportsEl.textContent = totalReports;
}

function showPage(pageId){
    document.querySelectorAll(".page").forEach(p=>p.style.display="none");
    document.getElementById(pageId).style.display="block";
    if(pageId=="users") renderUsersTable();
    if(pageId=="tasks") renderTasksTable();
    if(pageId=="reports") renderReportsTable();
}

// ===== USERS =====
function addUser(e){
    e.preventDefault();
    const name = document.getElementById("newUserName").value;
    const email = document.getElementById("newUserEmail").value;
    const password = document.getElementById("newUserPassword").value;
    if(users.some(u=>u.email===email)){ alert("User exists"); return; }
    users.push({name,email,password,role:"User",tasks:[],reports:[]});
    localStorage.setItem("users",JSON.stringify(users));
    renderUsersTable();
    updateDashboardCards();
    e.target.reset();
}

function renderUsersTable(){
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML="";
    users.forEach((u,i)=>{
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${u.name}</td><td>${u.email}</td><td>${u.role}</td>
        <td>
        <button onclick="deleteUser(${i})">Delete</button>
        </td>`;
        tbody.appendChild(tr);
    });
}

function deleteUser(index){
    if(confirm("Delete user?")){
        users.splice(index,1);
        localStorage.setItem("users",JSON.stringify(users));
        renderUsersTable();
        updateDashboardCards();
    }
}

// ===== TASKS =====
function renderTasksTable(){
    const tbody = document.querySelector("#tasksTable tbody");
    tbody.innerHTML="";
    tasks.forEach((t,i)=>{
        let tr = document.createElement("tr");
        tr.innerHTML = `<td>${t.user}</td><td>${t.name}</td><td>${t.status}</td>
        <td>${t.remarks||""}</td>
        <td><button onclick="deleteTask(${i})">Delete</button></td>`;
        tbody.appendChild(tr);
    });
}

function deleteTask(index){
    if(confirm("Delete task?")){
        tasks.splice(index,1);
        localStorage.setItem("tasks",JSON.stringify(tasks));
        renderTasksTable();
        updateDashboardCards();
    }
}

// ===== REPORTS =====
function renderReportsTable(){
    const tbody = document.querySelector("#reportsTable tbody");
    tbody.innerHTML="";
    users.forEach(u=>{
        (u.reports||[]).forEach(r=>{
            let tr = document.createElement("tr");
            tr.innerHTML=<td>${u.name}</td><td>${r.name}</td><td>${r.status}</td>;
            tbody.appendChild(tr);
        });
    });
}

// ===== LOGOUT =====
function logout(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    window.location="index.html";
}

// ===== INIT =====
updateDashboardCards();
showPage("home");