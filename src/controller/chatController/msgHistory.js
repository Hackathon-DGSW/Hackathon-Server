import connection from "../../db";

export const msgHistory = (req, res) => {
  const { name } = req.user;
  const { roomName } = req.query;
  try {
    connection.query(
      "select * from chat where room=?",
      [roomName],
      (err, result) => {
        if (err) console.log(err);
        let msgList = [];
        result.forEach((msg, index) => {
          msgList.push({
            userName: name,
            msg: result[index].msg,
          });
        });
        console.log(msgList);
        return res.status(200).json({
          status: 200,
          msgList,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "메시지 조회에 실패하였습니다.",
    });
  }
};
