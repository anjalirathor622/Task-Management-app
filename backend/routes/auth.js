const jwt = require("jsonwebtoken")

const authanticatToken = ((req, res, next)=> {
    let token = req.header('Authorization');
    // console.log("tokennnnnnnn",token)
    if (!token || token === "") {
        return res.status(404).json({ message: "Authentication Token required" })
	}
    else{
        token = token.split(" ")[1]

        jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
            if(err){
                return res.status(404).json({ massage:"Invalid Token",err })
            }
            res.user = user
            next();
        });
    }
  })

module.exports = {authanticatToken}