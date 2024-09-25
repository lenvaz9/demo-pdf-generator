import { PDFGenerator } from "./src/PDFGenerator";
import { getTemplate } from "./templates/radiologist-report-template";

const express = require("express");
const app = express();
const port = 3000;

app.get("/", async (_, res) => {
  const html = getTemplate({ name: "Keshav" });
  const response = await PDFGenerator.getPDF(html);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
