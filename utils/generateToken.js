import jwt from "jsonwebtoken"
let generateTokensetCookie = (res, userId) => {
    let token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
    console.log("Generated Token: ", token); // Log the token
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  };
  


export default generateTokensetCookie