const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const JWT_SECRET = process.env.JWT_SECRET;

//only for rendered pages
exports.isLoggedIn = async (req, res, next) => {
  let accessToken;

  if (req.cookies.accessToken) {
    try {
      accessToken = req.cookies.accessToken;

      //decode the acesss token
      const decodedToken = await jwt.verify(accessToken, JWT_SECRET);

      //check if user exist   just to be sure the user had not bern deleted
      const user = await User.findById(decodedToken.user.id);
      if (!user) {
        return next();
      }
      //sender a variable to the rendered templete
      res.locals.user = user;
      req.user = user;

      return next();
    } catch (error) {
      return next();
    }
  }
  next();
};
