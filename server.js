import express from 'express';
import axios from 'axios';
import cheerio from 'cheerio';
import config from './config';

const server = express();

// Telling express to use /public as default static folder.
server.use(express.static('public'));

// Serving on port configured on /config.js
server.listen(config.port, () => {
  console.info('Express server listening on port :', config.port);
});

server.get('/api', (req, res) => {
  axios.get(req.query.url).then((response) => {
    const $ = cheerio.load(response.data);
    const title = $('title').text();
    const headings = [];
    const internalLinks = [];
    const externalLinks = [];
    let isLogin = 'There is no login form in the page.';

    for (let level = 1; level <= 6; level += 1) {
      const headingCount = $(`h${level}`).length;
      headings[level - 1] = headingCount;
    }

    $('a').each(function execute() {
      if ($(this).attr('href').startsWith('#')) {
        internalLinks[internalLinks.length] = $(this).attr('href');
      } else {
        externalLinks[externalLinks.length] = $(this).attr('href');
      }
    });
    const numberOfIntLinks = internalLinks.length;
    const numberOfExtLinks = externalLinks.length;
    let numberOfInvLinks = 0;

    $('a').each(function execute() {
      if ($(this).css('display') === 'none') {
        numberOfInvLinks += 1;
      }
    });

    $('input').each(function execute() {
      if ($(this).attr('type') === 'password') {
        isLogin = 'There is a login form in the page.';
      }
    });

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
    });
  }).catch((err) => {
    if (err.response) {
      console.info(err.response.status);
      res.json(err.response);
    }
  });
});
