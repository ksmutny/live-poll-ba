const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

setDefaultTimeout(3000);

Before(async function () {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function () {
    await this.page.close();
    await this.context.close();
    await this.browser.close();
});

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

Given('I am on the Create Poll page', async function () {
    await this.page.goto('https://live-poll-ba.web.app');
});

When('I create a new poll with the question {string} and options {string}, {string}, {string}', async function (question, option1, option2, option3) {
    await this.page.fill('input[placeholder="Poll question"]', question);
    await this.page.fill('input[placeholder="Option 1"]', option1);
    await this.page.fill('input[placeholder="Option 2"]', option2);
    await this.page.fill('input[placeholder="Option 3"]', option3);
    await this.page.click('#create-poll');

    this.voteUrl = await this.page.getAttribute('#vote-url', 'href');
    this.qrCodeSrc = await this.page.getAttribute('#vote-url-qrcode', 'id');
    this.adminUrl = await this.page.getAttribute('#admin-url', 'href');
});

Then('I should receive a voting URL', async function () {
    expect(this.voteUrl).toBeTruthy();
});

Then('I should receive a QR code for the voting URL', async function () {
    expect(this.qrCodeSrc).toBeTruthy();
});

Then('I should receive an admin URL for poll results', async function () {
    expect(this.adminUrl).toBeTruthy();
});


When('I open the voting URL', async function () {
    await this.page.goto(this.voteUrl);
});

When('I select {string}', async function (option) {
    await this.page.click(`input[value="${option}"]`);
});

When('I submit my vote', async function () {
    await this.page.click('#submit-vote');
});

When('I open the admin URL', async function () {
    await this.page.goto(this.adminUrl);
});

Then('my vote should be counted in the poll results', async function () {
    await this.page.goto(this.adminUrl);
    await this.page.waitForSelector('h1');
    const results = await this.page.$$eval('li', results => results.map(result => result.innerText));
    const totalVotes = results.reduce((acc, result) => acc + parseInt(result.split(': ')[1]), 0);
    expect(totalVotes).toBeGreaterThan(0);
});

Then('I should see the poll results', async function () {
    await this.page.waitForSelector('h1');
    const results = await this.page.$$eval('li', results => results.map(result => result.innerText));
    expect(results.length).toBeGreaterThan(0);
});

Then('the results should include the number of votes for {string}, {string}, and {string}', async function (option1, option2, option3) {
    await this.page.waitForSelector('h1');
    const results = await this.page.$$eval('li', results => results.map(result => result.innerText));
    const options = [option1, option2, option3];
    options.forEach(option => {
        const result = results.find(result => result.includes(option));
        expect(result).toBeTruthy();
    });
});
