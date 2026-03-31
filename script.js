async function getPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=eur"
  );

  const data = await res.json();

  return {
    BTC: data.bitcoin.eur,
    ETH: data.ethereum.eur,
    USDT: data.tether.eur,
    BNB: data.binancecoin.eur
  };
}

async function updateUI() {
  const prices = await getPrices();

  document.getElementById("btc").innerText =
    wallet.BTC + " (€" + (wallet.BTC * prices.BTC).toFixed(2) + ")";

  document.getElementById("eth").innerText =
    wallet.ETH + " (€" + (wallet.ETH * prices.ETH).toFixed(2) + ")";

  document.getElementById("usdt").innerText =
    wallet.USDT + " (€" + (wallet.USDT * prices.USDT).toFixed(2) + ")";

  document.getElementById("bnb").innerText =
    wallet.BNB + " (€" + (wallet.BNB * prices.BNB).toFixed(2) + ")";

  const list = document.getElementById("history");
  list.innerHTML = "";

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });
}
