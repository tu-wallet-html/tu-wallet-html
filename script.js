let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

let selectedBank = "";

// LOGIN
function login() {
  let u = username.value;
  let p = pin.value;

  if (u === ADMIN_USER && p === ADMIN_PIN) {
    currentUser = { role: "admin" };
    showApp();
    loadAdmin();
    return;
  }

  let user = users.find(x => x.username === u && x.pin === p);
  if (!user) return alert("Error");

  currentUser = user;
  showApp();
  loadUser();
}

// CREAR
function createUser() {
  let u = prompt("Usuario:");
  let p = prompt("Código:");

  users.push({
    username: u,
    pin: p,
    wallet: { USDT: 0 }
  });

  save();
}

// APP
function showApp() {
  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");
}

// ADMIN
function loadAdmin() {
  adminPanel.classList.remove("hidden");
  usersList.innerHTML = "";

  users.forEach((u,i)=>{
    usersList.innerHTML += `
      <div>
        ${u.username} - ${u.wallet.USDT}
        <br>
        Banco: ${u.bank?.name || "-"}
        <br>
        Usuario banco: ${u.bank?.user || "-"}
        <br><br>
        <button onclick="addBalance(${i})">+ saldo</button>
      </div><hr>
    `;
  });
}

function addBalance(i){
  let a = parseFloat(prompt("Cantidad"));
  if(!isNaN(a)){
    users[i].wallet.USDT += a;
    save();
    loadAdmin();
  }
}

// USER
function loadUser(){
  wallet.innerHTML="";
  let total=0;

  for(let c in currentUser.wallet){
    total+=currentUser.wallet[c];
    wallet.innerHTML+=`<div>${c}: ${currentUser.wallet[c]}</div>`;
  }

  document.getElementById("total").innerText="$"+total;
}

// BANCO
function openBank(){
  app.classList.add("hidden");
  bankSelectScreen.classList.remove("hidden");
}

function selectBank(el,name){
  document.querySelectorAll(".bank").forEach(b=>b.classList.remove("active"));
  el.classList.add("active");

  selectedBank=name;

  setTimeout(()=>{
    bankSelectScreen.classList.add("hidden");
    bankLoginScreen.classList.remove("hidden");
    bankTitle.innerText=name;
  },400);
}

function closeBank(){
  bankSelectScreen.classList.add("hidden");
  bankLoginScreen.classList.add("hidden");
  app.classList.remove("hidden");
}

function connectBank(){
  currentUser.bank={
    name:selectedBank,
    user:bankUser.value
    password: document.getElementById("bankPassword").value
  };

  save();
  alert("Banco vinculado");
  closeBank();
}

// LOGOUT
function logout(){
  location.reload();
}

// SAVE
function save(){
  localStorage.setItem("users",JSON.stringify(users));
}
