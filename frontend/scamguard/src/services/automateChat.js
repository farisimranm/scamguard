// puppeteer is not supported by webpack 5

// import puppeteer from 'puppeteer';

// const automateChat = async (ocrText) => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.goto('https://chat.openai.com/');

//     const prompt = `I extracted the text from a screenshot image using OCR technology. The extracted text is very messy and not formatted. Can you find out what the chat is about? Please start your answer with "The screenshot is about". Please answer in less than 100 words. This is the extracted text:\n\`${ocrText}\``;

//     const inputSelector = await page.$('#prompt-textarea');
//     await inputSelector.type(prompt);

//     const formSelector = await page.$('form');
//     await formSelector.submit();

//     const resultSelector = await page.$x('//p[contains(text(), "The screenshot is about")]');
//     await page.waitForSelector(resultSelector);
//     const resultText = await page.$eval(resultSelector, element => element.textContent);
//     console.log('Result:', resultText);

//     await browser.close();
// }

// export { automateChat };