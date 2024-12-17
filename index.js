const express = require("express");
const schedule = require("node-cron");
const { default: axios } = require("axios");
const app = express();
const port = 4000;
app.use(express.static("public"));
const jobRunByCroneAWSForWingoGame = async () => {
  console.log("functoin called");
  schedule.schedule("58 * * * * *", async function () {
    // const period_id = await queryDb(
    //   "SELECT win_transactoin FROM wingo_round_number WHERE win_id = 1;",
    //   []
    // );
    // const period = period_id?.[0]?.win_transactoin;
    const reqBody = {
      language: 0,
      pageNo: 1,
      pageSize: 10,
      random: "764ad36b88a54a3b8d040838a9438dfb",
      signature: "E8438324D9EC6D487894F3F933B37EB0",
      timestamp: 1734372964,
      typeId: 1,
    };
    await axios
      .post(
        `https://api.bigdaddygame.cc/api/webapi/GetNoaverageEmerdList`,
        reqBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(async (result) => {
        let q =
          "INSERT INTO `colour_admin_result`(`gamesno`,`gameid`,`number`,`status`) VALUES(?,?,?,?);";
        let obj = result?.data?.data?.list?.[0];
        console.log(obj);
        //  await queryDb(q, [Number(period) + 1, 1, obj?.number, 1]);
      })
      .catch((e) => {
        console.log(e);
      });
  });
};
let y = true;
if (y) {
  console.log("Waiting for the next minute to start...");
  const now = new Date();
  const secondsUntilNextMinute = 60 - now.getSeconds();
  console.log(
    "start after ",
    // moment(new Date()).format("HH:mm:ss"),
    secondsUntilNextMinute
  );
  setTimeout(() => {
    jobRunByCroneAWSForWingoGame();
    x = false;
  }, secondsUntilNextMinute * 1000);
}
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
