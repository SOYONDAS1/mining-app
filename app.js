/* ======================
   TELEGRAM WEB APP
====================== */

const tg = window.Telegram.WebApp;

tg.expand();

let user = tg.initDataUnsafe.user;

/* ======================
   USER PROFILE
====================== */

if(user){

  document.getElementById(
    "username"
  ).innerText =
    user.first_name;

  if(user.photo_url){

    document.getElementById(
      "userPhoto"
    ).src =
      user.photo_url;
  }

}

/* ======================
   VARIABLES
====================== */

let balance =
  localStorage.getItem("balance")
  ? parseFloat(
      localStorage.getItem("balance")
    )
  : 0;

let hashRate =
  localStorage.getItem("hashRate")
  ? parseFloat(
      localStorage.getItem("hashRate")
    )
  : 1.2;

let energy =
  localStorage.getItem("energy")
  ? parseFloat(
      localStorage.getItem("energy")
    )
  : 100;

let btcPrice = 65000;

/* ======================
   UPDATE UI
====================== */

function updateUI(){

  document.getElementById(
    "balance"
  ).innerText =
    balance.toFixed(4) + " BTC";

  document.getElementById(
    "usdBalance"
  ).innerText =
    "≈ $" +
    (balance * btcPrice).toFixed(2);

  document.getElementById(
    "hashRate"
  ).innerText =
    hashRate.toFixed(2)
    + " GH/s";

  document.getElementById(
    "energyText"
  ).innerText =
    energy.toFixed(0) + "%";

  document.getElementById(
    "energyBar"
  ).style.width =
    energy + "%";

}

/* ======================
   AUTO MINING
====================== */

setInterval(() => {

  if(energy > 0){

    let mined =
      hashRate / 100000;

    balance += mined;

    energy -= 0.05;

    updateUI();

    saveData();
  }

},1000);

/* ======================
   SAVE DATA
====================== */

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

}

/* ======================
   UPGRADE MINER
====================== */

function upgradeMiner(){

  let cost = 0.002;

  if(balance >= cost){

    balance -= cost;

    hashRate += 0.8;

    energy = 100;

    updateUI();

    saveData();

    tg.showPopup({

      title:"Upgrade Complete",

      message:
      "Mining power increased!",

      buttons:[
        {type:"ok"}
      ]

    });

  }else{

    tg.showPopup({

      title:"Insufficient Balance",

      message:
      "You need more BTC.",

      buttons:[
        {type:"ok"}
      ]

    });

  }

}

/* ======================
   DAILY REWARD
====================== */

function claimReward(){

  let today =
    new Date().toDateString();

  let lastClaim =
    localStorage.getItem(
      "lastClaim"
    );

  if(lastClaim === today){

    tg.showPopup({

      title:"Already Claimed",

      message:
      "Daily reward already claimed today.",

      buttons:[
        {type:"ok"}
      ]

    });

    return;
  }

  balance += 0.001;

  localStorage.setItem(
    "lastClaim",
    today
  );

  updateUI();

  saveData();

  tg.showPopup({

    title:"Reward Claimed",

    message:
    "0.001 BTC added!",

    buttons:[
      {type:"ok"}
    ]

  });

}

/* ======================
   ONLINE USERS
====================== */

setInterval(() => {

  let miners =
    Math.floor(
      Math.random() * 3000
    ) + 4000;

  document.getElementById(
    "onlineUsers"
  ).innerText =
    miners + " miners online";

},4000);

/* ======================
   MARKET DATA
====================== */

async function loadMarket(){

  try{

    let response =
      await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,the-open-network,dogecoin"
      );

    let data =
      await response.json();

    let marketHTML = "";

    data.forEach(coin => {

      let change =
        coin.price_change_percentage_24h;

      let color =
        change >= 0
        ? "green"
        : "red";

      marketHTML += `

      <div class="market-item">

        <div class="market-left">

          <div class="coin-icon">
            ${coin.symbol.toUpperCase()}
          </div>

          <div>

            <div class="coin-name">
              ${coin.name}
            </div>

            <div class="coin-price">
              $${coin.current_price}
            </div>

          </div>

        </div>

        <div class="${color}">
          ${change.toFixed(2)}%
        </div>

      </div>

      `;

    });

    document.getElementById(
      "marketList"
    ).innerHTML =
      marketHTML;

  }catch(error){

    console.log(error);

  }

}

loadMarket();

/* ======================
   CHART
====================== */

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

      label:"Mining",

      data:[
        2,
        4,
        3,
        6,
        7,
        9
      ],

      borderWidth:3,

      tension:0.4

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
        }

      },

      y:{

        ticks:{
          color:"white"
        }

      }

    }

  }

});

/* ======================
   START
====================== */

updateUI();
