const selectBtn = document.querySelectorAll(".site-btn");
selectBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // e.preventDefault();
    const feature = this.className.split(" ")[1];
    localStorage.setItem("feature", feature);
  });
});

const coins = document.querySelectorAll(".coin ");

coins.forEach((coin) => {
  coin.addEventListener("click", function (e) {
    // e.preventDefault();
    const coin = this.className.trim().split(" ")[2];
    localStorage.setItem("coin", coin);
  });
});
