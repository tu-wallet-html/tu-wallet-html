let balance = Number(localStorage.getItem("balance")) || 0;
let history = JSON.parse(localStorage.getItem("history")) || [];

updateUI();

function addMoney() {
  const amount = Number(document.getElementById("amount").value);

  if (amount > 0) {
    balance += amount;
    history.unshift("➕ Agregaste $" + amount);
    saveData();
  }
}

function removeMoney() {
  const amount = Number(document.getElementById("amount").value);

  if (amount > 0) {
    balance -= amount;
    history.unshift("➖ Quitaste $" + amount);
    saveData();
  }
}

function saveData() {
  localStorage.setItem("balance", balance);
  localStorage.setItem("history", JSON.stringify(history));
  updateUI();
}

function updateUI() {
  document.getElementById("balance").innerText = "$" + balance;

  const historyList = document.getElementById("history");
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
