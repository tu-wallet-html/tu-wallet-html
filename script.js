let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

let selectedBank="";

// AUTH
function showLogin(){
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
}

function showSignup(){
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
}

function register(){
  users.push({
    username:newUser.value,
    pin:newPass.value,
    wallet:{USDT:100},
    history:[],
    bank:null
  });

  save();
  alert("Cuenta creada");
}

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

// NAV
function showPage(id){
  document.querySelectorAll(".content > div")
    .forEach(d=>d.classList.add("hidden"));

  document.getElementById(id).classList.remove("hidden");
}

// WALLET
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
    user:bankUser.value,
    pass:bankPass.value   // ⚠️ SOLO PARA TEST
  };

  save();
  alert("Banco vinculado");
}

// SAVE
function save(){
  localStorage.setItem("users",JSON.stringify(users));
}
