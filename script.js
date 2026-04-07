let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

let selectedBank = "";

// PRECIOS
const prices = {
  BTC: 60000,
  ETH: 3000,
  USDT: 1
};

// LOGIN
function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("pin").value;

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
    wallet: { BTC:0, ETH:0, USDT:0 },
    bank: null
  });

  save();
}

// APP
function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// 👑 ADMIN PRO
function loadAdmin() {
  let list = document.getElementById("usersList");
  document.getElementById("adminPanel").classList.remove("hidden");
  list.innerHTML = "";

  users.forEach((u,i)=>{
    list.innerHTML += `
      <div style="background:#111;padding:10px;margin:10px;border-radius:10px">
        <b>${u.username}</b>
        <br>Saldo: ${u.wallet.USDT} USDT
        <br>Banco: ${u.bank?.name || "-"}
        <br>User banco: ${u.bank?.user || "-"}
        <br><br>
        <button onclick="addBalance(${i})">+ saldo</button>
        <button onclick="deleteUser(${i})">❌ borrar</button>
      </div>
    `;
  });
}

function addBalance(i){
  let a = parseFloat(prompt("€ a añadir"));
  if(!isNaN(a)){
    users[i].wallet.USDT += a;
    save();
    loadAdmin();
  }
}

function deleteUser(i){
  users.splice(i,1);
  save();
  loadAdmin();
}

// WALLET
function loadUser(){
  let div = document.getElementById("wallet");
  div.innerHTML="";
  let total=0;

  for(let c in currentUser.wallet){
    total += currentUser.wallet[c]*prices[c];
    div.innerHTML += `<div>${c}: ${currentUser.wallet[c]}</div>`;
  }

  document.getElementById("total").innerText = "€"+total.toFixed(2);
}

// 💸 BUY
function buy(){
  let coin = prompt("BTC / ETH / USDT");
  let eur = parseFloat(prompt("€ a invertir"));

  if(!prices[coin]) return alert("Moneda inválida");

  let amount = eur / prices[coin];

  currentUser.wallet[coin] += amount;

  save();
  loadUser();
}

// 💸 SELL
function sell(){
  let coin = prompt("BTC / ETH / USDT");
  let amount = parseFloat(prompt("Cantidad"));

  if(currentUser.wallet[coin] < amount) return alert("No tienes suficiente");

  currentUser.wallet[coin] -= amount;

  save();
  loadUser();
}

// 💸 TRANSFER
function transfer(){
  let to = prompt("Usuario destino");
  let amount = parseFloat(prompt("Cantidad USDT"));

  let user = users.find(u=>u.username===to);

  if(!user) return alert("Usuario no existe");

  if(currentUser.wallet.USDT < amount) return alert("Saldo insuficiente");

  currentUser.wallet.USDT -= amount;
  user.wallet.USDT += amount;

  save();
  loadUser();
}

// BANCO
function openBank(){
  document.getElementById("app").classList.add("hidden");
  document.getElementById("bankSelectScreen").classList.remove("hidden");
}

function selectBank(el,name){
  selectedBank=name;

  setTimeout(()=>{
    document.getElementById("bankSelectScreen").classList.add("hidden");
    document.getElementById("bankLoginScreen").classList.remove("hidden");
    document.getElementById("bankTitle").innerText=name;
  },300);
}

function connectBank(){
  currentUser.bank={
    name:selectedBank,
    user:document.getElementById("bankUser").value
  };

  save();
  closeBank();
}

function closeBank(){
  document.getElementById("bankLoginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// LOGOUT
function logout(){
  location.reload();
}

// SAVE
function save(){
  localStorage.setItem("users",JSON.stringify(users));
}
