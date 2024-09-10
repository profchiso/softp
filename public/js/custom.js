const selectBtn = document.querySelectorAll(".site-btn");
selectBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // e.preventDefault();
    const feature = this.className.split(" ")[1];
    localStorage.setItem("feature", feature);
  });
});
