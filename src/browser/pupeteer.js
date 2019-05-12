import 'puppeteer';
import puppeteer from "puppeteer-extra";
import pluginStealth from "puppeteer-extra-plugin-stealth";

puppeteer.use(pluginStealth());

export default puppeteer;