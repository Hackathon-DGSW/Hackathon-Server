import connection from "../../db";

export const userJoin = async (req, res) => {
  const { name, id, password, password2, major, job } = req.body;
  let idid;
  try {
    if (password !== password2) {
      return res.status(400).json({
        status: 400,
        message: "비밀번호 확인을 다시 확인해주세요.",
      });
    }
    connection.query(
      "select * from user_info where user_id = ?",
      [id],
      (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result.length == 0) {
          let joinQuery =
            "insert into user_info(user_id, user_pw, user_name, user_major, user_job) value('" +
            id +
            "', '" +
            password +
            "', '" +
            name +
            "', '" +
            major +
            "', '" +
            job +
            "')";
          connection.query(joinQuery, (err, result) => {
            if (err) console.log(err);
            return res.status(200).json({
              status: 200,
              message: "회원가입 성공!",
            });
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "이 아이디는 이미 사용되고 있습니다. 로그인 해주세요.",
          });
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "회원가입 실패! 다시 시도 해주세요.",
    });
  }
};
