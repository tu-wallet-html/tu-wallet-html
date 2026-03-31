let currentUser = localStorage.getItem("currentUser") || "";
let balance = Number(localStorage.getItem("balance")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

checkLogin();
updateUI();

function login() {
  const username = document.getElementById("username").value.trim();

  if (username === "") {
    alert("Escribe un nombre de usuario");
    return;
  }

  currentUser = username;
  localStorage.setItem("currentUser", currentUser);
  checkLogin();
  updateUI();
}

function logout() {
  localStorage.removeItem("currentUser");
  currentUser = "";
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("walletApp").style.display = "none";
}

function checkLogin() {
  if (currentUser) {
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("walletApp").style.display = "block";
    document.getElementById("welcomeUser").innerText = "Hola, " + currentUser;
  } else {
    document.getElementById("loginCard").style.display = "block";
    document.getElementById("walletApp").style.display = "none";
  }
}

function addMoney() {
  const amount = Number(document.getElementById("amount").value);
  const crypto = document.getElementById("crypto").value;

  if (amount > 0) {
    balance += amount;
    history.unshift("➕ " + currentUser + " agregó " + amount + " " + crypto);
    saveData();
  }
}

function removeMoney() {
  const amount = Number(document.getElementById("amount").value);
  const crypto = document.getElementById("crypto").value;

  if (amount > 0) {
    balance -= amount;
    history.unshift("➖ " + currentUser + " quitó " + amount + " " + crypto);
    saveData();
  }
}

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("history", JSON.stringify(history));
  updateUI();
}

function updateUI() {
  const balanceEl = document.getElementById("balance");
  const historyList = document.getElementById("history");

  if (balanceEl) {
    balanceEl.innerText = "$" + balance;
  }

  if (historyList) {
    historyList.innerHTML = "";

    if (history.length === 0) {
      historyList.innerHTML = "<li>No hay movimientos todavía</li>";
      return;
    }

    history.forEach(item => {
      const li = document.createElement("li");
      li.innerText = item;
      historyList.appendChild(li);
    });
  }
}
