document.querySelector(".login").addEventListener("click", (e) => {
  e.preventDefault();
  let email = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  if (!email) return alert("Email is required");
  if (!password) return alert("Password is required");

  login({ email, password });
});

const login = async (loginDetails) => {
  const requestURL = "https://cyto-7dx2.onrender.com/login";
  const requestURLLocal = "http://localhost:5001/login";
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
      console.log(resJSON);
      alert(resJSON.message);
    }
  } catch (error) {
    console.log(error);
    alert("Error");
  }
};
