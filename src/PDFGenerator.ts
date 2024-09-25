import { Helper } from "./Helper";
import { GeneratorFunction } from "./types/GeneratorTypes";
// const fs = require('fs');


export class PDFGenerator {
  /**
   * This function returns the buffer for a generated PDF of manual
   * @param {any} html - HTML
   * @returns {Array<any>} array of Structure Instructions
   */
  static getPDF: GeneratorFunction = async (html: string) => {
    try {

      const options = {
        format: "A4",
        printBackground: true,
        margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
      };

      const pdf = await Helper.getPDFBuffer(html, options);
      const base64 = pdf.toString('base64');
      // fs.writeFileSync('./files/demo2.pdf', pdf);
      // const _file  = fs.readFileSync('./files/demo2.pdf');
      // const _fileBase64 = _file.toString('base64');

      return {
        headers: {
          "Content-type": "application/pdf",
        },
        statusCode: 200,
        // body: _fileBase64,
        body: base64,
        isBase64Encoded: true,
      };
    } catch (error) {
      console.error("Error : ", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error,
          message: "Something went wrong",
        }),
      };
    }
  };
}
