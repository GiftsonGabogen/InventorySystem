const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Inventory";
const JWTSecretKey = process.env.SECRET_KEY || "SecretKey";
module.exports = {
  mongoURI: mongoURI,
  JWTSecretKey: JWTSecretKey
};
