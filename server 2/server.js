const http = require('http');
const url = require('url');
const app = require('./server-app.js');

const server = http.createServer();

// osluskivac za zahtjev od klijenta
server.on('request', function(req, res) {
    let teloOdgovora = {};
    let statusniKod = 200;

    let method = req.method;

    if (method === 'GET') 
    {
        // Izdvajanje podataka iz zahteva
        let urlString = req.url;
        let urlObj = url.parse(urlString, true);
        let data = urlObj.query;

        if(data["aktivnost"] == "LOGOVANJE"){
            teloOdgovora = app.logovanje_korisnika(data);
        }

        if(data["aktivnost"] == "REGISTRACIJA"){
            let uspjesna_registracija = app.registracija_korisnika(data);
            if(uspjesna_registracija){
                teloOdgovora["poruka-uspjeha"] = "Uspjesno se registrovani. Cestitamo " + data["ime"] + " " + data["prezime"] + "!";
            }
            else {
                teloOdgovora["poruka-greske"] = "Promijenite korisnicko ime!";
            }
        }

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
    res.write(JSON.stringify(teloOdgovora));
    res.end();
});

const port = 3000;
server.listen(port);

server.once('listening', function() {
    console.log(`http://localhost:${port}`);
});
