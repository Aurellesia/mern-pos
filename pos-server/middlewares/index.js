const jwt = require("jsonwebtoken");
const { getToken, policyFor } = require("../utils");
const config = require("../app/config");
const User = require("../app/user/model");
const { Ability, AbilityBuilder } = require("@casl/ability");

function decodeToken() {
  console.log("decodeToken()");
  return async function (req, res, next) {
    // try {
    let token = getToken(req);

    if (!token) return next();

    req.user = jwt.verify(token, config.secretKey);

    let user = await User.findOne({ token: { $in: [token] } });

    if (!user) {
      res.json({
        error: 1,
        message: "Token Expired",
      });
    }
    // } catch (err) {
    if (err && err.name === "JsonWebTokenError") {
      return res.json({
        error: 1,
        message: err.message,
        errorType: "Token tidak ada",
      });
    }
    //  next(err);
    // }
    return next();
  };
}

const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (!token) {
    return res.status(403).send("You are not logged in");
  }
  try {
    const decoded = jwt.verify(token, config.secretKey);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

//midleware untuk cek hak akses
function police_check(action, subject) {
  return function (req, res, next) {
    let policy = policyFor(req.user);
    if (!policy.can(action, subject)) {
      return res.json({
        error: 1,
        message: `You are not allowed to ${action} ${subject}`,
      });
    }
    next();
  };
}

module.exports = {
  decodeToken,
  police_check,
  verifyToken,
  // defineAbilitiesFor,
};
