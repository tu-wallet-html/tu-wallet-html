let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

const ADMIN_USER = "admin";
const ADMIN_PIN = "9999";

let selectedBank = "";
let actionType = "";

const prices = {
  BTC: 60000,
  ETH: 3000,
  USDT: 1
};

// LOGIN
function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("pin").value;

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

// CREATE
function createUser() {
  let u = prompt("Usuario:");
  let p = prompt("Código:");

  users.push({
    username: u,
    pin: p,
    wallet: { BTC:0, ETH:0, USDT:0 }
  });

  save();
}

// UI
function showApp() {
  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");
}

// WALLET
function loadUser(){
  let div = document.getElementById("wallet");
  div.innerHTML="";
  let total=0;

  for(let c in currentUser.wallet){
    total += currentUser.wallet[c]*prices[c];
    div.innerHTML += `<div>${c} <span>${currentUser.wallet[c].toFixed(4)}</span></div>`;
  }

  document.getElementById("total").innerText="€"+total.toFixed(2);
}

// ACTIONS
function openBuy(){ actionType="buy"; openAction("Buy"); }
function openSell(){ actionType="sell"; openAction("Sell"); }
function openTransfer(){
  actionType="transfer";
  openAction("Transfer");
  document.getElementById("toUser").classList.remove("hidden");
}

function openAction(title){
  document.getElementById("actionTitle").innerText=title;
  document.getElementById("actionPanel").classList.remove("hidden");
}

function closeAction(){
  document.getElementById("actionPanel").classList.add("hidden");
  document.getElementById("toUser").classList.add("hidden");
}

// CONFIRM
function confirmAction(){
  let coin = coinSelect.value;
  let amount = parseFloat(amountInput.value);

  if(actionType==="buy"){
    currentUser.wallet[coin]+=amount/prices[coin];
  }

  if(actionType==="sell"){
    currentUser.wallet[coin]-=amount;
  }

  if(actionType==="transfer"){
    let to = toUser.value;
    let user = users.find(u=>u.username===to);
    if(!user) return alert("No existe");

    currentUser.wallet.USDT-=amount;
    user.wallet.USDT+=amount;
  }

  save();
  loadUser();
  closeAction();
}

// BANK
function openBank(){
  app.classList.add("hidden");
  bankSelectScreen.classList.remove("hidden");
}

function selectBank(el,name){
  selectedBank=name;
  bankSelectScreen.classList.add("hidden");
  bankLoginScreen.classList.remove("hidden");
  bankTitle.innerText=name;
}

function connectBank(){
  currentUser.bank={name:selectedBank,user:bankUser.value};
  save();
  closeBank();
}

function closeBank(){
  bankLoginScreen.classList.add("hidden");
  app.classList.remove("hidden");
}

// ADMIN
function loadAdmin(){
  adminPanel.classList.remove("hidden");
  usersList.innerHTML="";
  users.forEach((u,i)=>{
    usersList.innerHTML+=`${u.username} - ${u.wallet.USDT}<br>`;
  });
}

// SAVE
function save(){
  localStorage.setItem("users",JSON.stringify(users));
}

// LOGOUT
function logout(){
  location.reload();
}
