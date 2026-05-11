/* =========================
   REALISTIC CRYPTO MINING APP
   ADVANCED app.js
========================= */

/* =========================
   VARIABLES
========================= */

let balance =
  localStorage.getItem("balance")
    ? parseFloat(localStorage.getItem("balance"))
    : 0;

let hashRate =
  localStorage.getItem("hashRate")
    ? parseFloat(localStorage.getItem("hashRate"))
    : 1.2;

let energy =
  localStorage.getItem("energy")
    ? parseFloat(localStorage.getItem("energy"))
    : 100;

let minerLevel =
  localStorage.getItem("minerLevel")
    ? parseInt(localStorage.getItem("minerLevel"))
    : 1;

let totalMined =
  localStorage.getItem("totalMined")
    ? parseFloat(localStorage.getItem("totalMined"))
    : 0;

let miningActive = true;

let btcPrice = 67240;

/* =========================
   SAVE DATA
========================= */

function saveData(){

  localStorage.setItem(
    "balance",
    balance
  );

  localStorage.setItem(
    "hashRate",
    hashRate
  );

  localStorage.setItem(
    "energy",
    energy
  );

  localStorage.setItem(
    "minerLevel",
    minerLevel
  );

  localStorage.setItem(
    "totalMined",
    totalMined
  );

}

/* =========================
   UPDATE UI
========================= */

function updateUI(){

  // Balance
  document.getElementById("balance")
    .innerText =
    balance.toFixed(4) + " BTC";

  // USD Value
  document.getElementById("usdValue")
    .innerText =
    "≈ $" +
    (balance * btcPrice).toFixed(2) +
    " USD";

  // Hash Rate
  document.getElementById("hashRate")
    .innerText =
    hashRate.toFixed(2) + " GH/s";

  // Energy
  document.getElementById("energyText")
    .innerText =
    energy.toFixed(0) + "%";

  // Energy Bar
  document.getElementById("energyBar")
    .style.width =
    energy + "%";

  // Level
  document.getElementById("minerLevel")
    .innerText =
    "LVL " + minerLevel;

}

/* =========================
   AUTO MINING SYSTEM
========================= */

function startMining(){

  setInterval(() => {

    if(miningActive && energy > 0){

      let mined =
        hashRate / 100000;

      balance += mined;

      totalMined += mined;

      energy -= 0.05;

      if(energy <= 0){

        energy = 0;

        miningActive = false;

        showNotification(
          "Energy depleted!"
        );
      }

      updateUI();

      saveData();
    }

  },1000);

}

startMining();

/* =========================
   RECHARGE ENERGY
========================= */

function rechargeEnergy(){

  energy = 100;

  miningActive = true;

  updateUI();

  saveData();

  showNotification(
    "Energy fully recharged!"
  );
}

/* =========================
   UPGRADE SYSTEM
========================= */

function upgradeMiner(){

  let cost =
    minerLevel * 0.002;

  if(balance >= cost){

    balance -= cost;

    hashRate += 0.8;

    minerLevel += 1;

    energy = 100;

    miningActive = true;

    updateUI();

    saveData();

    showNotification(
      "Miner upgraded to LVL " +
      minerLevel
    );

  }else{

    showNotification(
      "Not enough balance!"
    );
  }

}

/* =========================
   DAILY REWARD
========================= */

function claimDailyReward(){

  let today =
    new Date().toDateString();

  let lastClaim =
    localStorage.getItem(
      "lastDailyClaim"
    );

  if(lastClaim === today){

    showNotification(
      "Daily reward already claimed!"
    );

    return;
  }

  balance += 0.001;

  localStorage.setItem(
    "lastDailyClaim",
    today
  );

  updateUI();

  saveData();

  showNotification(
    "Daily reward claimed!"
  );

}

/* =========================
   FAKE LIVE MINERS
========================= */

