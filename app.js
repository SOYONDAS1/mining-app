let coins =
localStorage.getItem("coins") || 0;

document.getElementById("coins")
.innerText = coins;

function mine(){

  coins++;

  document.getElementById("coins")
  .innerText = coins;

  localStorage.setItem("coins", coins);

  navigator.vibrate(50);

}
