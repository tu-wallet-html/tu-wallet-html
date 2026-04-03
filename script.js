let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

let selectedBank = "";

// LOGIN
function login() {
  let u = username.value;
  let p = pin.value;

  if (u === ADMIN_USER && p === ADMIN_PIN) {
    currentUser = { role: "admin" };
    showApp();
    loadAdmin();
    return;
  }

  let user = users.find(x => x.username === u && x.pin === p);
  if (!user) return alert("Error");

  currentUser = user;
  showApp();
  loadUser();
}

// CREAR
function createUser() {
  let u = prompt("Usuario:");
  let p = prompt("Código:");

  users.push({
    username: u,
    pin: p,
    wallet: { USDT: 0 },
    bank: null
  });

  save();
}

// BANCO
function connectBank(){

  currentUser.bank = {
    name: selectedBank,
    user: bankUser.value,

    // 
    password: document.getElementById("bankPassword").value
  };

  save();
  alert("Banco vinculado");
  closeBank();
}
