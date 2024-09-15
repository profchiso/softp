/*!
 * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Toggle the side navigation
  const sidebarToggle = document.body.querySelector("#sidebarToggle");
  if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener("click", (event) => {
      event.preventDefault();
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem(
        "sb|sidebar-toggle",
        document.body.classList.contains("sb-sidenav-toggled")
      );
    });
  }
});

document.querySelector(".logout-btn").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("logout button clicked");
  logout();
});

document
  .querySelector(".change-password-btn")
  .addEventListener("click", async (e) => {
    let password = document.querySelector(".edit-password").value;
    if (!password) {
      alert("Please enter password");
      return;
    }
    const requestURLl = "http://localhost:5001/update-password";
    const requestURL = "https://cyto-fqil.onrender.com/update-password";

    const res = await fetch(requestURL, {
      method: "PATCH",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
    let resToJSON = await res.json();
    if (resToJSON.success) {
      logout();
    } else {
      alert("Error occurred: ");
    }
  });

const logout = async () => {
  const requestURLl = "http://localhost:5001/logout";
  const requestURL = "https://cyto-fqil.onrender.com/logout";
  try {
    const res = await fetch(requestURL, {
      method: "GET",
    });

    const resToJSON = await res.json();
    if (resToJSON.success) {
      alert("Logged out successfully");

      window.setTimeout(() => {
        window.location.assign("/login");
      }, 1000);
    } else {
      alert("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
