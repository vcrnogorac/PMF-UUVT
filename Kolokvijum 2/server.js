const http = require('http');
const url = require('url');
const app = require('./server-app.js');

const server = http.createServer();

// osluskivac za zahtjev od klijenta
server.on('request', function(req, res) {
    let tijeloOdgovora = {};
    let statusniKod = 200;

    let method = req.method;

    if (method === 'GET') 
    {
        // Izdvajanje podataka iz zahteva
        let urlString = req.url;
        let urlObj = url.parse(urlString, true);
        let data = urlObj.query;

        tijeloOdgovora["niska-1"] = app.sg_u_niski(data["niska1"]);
        tijeloOdgovora["niska-2"] = app.sg_u_niski(data["niska2"]);

        res.setHeader('Content-Type', 'application/json');
    }
    else if (method == 'OPTIONS') 
    {
        res.setHeader('Allow', 'OPTIONS, GET');
    }
    else 
    {
        statusniKod = 405;
        res.setHeader('Allow', 'OPTIONS, GET');
    }

    res.writeHead(statusniKod, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.write(JSON.stringify(tijeloOdgovora));
    res.end();
});

const port = 3000;
server.listen(port);

server.once('listening', function() {
    console.log(`http://localhost:${port}`);
});
