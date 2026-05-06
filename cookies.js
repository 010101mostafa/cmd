#!/usr/bin/env node

const { chromium } = require('playwright');

const origin = process.argv[2] || "https://bitbucket.org/ConetellectMainAccount/workspace/overview/";
const env = {
  email: process.env.EMAIL || "",
  password: process.env.PASSWORD || ""
}
async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  const response = await page.goto(origin, { waitUntil: 'load' });

  console.log(`test`);
  console.log(`Navigated to ${origin} with status ${response?.status()}`);
  await page.fill('input[type="email"]', env.email,{
    timeout:10000
  });// $('input[type="email"]')
  console.log(`Email input filled with: ${env.email}`);
  await page.click('#login-submit');
  await page.fill('input[type="password"]', env.password); // Wait a moment to ensure cookies are set

  await page.click('#login-submit');
  const cookies = await page.context().cookies();
  const str = cookies.map(c => `${c.name}=${c.value}`).join('; ');
  console.log(str);
  await browser.close();
}

main();