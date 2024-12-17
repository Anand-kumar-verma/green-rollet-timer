const express = require("express");
const schedule = require("node-cron");
const { default: axios } = require("axios");
const app = express();
const port = 4000;
app.use(express.static("public"));
const puppeteer = require("puppeteer");

const jobRunByCroneAWSForWingoGame = async () => {
  console.log("Function called");
  schedule.schedule("58 * * * * *", async function () {
    const url = "https://api.bigdaddygame.cc/api/webapi/GetNoaverageEmerdList";
    const reqBody = {
      language: 0,
      pageNo: 1,
      pageSize: 10,
      random: "764ad36b88a54a3b8d040838a9438dfb",
      signature: "E8438324D9EC6D487894F3F933B37EB0",
      timestamp: Math.floor(Date.now() / 1000), // Ensure timestamp is dynamic
      typeId: 1,
    };

    try {
      const browser = await puppeteer.launch({
        headless: true,
        executablePath:
          "C:\\Users\\anand\\.cache\\puppeteer\\chrome\\win64-131.0.6778.108\\chrome-win64\\chrome.exe",
      });
      const page = await browser.newPage();

      // Set headers to mimic a browser
      await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
      );
      await page.setExtraHTTPHeaders({
        "Content-Type": "application/json",
      });

      // Navigate to API endpoint
      await page.goto(url, {
        waitUntil: "networkidle2",
      });

      // Perform API POST request
      const result = await page.evaluate(async (body) => {
        const response = await fetch(
          "https://api.bigdaddygame.cc/api/webapi/GetNoaverageEmerdList",
          {
            method: "POST",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            },
            body: JSON.stringify(body),
          }
        );
        return response.json();
      }, reqBody);

      console.log("Response Object:", result?.data?.list?.[0]);
      await browser.close();
    } catch (error) {
      console.error("Puppeteer Error:", error.message);
    }
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
