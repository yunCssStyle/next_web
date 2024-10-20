// const http = require('http');
const { parse } = require('url');
const next = require('next');

const https = require('https');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = 3002;

const httpsOptions = {
  key: fs.readFileSync('./cert.key'),
  cert: fs.readFileSync('./cert.crt')
};

app.prepare().then(() => {
  // http
  //   .createServer((req, res) => {
  //     const parsedUrl = parse(req.url, true);
  //     handle(req, res, parsedUrl);
  //   })
  //   .listen(PORT, (err) => {
  //     if (err) throw err;
  //     console.log(`> Ready on http://localhost:${PORT}`);
  //   });

  // https 서버 추가
  https
    .createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    })
    .listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> HTTPS: Ready on https://localhost:${PORT}`);
    });
});
