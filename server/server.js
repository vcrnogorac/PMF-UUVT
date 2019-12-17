const http = require('http');
const url = require('url');
const racun = require('./racun.js');

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
        // Primetimo da ukoliko je vrijednost podatka niz,
        // onda se na ime te vrijednosti dodaju karakteri "[]",
        // te ne mozemo koristiti tacka-notaciju da dohvatimo taj niz
        let zahtjevi = data["zahtjevi[]"];
        let brojevi = data["brojevi[]"];

        for(let i=0; i<zahtjevi.length; i++){
            teloOdgovora[zahtjevi[i]] = racun[zahtjevi[i]](brojevi);
        }   
/*
        teloOdgovora['zbir'] = racun.zbir(brojevi);
        teloOdgovora['proizvod'] = racun.proizvod(brojevi);
        teloOdgovora['prosjek'] = racun.prosjek(brojevi);
        teloOdgovora['minimum'] = racun.minimum(brojevi);
        teloOdgovora['maximum'] = racun.maximum(brojevi);
*/

        res.setHeader('Content-Type', 'application/json');
    
        console.log(teloOdgovora);
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
