const http = require('http');
const fs = require('fs');
const url = require('url');
const { Console } = require('console');

const app = http.createServer(function (request, response) {
  const requestURL = request.url;
  let queryData = url.parse(requestURL, true).query;
  let title = queryData.id;
  if (requestURL == '/') {
    title = 'Wellcome';
  }
  if (requestURL == '/favicon.ico') {
    response.writeHead(404);
    response.end();
    return;
  }
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
});
app.listen(3000);
