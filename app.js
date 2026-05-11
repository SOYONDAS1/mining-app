/* =========================
   TELEGRAM WEB APP INIT
========================= */

const tg = window.Telegram.WebApp;

/* Expand Mini App */
tg.expand();

/* App Theme */
document.body.style.background =
  tg.themeParams.bg_color || "#070b14";

/* Telegram User */
const user =
  tg.initDataUnsafe.user;

/* =========================
   USER DETECTION
========================= */

if(user){

  console.log("Telegram User:", user);

  /* Username */
  document.getElementById(
    "username"
  ).innerText =
    user.first_name +
    (user.last_name
      ? " " + user.last_name
      : "");

  /* Telegram ID */
  document.getElementById(
    "userid"
  ).innerText =
    "ID: " + user.id;

  /* Profile Photo */
  if(user.photo_url){

    document.getElementById(
      "userPhoto"
    ).src =
      user.photo_url;
  }

  /* Save User Data */
  localStorage.setItem(
    "tgUser",
    JSON.stringify(user)
  );

}else{

  console.log(
    "Telegram user not detected"
  );

  document.getElementById(
    "username"
  ).innerText =
    "Guest User";
}

/* =========================
   TELEGRAM READY
========================= */

tg.ready();

/* =========================
   MAIN BUTTON EXAMPLE
========================= */

tg.MainButton.setText(
  "Start Mining"
);

tg.MainButton.show();

tg.MainButton.onClick(() => {

  tg.showPopup({

    title:"Mining Started",

    message:
      "Cloud miner activated successfully.",

    buttons:[
      {
        type:"ok"
      }
    ]

  });

});
