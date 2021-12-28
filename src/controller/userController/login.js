import connection from "../../db";
import jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  const { id, password } = req.body;
  try {
    let query = "select * from user_info where user_id='" + id + "'";
    connection.query(query, (err, result) => {
      const user = {
        id: result[0].user_id,
        pw: result[0].user_pw,
        name: result[0].user_name,
      };
      if (user.id !== id) {
        return res.status(400).json({
          status: 400,
          message: "아이디를 찾을 수 없습니다. 아이디를 다시 확인해주세요.",
        });
      }
      if (password !== user.pw) {
        return res.status(400).json({
          status: 400,
          message: "비밀번호가 다릅니다. 비밀번호를 확인해주세요.",
        });
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          pw: user.pw,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
          issuer: "hackathon",
        }
      );
      return res.status(200).json({
        status: 200,
        message: "로그인 성공!",
        token,
      });
    });
    console.log("login ok!");
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "로그인 실패! 다시 로그인 해주세요.",
    });
  }
};
