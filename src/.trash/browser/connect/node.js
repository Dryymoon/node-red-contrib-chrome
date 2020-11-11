import { promisify } from 'util';
import { resolve as dnsResolve } from 'dns';
import url from 'url';
import { isIP } from 'net';
import puppeteer from 'puppeteer';
import { v4 as uuid } from 'uuid';
import Node from '../../node-base';

export default class PuppeteerBrowserConnect extends Node {
  constructor(config) {
    super(config);

    // this.browserURL = config.browserURL;
    // this.slowMo = config.slowMo;

    this.status({ fill: "grey", shape: "ring", text: "disconnected" });
    // Retrieve the config node

    this.on('input', async (msg) => {
      try {
        // if (!this.browser) {

        this.status({ fill: "yellow", shape: "ring", text: "connecting" });

        let { browserURL } = config;
        const { slowMo } = config;
        const { protocol, hostname, port } = url.parse(browserURL);
        if (!isIP(hostname)) {
          // Chromium needs host tobe ip address
          const hostIp = await promisify(dnsResolve)(hostname);
          browserURL = url.format({ protocol, hostname: hostIp, port });
        }

        const browser = await puppeteer.connect({ browserURL, slowMo });

        // this.puppeteerBrowserRef = `popupeteer-browser-ref-${uuid()}`;

        this.status({ fill: "green", shape: "dot", text: "connected" });

        // browser.on('disconnected', this.onDisconnect);

        // this.context().flow.set(this.puppeteerBrowserRef, this.browser);
        // }

        msg.chrome = { browser };

        // msg.puppeteerBrowserRef = this.puppeteerBrowserRef;

        this.send([msg]);

      } catch (e) {
        // await this.clearResources();
        this.error(`Can't connect to browser, ${e.toString()}`, msg);
        // this.status({ fill: "red", shape: "dot", text: `Error, disconnected` });
        this.send([null, msg]);
      }
    });

    /* this.on('close', async (removed, done) => {
      if (removed) {
        // This node has been deleted
        console.log('NODE - deleted');
        await this.clearResources();
      } else {
        console.log('NODE - restarted');
        // This node is being restarted
      }
      done();
    }); */
  }

  /* onDisconnect = async () => {
    await this.clearResources();
    this.status({ fill: "grey", shape: "ring", text: "disconnected" });
  }; */

  /* clearResources = async () => {
    // if (this.browser) await this.browser.disconnect();
    // this.browser = undefined;
    // if (this.puppeteerBrowserRef) this.context().flow.set(this.puppeteerBrowserRef);
    // this.puppeteerBrowserRef = undefined;
  } */
}
