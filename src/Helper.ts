// @ts-ignore
import * as chromium from "chrome-aws-lambda";

import { GetPDFBuffer } from "./types/HelperTypes";
import { Browser } from "puppeteer-core";

const isLocal = true; // TODO: remove this when deploying

export class Helper {
  static getPDFBuffer: GetPDFBuffer = async (html: string, options: any) => {
    let browser: Browser = null;
    try {
      const executablePath = isLocal ? null : await chromium.executablePath;
      browser = await chromium.puppeteer.launch({
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--single-process",
        ],
        executablePath,
      });

      const page = await browser.newPage();
      const loaded = page.waitForNavigation({
        waitUntil: "load",
      });

      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      await loaded;

      return await page.pdf(options);
    } catch (error) {
      return error;
    } finally {
      if (browser !== null) {
        await browser.close();
      }
    }
  };
}
