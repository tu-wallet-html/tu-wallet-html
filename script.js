let balance = localStorage.getItem("balance") || 0;
balance = Number(balance);

updateUI();

function addMoney() {
  let amount = Number(document.getElementById("amount").value);
  if (amount > 0) {
    balance += amount;
    save();
  }
}

function removeMoney() {
  let amount = Number(document.getElementById("amount").value);
  if (amount > 0) {
    balance -= amount;
    save();
  }
}

function save() {
  localStorage.setItem("balance", balance);
  updateUI();
}

function updateUI() {
  document.getElementById("balance").innerText = "$" + balance;
}
