import { isUri } from 'valid-url';
import Node from '../../node-base';

export default class PuppeteerPageOpen extends Node {
  constructor(config) {
    super(config);

    this.on('input', async (msg) => {
      try {
        const { $page, payload: urlFromMsg } = msg;
        const { url: urlFromConfig, waitUntil, timeout = 30 } = config;
        let url;
        if (urlFromMsg && isUri(urlFromMsg)) url = urlFromMsg;
        if (urlFromConfig && isUri(urlFromConfig)) url = urlFromConfig;

        if (!url) throw new Error('no url passed');

        await $page().goto(url, { waitUntil, timeout: timeout * 1000 });

        this.send(msg);

      } catch (e) {
        this.error(`Can't goto url, ${e.toString()}`, msg);
        this.send([null, msg]);
      }
    });
  }
}
