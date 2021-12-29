import connection from "../../db";

export const chatHistory = (req, res) => {
  const { name } = req.user;
  try {
    connection.query(
      "select * from chat where name=?",
      [name],
      (err, result) => {
        if (err) console.log(err);
        let roomList = [];
        result.forEach((roomName, index) => {
          roomList.push(result[index].roomName);
        });
        console.log(roomList);
        return res.status(200).json({
          status: 200,
          roomList,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "채팅 조회에 실패 하였습니다.",
    });
  }
};
