import connection from "../../db";

export const userDelete = async (req, res) => {
  const { id } = req.user;
  try {
    let deleteQuery = "delete from user_info where user_id='" + id + "'";
    connection.query(deleteQuery, (err, result) => {
      if (err) console.log(err);
    });
    return res.status(200).json({
      status: 200,
      message: "탈퇴 되었습니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "회원 탈퇴 실패! 다시 시도해주세요.",
    });
  }
};
