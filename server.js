import express from 'express';
import config from './config';

const server = express();

// Telling express to use /public as default static folder.
server.use(express.static('public'));

// Serving on port configured on /config.js
server.listen(config.port, () => {
  console.info('Express server listening on port :', config.port);
});
