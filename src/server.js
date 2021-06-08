const express = require('express');

const ejs = require('ejs');
const path = require('path');

const puppeteer = require('puppeteer');

const app = express();

const hitechlinePartners = [
  {
    name: 'Gabriel Hijazi',
    type: 'CO-FOUNDER',
    state: 'Mato Grosso do Sul',
  },
  {
    name: 'Pablo Vinicius',
    type: 'CO-FOUNDER',
    state: 'Bahia',
  },
  {
    name: 'Marcello Raber',
    type: 'CO-FOUNDER',
    state: 'Rondonia',
  },
  {
    name: 'Ahmed Hijazi',
    type: 'CO-FOUNDER',
    state: 'Rondonia',
  },
];

app.get('/download-pdf', async (req, res) => {
  const browser = await puppeteer.launch({ headless: true }); // definindo como headless
  const page = await browser.newPage();


  await page.goto('http://localhost:3000/', {
    waitUntil: 'networkidle0',
  });

  const pdf = await page.pdf({
    printBackground: true,
    format: 'Letter',
    margin: {
      top: '20px',
      bottom: '40px',
    },
  });

  await browser.close();

  res.contentType('application/pdf');
  return res.send(pdf);
});

app.get('/', (req, res) => {
  ejs.renderFile(
    path.join(__dirname, '/boleto.ejs'),
    {
      hitechlinePartners,
    },
    (err, htmlData) => {
      if (err) {
        return res.send('Deu erro no arquivo CATAPIMBAS');
      }

      return res.send(htmlData);
    },
  );
});

app.listen(3000);
