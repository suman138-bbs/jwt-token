import JWT from "jsonwebtoken";
/**auth middleware */

export default async function Auth(req, res, next) {
  try {
    const bearer = req.headers.authorization.split(" ");
    const bearerToken = bearer[1];
    const decodedToken = await JWT.verify(bearerToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    // res.json({
    //   success: true,
    //   decodedToken: decodedToken,
    // });
    next();
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
}
