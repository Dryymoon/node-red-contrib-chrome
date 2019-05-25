import { Node } from 'node-red-module-creator';
import puppeteer from "../pupeteer";

export default class PuppeteerBrowserStart extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { headless, incognito } = config;

        const browser = await puppeteer.launch({ headless: !!headless });
        let context = browser;
        if (incognito) context = await browser.createIncognitoBrowserContext();

        this.send({ ...msg, $$browserGetter: () => browser, $$browserContextGetter: () => context });

      } catch (e) {
        this.error(`Can't start browser, ${e.toString()}`, msg);
      }
    });
  }
}
