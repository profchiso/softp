//npm packages
require("dotenv").config(); //require the config files
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//user defined modules

const User = require("./models/Users");

// const Reservation = require("./models/Reservation");
// const accountView = require("./routes/account/view");

const connectToDB = require("./utils/dbcon");

connectToDB(); //db connection;

const app = express(); //app initialization;

//middlewares

app.enable("trust proxy");

//cookie parser for parsing the the request cookies
app.use(cookieParser());
//middleware to set security HTTP headers

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json({ extended: false })); //middleware for body-paser

app.use(cors()); //middle ware to allow cross origin resource sharing

//routes

app.get("/", async (req, res) => {
  try {
    return res.status(200).render("index", {});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/connect-wallet", async (req, res) => {
  try {
    return res.status(200).render("connect-wallet", {});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/connect-manually", async (req, res) => {
  try {
    return res.status(200).render("connect-manually", {});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/dashboard", async (req, res) => {
  if (!req.cookies.accessToken) {
    res.redirect("/");
  }

  return res.status(200).render("dashboard", {});
});

app.get("/api/v1/logout", async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  });
  let companyDetails = await getCompanyInfo();

  res.status(200).json({
    success: true,
    data: {
      accessToken: res.cookie.accessToken,
      BASE_URL,
      serverName,
      BASE_ENDPOINT,
      companyDetails,
    },
  });
});

// app.use("/api/v1/account", accountApi); //account API route

// app.use("/account", accountView); //account view route

//spin up the server on the env port number
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
