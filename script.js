let balance = 0;
let history = [];

// ACTUALIZAR BALANCE EN PANTALLA
function updateUI() {
  document.getElementById("balance").innerText = "$" + balance;

  const historyContainer = document.querySelector(".card");
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
}

// AGREGAR DINERO
function addMoney() {
  const amount = prompt("¿Cuánto quieres agregar?");
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

// RETIRAR DINERO
function withdrawMoney() {
  const amount = prompt("¿Cuánto quieres retirar?");
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

// INICIALIZAR
updateUI();
