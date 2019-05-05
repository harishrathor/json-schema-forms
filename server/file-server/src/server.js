

const PORT = process.env.port || 4000;
https://s3-us-west-1.amazonaws.com/bucket.cpabuild.com/assets/landing_pages/loaded-movie.mp4

import http  from 'http';
import fs  from 'fs';
import path  from 'path';
import config from './config';

http.createServer(function (request, response) {

    var filePath =  request.url;
    if (filePath == '/') {
        filePath = path.join(config.assets, 'html', 'index.html');
    } else {
		filePath = path.join(config.assets, filePath)
	}

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    var contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
				const notFoundHtml = path.join(config.assets, 'html', '404.html');
                fs.readFile(notFoundHtml, function(error, content) {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(PORT, (error) => {
	if (error) {
		console.log("Error in file running server:", error);
	} else {
		console.log(`File Server running at http://127.0.0.1:${PORT}/`);
	}
});