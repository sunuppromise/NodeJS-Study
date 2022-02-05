const http = require('http');
const fs = require('fs');
const url = require('url');

const app = http.createServer(function (request, response) {
  let requestURL = request.url;
  let pathname = url.parse(requestURL, true).pathname;
  console.log(requestURL);
  let queryData = url.parse(requestURL, true).query;
  let title = queryData.id;
  if (pathname == '/') {
    fs.readFile(`data/${queryData.id}`, 'utf-8', (err, data) => {
      let temp = `
  <!doctype html>
  <html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    <ol>
      <li><a href="./?id=HTML">HTML</a></li>
      <li><a href="./?id=CSS">CSS</a></li>
      <li><a href="./?id=JavaScript">JavaScript</a></li>
    </ol>
    <h2>${title}</h2>
    <p>
    ${data}
    </p>
  </body>
  </html>
    `;
      response.writeHead(200);
      response.end(temp);
    });
  } else {
    let data = 'welcom';
    let temp = `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="./?id=HTML">HTML</a></li>
        <li><a href="./?id=CSS">CSS</a></li>
        <li><a href="./?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p>
      ${data}
      </p>
    </body>
    </html>
      `;
    response.writeHead(404);
    response.end(temp);
  }
});
app.listen(3000);
