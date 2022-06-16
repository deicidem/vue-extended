const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const renderer = require('vue-server-renderer').createRenderer({
	template: fs.readFileSync('./dist/index.html', 'utf-8').replace('<div id="app"></div>', '<!--vue-ssr-outlet-->')
});
const serverBundle = require('./dist/js/server-bundle.js');

server.use('/css', express.static(path.resolve(__dirname, './dist/css')));
// server.use('/js', express.static(path.resolve(__dirname, './dist/js')));
server.use('/img', express.static(path.resolve(__dirname, './dist/img')));

server.get('*', (req, res) => {
	let context = { url: req.url, title: 'Not found' };

	serverBundle(context).then(app => {
		renderer.renderToString(app, context, (err, html) => {	
			if(err){
				console.log(err);
			}
	
			res.end(html);
		});
	});
});

server.listen(3000);
console.log('server run...')