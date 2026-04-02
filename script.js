let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

let lang = "es";

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
    alert("Error");
    return;
  }

  currentUser = user;
  showApp();
  loadUser();
}

// CREAR USER
function createUser() {
  const username = prompt("Usuario:");
  const pin = prompt("Código:");

  users.push({
    username,
    pin,
    wallet: { BTC: 0, ETH: 0, USDT: 0, BNB: 0 },
    history: [],
    bank: {},
    verified: "pendiente"
  });

  save();
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

// USER
function loadUser() {
  renderWallet();
  renderHistory();
}

// ADMIN
function loadAdmin() {
  document.getElementById("adminPanel").style.display = "block";

  const list = document.getElementById("usersList");
  list.innerHTML = "";

  users.forEach((u, i) => {
    list.innerHTML += `
      ${u.username} (${u.wallet.USDT})
      <button onclick="addBalance(${i})">+ saldo</button>
      <button onclick="deleteUser(${i})">❌</button>
    `;
  });
}

function addBalance(i) {
  const amount = parseFloat(prompt("Cantidad:"));
  if (isNaN(amount)) return;

  users[i].wallet.USDT += amount;
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
    total += currentUser.wallet[coin];

    div.innerHTML += `
      <div class="coin">
        ${coin} : ${currentUser.wallet[coin]}
      </div>
    `;
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

// BANCO
function openBank() {
  document.getElementById("app").style.display = "none";
  document.getElementById("bankScreen").style.display = "block";
}

function closeBank() {
  document.getElementById("bankScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

function withdrawFromBank() {
  const amount = parseFloat(document.getElementById("withdrawAmount").value);

  if (isNaN(amount) || amount <= 0) return;

  if (currentUser.wallet.USDT < amount) {
    alert("Saldo insuficiente");
    return;
  }

  currentUser.wallet.USDT -= amount;
  currentUser.history.unshift("Retiro banco: " + amount);

  save();
  loadUser();

  alert("Retiro enviado");
}

// IDIOMA
function toggleLang() {
  lang = lang === "es" ? "en" : "es";

  document.getElementById("title").innerText =
    lang === "es" ? "Iniciar sesión" : "Login";
}

// SAVE
function save() {
  localStorage.setItem("users", JSON.stringify(users));
}
