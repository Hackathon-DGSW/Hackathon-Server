import connection from "../../db";

export const userProfile = async (req, res) => {
  const { name, major, id, job } = req.user;
  try {
    return res.status(200).json({
      status: 200,
      name,
      major,
      id,
      job,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 500,
      message: "회원 조회 실패",
    });
  }
};
