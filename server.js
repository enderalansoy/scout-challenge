import express from 'express';
import cors from 'cors';
import config from './config';

const cheerio = require('cheerio');
const request = require('request');


const server = express();

server.use(cors());

// Telling express to use /public as default static folder.
server.use(express.static('public'));

// Serving on port configured on /config.js
server.listen(config.port, () => {
  console.info('Express server listening on port :', config.port);
});


server.get('/api', (req, res) => {
  request(req.param('url'), (error, response, html) => {
    if (!error && response.statusCode === 200) {
      // Cheerio.js to load page source.
      const $ = cheerio.load(html);

      // Parse title of the page from '<title>' tag.
      const title = $('title').text();
      console.info(`Title: ${title}`);
      res.send(title);

      // Parse headings in the page from '<h*>' tags.
      for (let level = 1; level <= 6; level += 1) {
        const headingCount = $(`h${level}`).length;
        console.info(`Level ${level} headings: ${headingCount}`);
      }

      // Parse links.
      const internalLinks = [];
      const externalLinks = [];
      $('a').each(function execute() {
        if ($(this).attr('href').startsWith('#')) {
          internalLinks[internalLinks.length] = $(this).attr('href');
        } else {
          externalLinks[externalLinks.length] = $(this).attr('href');
        }
      });

      $('a').each(function execute(i) {
        if ($(this).css('display') === 'none') {
          console.info(`${i} is invisible`);
        } else {
          console.info(`${i} is visible`);
        }
      });

      console.info(`# of external links: ${externalLinks.length}`);
      console.info(`# of internal links: ${internalLinks.length}`);
    }
  });
});
