const express = require('express');
const container = require('./container');

const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');

container.resolve((users) => {

  const app = SetupExpress();

  function SetupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000, () => {
      console.log('Listening on port 3000');
    });
    ConfigureExpress(app);

    //Setup router
    const router = require('express-promise-router')();
    users.SetRouting(router)
  
    app.use(router);
  }


  function ConfigureExpress(app) {
    app.use(express.static('public'));
    app.set('view-engine', 'ejs');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
  }
})