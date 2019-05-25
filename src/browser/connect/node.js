import { promisify } from 'util';
import { resolve as dnsResolve } from 'dns';
import url from 'url';
import { isIP } from 'net';
import puppeteer from "../pupeteer";
import { Node } from 'node-red-module-creator';

export default class PuppeteerBrowserConnect extends Node {

  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        let { browserURL } = config;
        const { slowMo } = config;
        const { protocol, hostname, port } = url.parse(browserURL);
        if (!isIP(hostname)) {
          // Chromium needs host tobe ip address
          const hostIp = await promisify(dnsResolve)(hostname);
          browserURL = url.format({ protocol, hostname: hostIp, port });
        }

        const browser = await puppeteer.connect({ browserURL, slowMo });

        this.send({ ...msg, $$browserGetter: () => browser, $$browserContextGetter: () => browser });

      } catch (e) {
        this.error(`Can't connect to browser, ${e.toString()}`, msg);
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
}