function updateOnlineMiners(){

  setInterval(() => {

    let miners =
      Math.floor(
        Math.random() * 3000
      ) + 4000;

    document.getElementById(
      "onlineMiners"
    ).innerText =
      miners + " miners online";

  },5000);

}

updateOnlineMiners();

/* =========================
   MINING HISTORY
========================= */

function saveMiningHistory(amount){

  let history =
    JSON.parse(
      localStorage.getItem(
        "miningHistory"
      )
    ) || [];

  history.push({
    amount:amount.toFixed(6),
    time:new Date()
      .toLocaleTimeString()
  });

  localStorage.setItem(
    "miningHistory",
    JSON.stringify(history)
  );

}

/* =========================
   AUTO HISTORY SAVE
========================= */

setInterval(() => {

  let mined =
    hashRate / 100000;

  saveMiningHistory(mined);

},10000);

/* =========================
   MARKET PRICE ANIMATION
========================= */

function updateMarketPrices(){

  setInterval(() => {

    btcPrice +=
      (Math.random() * 500) - 250;

    document.querySelectorAll(
      ".coin-price"
    )[0].innerText =
      "$" +
      Math.floor(btcPrice);

  },6000);

}

updateMarketPrices();

/* =========================
   NOTIFICATION SYSTEM
========================= */

function showNotification(message){

  let notification =
    document.createElement("div");

  notification.innerText =
    message;

  notification.style.position =
    "fixed";

  notification.style.top =
    "20px";

  notification.style.right =
    "20px";

  notification.style.background =
    "#00f0ff";

  notification.style.color =
    "#000";

  notification.style.padding =
    "12px 18px";

  notification.style.borderRadius =
    "14px";

  notification.style.fontWeight =
    "bold";

  notification.style.zIndex =
    "9999";

  notification.style.boxShadow =
    "0 0 20px rgba(0,240,255,0.4)";

  document.body.appendChild(
    notification
  );

  setTimeout(() => {

    notification.remove();

  },3000);

}

/* =========================
   SOUND EFFECT
========================= */

function playSound(){

  let audio =
    new Audio(
      "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
    );

  audio.volume = 0.3;

  audio.play();

}

/* =========================
   VIBRATION
========================= */

function vibrateDevice(){

  if(navigator.vibrate){

    navigator.vibrate(100);

  }

}

/* =========================
   AUTO ENERGY REGEN
========================= */

setInterval(() => {

  if(energy < 100){

    energy += 0.02;

    if(energy > 100){

      energy = 100;
    }

    updateUI();

    saveData();
  }

},3000);

/* =========================
   BUTTON ANIMATIONS
========================= */

document.querySelectorAll(
  ".upgrade-btn"
).forEach(button => {

  button.addEventListener(
    "click",
    () => {

      playSound();

      vibrateDevice();

    }
  );

});

/* =========================
   AUTO SAVE
========================= */

setInterval(() => {

  saveData();

},5000);

/* =========================
   CHART.JS
========================= */

const ctx =
document.getElementById(
  "miningChart"
);

new Chart(ctx, {

  type:"line",

  data:{

    labels:[
      "1H",
      "2H",
      "3H",
      "4H",
      "5H",
      "6H"
    ],

    datasets:[{

      label:"Mining Earnings",

      data:[
        2,
        4,
        3,
        6,
        7,
        9
      ],

      borderWidth:3,

      tension:0.4,

      fill:true

    }]
  },

  options:{

    responsive:true,

    plugins:{

      legend:{

        labels:{

          color:"white"

        }

      }

    },

    scales:{

      x:{

        ticks:{

          color:"white"

        },

        grid:{

          color:"rgba(255,255,255,0.05)"

        }

      },

      y:{

        ticks:{

          color:"white"

        },

        grid:{

          color:"rgba(255,255,255,0.05)"

        }

      }

    }

  }

});

/* =========================
   START APP
========================= */

updateUI();

console.log(
  "Crypto Mining Dashboard Loaded"
);
