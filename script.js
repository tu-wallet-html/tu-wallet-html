let balance = 0;
let history = [];

// LOGIN
const FIXED_PIN = "0404";

function login() {
  const user = document.getElementById("username").value;
  const pin = document.getElementById("pin").value;

  if (!user) {
    alert("Introduce usuario");
    return;
  }

  if (pin !== FIXED_PIN) {
    alert("Código incorrecto");
    return;
  }

  localStorage.setItem("user", user);
  showApp();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function checkLogin() {
  const user = localStorage.getItem("user");

  if (user) {
    showApp();
  }
}

function showApp() {
  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "block";
}

// BALANCE UI
function updateUI() {
  document.getElementById("balance").innerText = "$" + balance;

  const historyContainer = document.getElementById("history");
  historyContainer.innerHTML = "";

  history.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.amount > 0 ? "+" : ""}$${item.amount}</span>
    `;

    historyContainer.appendChild(div);
  });

  // guardar datos
  localStorage.setItem("balance", balance);
  localStorage.setItem("history", JSON.stringify(history));
}

// ADD
function addMoney() {
  const amount = prompt("Cantidad a agregar:");
  const value = parseFloat(amount);

  if (isNaN(value) || value <= 0) {
    alert("Cantidad inválida");
    return;
  }

  balance += value;

  history.unshift({
    name: "Depósito",
    amount: value
  });

  updateUI();
}

// WITHDRAW
function withdrawMoney() {
  const amount = prompt("Cantidad a retirar:");
  const value = parseFloat(amount);

  if (isNaN(value) || value <= 0) {
    alert("Cantidad inválida");
    return;
  }

  if (value > balance) {
    alert("Saldo insuficiente");
    return;
  }

  balance -= value;

  history.unshift({
    name: "Retiro",
    amount: -value
  });

  updateUI();
}

// CARGAR DATOS
balance = parseFloat(localStorage.getItem("balance")) || 0;
history = JSON.parse(localStorage.getItem("history")) || [];

// INIT
checkLogin();
updateUI();
