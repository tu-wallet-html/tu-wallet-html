let balance = 0;

function addMoney() {
  balance += 10;
  document.getElementById("balance").innerText = "$" + balance;
}