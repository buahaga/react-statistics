const startServer = require('./index');
const chalk = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
  console.log(chalk.green('Setup Puppeteer'));
  startServer();
  const browser = await puppeteer.launch(process.env.DEBUG
    ? {
      headless: false,
    }
    : {});
  global.__BROWSER__ = browser;
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
