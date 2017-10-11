// require modules area
const fs = require('fs');
const render = require('./render');
const querystring = require('querystring');
//----------

const commonHeaders = {'content-type': 'text/html'};

function home(req, res){
    "use strict";
    if (req.method.toLowerCase() === 'get') {
        res.writeHead(200, commonHeaders);
        render.renderIndexPage(res);
    }
}

function text(req, res) {
    "use strict";
    if (req.method.toLowerCase() === 'post') {
        let data ="";
        req.on('data', chunk => {
            data+=chunk;
        });
        req.on('end', ()=> {
            const query = querystring.parse(data);
            res.writeHead(200, commonHeaders);
            render.renderTextPage(query, res);
        });
    }
}
function notFound(req, res){
    "use strict";
    res.writeHead(404, commonHeaders);
    res.end();
}

function style(req, res){
    "use strict";
    res.writeHead(200, {'content-type': 'text/css'});
    res.write(fs.readFileSync('./View/style.css'));
    res.end();
}
module.exports.home = home;
module.exports.notFound = notFound;
module.exports.text = text;
module.exports.style = style;