let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

// ADMIN
const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

// LOGIN
function login() {
  const username = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;

  if (username === ADMIN_USER && pin === ADMIN_PIN) {
    currentUser = { username: ADMIN_USER, role: "admin" };
    showApp();
    loadAdmin();
    return;
  }

  const user = users.find(u => u.username === username && u.pin === pin);

  if (!user) {
    alert("Usuario o código incorrecto");
    return;
  }

  currentUser = user;
  showApp();
  loadUser();
}

// CREAR USUARIO
function createUser() {
  const username = prompt("Nuevo usuario:");
  const pin = prompt("Código:");

  if (!username || !pin) return;

  users.push({
    username,
    pin,
    wallet: { BTC: 0, ETH: 0, USDT: 0, BNB: 0 },
    history: [],
    bank: {},
    verified: "pendiente"
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("Usuario creado");
}

// LOGOUT
function logout() {
  location.reload();
}

// UI
function showApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// USER LOAD
function loadUser() {
  renderWallet();
  renderHistory();
  document.getElementById("verifyStatus").innerText = currentUser.verified;
}

// ADMIN
function loadAdmin() {
  document.getElementById("adminPanel").style.display = "block";

  const list = document.getElementById("usersList");
  list.innerHTML = "";

  users.forEach((u, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      ${u.username} - ${u.verified}
      <button onclick="approve(${i})">✔</button>
      <button onclick="deleteUser(${i})">🗑</button>
    `;
    list.appendChild(div);
  });
}

function approve(i) {
  users[i].verified = "verificado";
  save();
  loadAdmin();
}

function deleteUser(i) {
  users.splice(i, 1);
  save();
  loadAdmin();
}

// WALLET
function renderWallet() {
  const div = document.getElementById("wallet");
  div.innerHTML = "";

  let total = 0;

  for (let coin in currentUser.wallet) {
    let value = currentUser.wallet[coin];
    total += value;

    div.innerHTML += `<div class="coin">${coin}: ${value}</div>`;
  }

  document.getElementById("total").innerText = "$" + total;
}

// HISTORY
function renderHistory() {
  const div = document.getElementById("history");
  div.innerHTML = "";

  currentUser.history.forEach(h => {
    div.innerHTML += `<div>${h}</div>`;
  });
}

// ACTIONS
function addMoney() {
  const coin = prompt("Moneda BTC/ETH/USDT/BNB:");
  const amount = parseFloat(prompt("Cantidad:"));

  if (!coin || isNaN(amount)) return;

  currentUser.wallet[coin] += amount;
  currentUser.history.unshift(`+ ${amount} ${coin}`);
  save();
  loadUser();
}

function withdrawMoney() {
  const coin = prompt("Moneda:");
  const amount = parseFloat(prompt("Cantidad:"));

  if (!coin || isNaN(amount)) return;

  if (currentUser.wallet[coin] < amount) {
    alert("Saldo insuficiente");
    return;
  }

  currentUser.wallet[coin] -= amount;
  currentUser.history.unshift(`- ${amount} ${coin}`);
  save();
  loadUser();
}

// BANK
function saveBank() {
  currentUser.bank = {
    name: document.getElementById("bankName").value,
    iban: document.getElementById("iban").value
  };
  save();
  alert("Banco guardado");
}

// VERIFICACION
function submitVerification() {
  currentUser.verified = "pendiente";
  save();
  loadUser();
}

// SAVE
function save() {
  localStorage.setItem("users", JSON.stringify(users));
}
