import express from 'express';
import axios from 'axios';
import doctype from 'doctype';
import cheerio from 'cheerio';
import config from './config';

const server = express();

// Telling express to use /public as default static folder.
server.use(express.static('public'));

// Serving on port configured on /config.js
server.listen(config.port, () => {
  console.info('Express server listening on port :', config.port);
});

// Our API endpoint route is defined here:
server.get('/api', (req, res) => {
  axios.get(req.query.url).then((response) => {
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    const headings = [];
    const internalLinks = [];
    const externalLinks = [];
    let numberOfInvLinks = 0;
    let htmlVersion = 'Version could not be found.';
    let isLogin = 'There is no login form in the page.';

    for (let level = 1; level <= 6; level += 1) {
      const headingCount = $(`h${level}`).length;
      headings[level - 1] = headingCount;
    }

    // Parsing internal/external links here:
    $('a').each(function execute() {
      if ($(this).attr('href').startsWith('#')) {
        internalLinks[internalLinks.length] = $(this).attr('href');
      } else {
        externalLinks[externalLinks.length] = $(this).attr('href');
      }
    });
    const numberOfIntLinks = internalLinks.length;
    const numberOfExtLinks = externalLinks.length;

    // Find if there is any 'display: none' links:
    $('a').each(function execute() {
      if ($(this).css('display') === 'none') {
        numberOfInvLinks += 1;
      }
    });

    // Find if there is any login (password) forms:
    $('input').each(function execute() {
      if ($(this).attr('type') === 'password') {
        isLogin = 'There is a login form in the page.';
      }
    });

    // Parse html version here using doctype:
    if (response.data.substring(0, 100).includes(doctype(4.01))) {
      htmlVersion = '4.01';
    } else if (response.data.substring(0, 100).includes(doctype(5))) {
      htmlVersion = '5';
    }

    res.json({
      title,
      h1: headings[0],
      h2: headings[1],
      h3: headings[2],
      h4: headings[3],
      h5: headings[4],
      h6: headings[5],
      numberOfIntLinks,
      numberOfExtLinks,
      numberOfInvLinks,
      isLogin,
      htmlVersion,
    });
  }).catch((err) => {
    if (err.response) {
      res.json({
        title: err,
        h1: err,
        h2: err,
        h3: err,
        h4: err,
        h5: err,
        h6: err,
        numberOfIntLinks: err,
        numberOfExtLinks: err,
        numberOfInvLinks: err,
        isLogin: err,
        htmlVersion: err,
      });
    }
  });
});
