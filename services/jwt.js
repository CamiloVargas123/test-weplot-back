const jwt = require("jwt-simple");

const SECRET_KEY = "ka1sd3aSFDkdT6P0hkjÑ5gd35dDD23";

exports.createAccessToken = function(user){
    const payload = {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        question: user.question,
        tel: user.tel,
        city: user.city,
        avatar: user.avatar
    }
    return jwt.encode(payload, SECRET_KEY);
}


exports.decodeToken = token => {
 return jwt.decode(token, SECRET_KEY, true);
}