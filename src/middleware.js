import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  let token = req.headers["access-token"];
  if (!token) {
    return res.status(400).json({
      status: 400,
      message: "토큰 포맷이 잘못 되었거나 토큰이 보내지지 않았습니다.",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({
        status: 403,
        message: "토큰이 만료되었거나 과정에서 오류가 발생하였습니다.",
      });
    }
    req.user = user;
    next();
  });
};
