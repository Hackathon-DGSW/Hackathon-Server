import connection from "../../db";

export const webList = (req, res) => {
  try {
    let listQuery = "select * from user_info";
    connection.query(listQuery, (err, result) => {
      if (err) console.log(err);
      let userArray = [];
      result.forEach((user, index) => {
        if (
          (result[index].user_job === "취업생" &&
            result[index].user_major === "Web") ||
          result[index].user_major === "WEB" ||
          result[index].user_major === "web"
        ) {
          userArray.push({
            id: result[index].user_id,
            name: result[index].user_name,
            job: result[index].user_job,
            major: result[index].user_major,
          });
        }
        index++;
      });
      console.log("success");
      return res.status(200).json({
        userArray,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "유저리스트를 찾지 못하였습니다!",
    });
  }
};
