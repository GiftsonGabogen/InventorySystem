const JWT = require("jsonwebtoken");
const JWTSecretKey = require("../config/keys").JWTSecretKey;

module.exports = (req, res, next) => {
  try {
    //Get The Header's Authorization Sent By The Client Side
    //Split By Space and Then Get Rid of The First Index Which is The Bearer String
    const token = req.headers.authorization.split(" ")[1];

    //Verifying the Sent Token
    const decoded = JWT.verify(token, JWTSecretKey);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(200).json({
      message: "Login First",
      success: false
    });
  }
};
