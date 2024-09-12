document.querySelector(".login").addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  if (!email) return alert("Email is required");
  if (!password) return alert("Password is required");

  login({ email, password });
});

const login = async (loginDetails) => {
  const requestURL = "http://localhost:5001/submit";
  try {
    const res = await fetch(requestURL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(loginDetails),
    });
    const resJSON = await res.json();

    if (resJSON.success) {
      window.setTimeout(() => {
        let userType = resJSON.data.user.userType;

        if (userType === "Admin") {
          window.location.assign("/dashboard");
        }
      }, 1000);
    } else {
      alert("Error");
    }
  } catch (error) {
    console.log(error);
    alert("Error");
  }
};
