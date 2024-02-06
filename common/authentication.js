const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "secret";

module.exports.getToken = (data) =>
    jwt.sign(data, SECRET_KEY, { expiresIn: "30 days" });

module.exports.verify = async (req,res,next) =>{
     let  token  =req.headers['authorization']
     console.log("token",token)
  try {
    if (!token) {
      throw new Error("Permission denied");
    }

    let decoded = await jwt.verify(token, SECRET_KEY);

    console.log("decoded", decoded)

      next();
    } 
   catch (err) {
    console.log(err);
  }
}
