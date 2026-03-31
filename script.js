const PASSWORD = "1234"; // clave fija

let user = localStorage.getItem("user") || "";

let wallet = JSON.parse(localStorage.getItem("wallet")) || {
  BTC: 0,
  ETH: 0,
  USDT: 0,
  BNB: 0
};

let history = JSON.parse(localStorage.getItem("history")) || [];

checkLogin();
updateUI();

function login() {
  const dni = document.getElementById("dni").value;
  const pass = document.getElementById("password").value;

  if (pass !== PASSWORD) {
    alert("Contraseña incorrecta");
    return;
  }

  if (dni === "") {
    alert("Introduce DNI");
    return;
  }

  user = dni;
  localStorage.setItem("user", user);

  checkLogin();
  updateUI();
}

function logout() {
  localStorage.removeItem("user");
  location.reload();
}

function checkLogin() {
  if (user) {
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("walletApp").style.display = "block";
    document.getElementById("userText").innerText = "Usuario: " + user;
  }
}

function addMoney() {
  const crypto = document.getElementById("crypto").value;
  const amount = Number(document.getElementById("amount").value);

  if (amount > 0) {
    wallet[crypto] += amount;
    history.unshift("➕ " + user + " añadió " + amount + " " + crypto);
    save();
  }
}

function removeMoney() {
  const crypto = document.getElementById("crypto").value;
  const amount = Number(document.getElementById("amount").value);

  if (amount > 0) {
    wallet[crypto] -= amount;
    history.unshift("➖ " + user + " quitó " + amount + " " + crypto);
    save();
  }
}

function save() {
  localStorage.setItem("wallet", JSON.stringify(wallet));
  localStorage.setItem("history", JSON.stringify(history));
  updateUI();
}

function updateUI() {
  document.getElementById("btc").innerText = wallet.BTC;
  document.getElementById("eth").innerText = wallet.ETH;
  document.getElementById("usdt").innerText = wallet.USDT;
  document.getElementById("bnb").innerText = wallet.BNB;

  const list = document.getElementById("history");
  list.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}
