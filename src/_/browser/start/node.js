import puppeteer from 'puppeteer';
import { v4 as uuid } from 'uuid';
import Node from '../../node-base';

export default class PuppeteerBrowserStart extends Node {
  constructor(config) {
    super(config);

    this.status({ fill: "grey", shape: "ring", text: "not running" });

    this.on('input', async (msg) => {
      try {
        if (!this.browser) {

          this.status({ fill: "yellow", shape: "ring", text: "starting" });

          const { headless } = config;

          this.browser = await puppeteer.launch({ headless: !!headless });

          this.puppeteerBrowserRef = `popupeteer-browser-ref-${uuid()}`;

          this.status({ fill: "green", shape: "dot", text: "running" });

          this.browser.on('disconnected', this.onDisconnected);

          this.context().flow.set(this.puppeteerBrowserRef, this.browser);
        }

        msg.puppeteerBrowserRef = this.puppeteerBrowserRef;

        this.send([msg]);

      } catch (e) {
        await this.clearResources();
        this.error(`Can't start browser, ${e.toString()}`, msg);
        this.status({ fill: "red", shape: "dot", text: `Error, not running` });
        this.send([null, msg]);
      }
    });

    this.on('close', async (removed, done) => {
      if (removed) {
        // This node has been deleted
        console.log('NODE - deleted');
        await this.clearResources();
      } else {
        console.log('NODE - restarted');
        // This node is being restarted
      }
      done();
    });
  }

  onDisconnected = async () => {
    await this.clearResources();
    this.status({ fill: "grey", shape: "ring", text: "not running" });
  };

  clearResources = async () => {
    if (this.browser) await this.browser.close();
    this.browser = undefined;
    if (this.puppeteerBrowserRef) this.context().flow.set(this.puppeteerBrowserRef);
    this.puppeteerBrowserRef = undefined;
  }
}
