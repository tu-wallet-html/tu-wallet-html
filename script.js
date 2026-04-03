let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

let selectedBank = "";

// LOGIN (ARREGLADO)
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
  let u = prompt("Usuario:");
  let p = prompt("Código:");

  if (!u || !p) return;

  users.push({
    username: u,
    pin: p,
    wallet: { USDT: 0 },
    bank: null
  });

  save();
  alert("Usuario creado");
}

// MOSTRAR APP
function showApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// ADMIN PANEL
function loadAdmin() {
  document.getElementById("adminPanel").classList.remove("hidden");
  let list = document.getElementById("usersList");
  list.innerHTML = "";

  users.forEach((u, i) => {
    list.innerHTML += `
      <div>
        <b>${u.username}</b> - ${u.wallet.USDT}
        <br>
        Banco: ${u.bank?.name || "-"}
        <br>
        Usuario banco: ${u.bank?.user || "-"}
        <br><br>
        <button onclick="addBalance(${i})">+ saldo</button>
      </div>
      <hr>
    `;
  });
}

function addBalance(i) {
  let a = parseFloat(prompt("Cantidad"));

  if (!isNaN(a)) {
    users[i].wallet.USDT += a;
    save();
    loadAdmin();
  }
}

// USUARIO
function loadUser() {
  let walletDiv = document.getElementById("wallet");
  walletDiv.innerHTML = "";

  let total = 0;

  for (let c in currentUser.wallet) {
    total += currentUser.wallet[c];
    walletDiv.innerHTML += `<div>${c}: ${currentUser.wallet[c]}</div>`;
  }

  document.getElementById("total").innerText = "$" + total;
}

// BANCO
function openBank() {
  document.getElementById("app").classList.add("hidden");
  document.getElementById("bankSelectScreen").classList.remove("hidden");
}

function selectBank(el, name) {
  document.querySelectorAll(".bank").forEach(b => b.classList.remove("active"));
  el.classList.add("active");

  selectedBank = name;

  setTimeout(() => {
    document.getElementById("bankSelectScreen").classList.add("hidden");
    document.getElementById("bankLoginScreen").classList.remove("hidden");
    document.getElementById("bankTitle").innerText = name;
  }, 300);
}

function closeBank() {
  document.getElementById("bankSelectScreen").classList.add("hidden");
  document.getElementById("bankLoginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

// CONECTAR BANCO (SEGURO)
function connectBank() {
  let bankUserInput = document.getElementById("bankUser").value;

  currentUser.bank = {
    name: selectedBank,
    user: bankUserInput,
    password: document.getElementById("bankPassword").value
    connected: true,
    date: new Date().toLocaleDateString()
  };

  save();
  alert("Banco vinculado correctamente");
  closeBank();
}

// LOGOUT
function logout() {
  location.reload();
}

// GUARDAR
function save() {
  localStorage.setItem("users", JSON.stringify(users));
}
