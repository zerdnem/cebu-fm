const fs = require('fs');
const cheerio = require('cheerio');
const data = require('./data');

(async () => {
	const html = data.data;
	const result = [];
	const $ = cheerio.load(html);
	//console.log($('.stations__station__tags').length);
	$('.b-play.station_play').each((i, e) => {
		const name = $(e).attr('radioname');
		const listeners = $(e).attr('listeners') ? $(e).attr('listeners') : '0' ;
		const image = 'https:' + $(e).attr('radioimg');
		const stream = $(e).attr('stream');
		result.push({name, listeners, image, stream});
	});
	//console.log(result.length)
	console.log({result, count:result.length});

	fs.writeFileSync('onlineradio.json', JSON.stringify({result, count:result.length}));
})();
