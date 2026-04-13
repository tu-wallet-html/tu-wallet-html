let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

let selectedBank="";

// LOGIN
function login(){
  let u=username.value;
  let p=pin.value;

  let user=users.find(x=>x.username===u && x.pin===p);
  if(!user) return alert("Error");

  currentUser=user;

  auth.classList.add("hidden");
  app.classList.remove("hidden");

  loadUser();
}

// REGISTER
function register(){
  users.push({
    username:username.value,
    pin:pin.value,
    wallet:{USDT:20000},
    bank:null
  });

  save();
  alert("Cuenta creada");
}

// NAV
function showPage(id){
  document.querySelectorAll(".page")
    .forEach(p=>p.classList.add("hidden"));

  document.getElementById(id).classList.remove("hidden");
}

// LOAD
function loadUser(){
  total.innerText="€"+currentUser.wallet.USDT;
}

// WITHDRAW
function withdraw(){
  let a=parseFloat(amountW.value);
  currentUser.wallet.USDT-=a;
  save();
  loadUser();
}

// BANK
function selectBank(name){
  selectedBank=name;
  bankLogin.classList.remove("hidden");
  bankName.innerText=name;
}

function connectBank(){
  currentUser.bank={
    name:selectedBank,
    user:bankUser.value
  };

  save();
  alert("Banco vinculado");
}

// SAVE
function save(){
  localStorage.setItem("users",JSON.stringify(users));
}
