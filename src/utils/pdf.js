const Puppeteer = require("puppeteer");

module.exports = async function buildPdf(inputFile, outputFile) {
  const browser = await Puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`file://${inputFile}`, {
    waitUntil: "networkidle0",
  });

  // Viewport 설정: 이 부분을 조정해서 HTML 문서가 제대로 표시되도록 합니다.
  await page.setViewport({
    width: 1200, // 필요에 따라 너비를 조정하세요.
    height: 1754, // A4 용지 크기에 맞게 높이를 설정합니다.
  });

  await page.pdf({
    path: outputFile,
    format: "A4",
    printBackground: true, // 배경이 출력되도록 설정합니다.
    margin: {
      top: "2.54cm",
      right: "2.54cm",
      bottom: "2.54cm",
      left: "2.54cm",
    },
  });
  await browser.close();
};
