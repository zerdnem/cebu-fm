const {writeFileSync} = require('fs');
const {promisify} = require('util');
const request = require("request");
const cheerio = require("cheerio");

const query = "query=Cebu%20City";
const page = '3'
const rp = promisify(request);
const wfsp = promisify(writeFileSync);
const options = {
	method: "POST",
	url: "https://gd57zlusmo-3.algolia.io/1/indexes/radios/query",
	headers: {
		"X-Algolia-API-Key": "ab71013c4c832d9450c1a1182357278c",
		"X-Algolia-Application-Id": "GD57ZLUSMO",
		Referer: "https://streema.com/radios/Cebu_City"
	},
	json: {
		params: query + "&hitsPerPage=10&page=" + page,
		apiKey: "ab71013c4c832d9450c1a1182357278c",
		appID: "GD57ZLUSMO"
	}
};


async function getAudioStream(slug) {
	const {body} = await rp("http://streema.com/radios/play/" + slug)
	const $ = cheerio.load(body);
	const audio = $('source').attr('src');
	return audio;
}

async function parseData(data) {
	const result = [];
	const stations = data.hits;
	for (var i = 0; i < stations.length; i++) {
		const station = stations[i];
		const id = station.id;
		const title = station.name;
		const largeimage = station.logo_url_original;
		const description = station.description;
		const genre = station.genre;
		const listeners = station.popularity;
		const slug = station.slug
		const mp3file = await getAudioStream(slug);
		result.push({id,slug,title,largeimage,description,genre,listeners,mp3file})
	}
	return result
}


(async () => {
	const {body} = await rp(options);
	const result = await parseData(body); 
	console.log(result)
	await wfsp('page4.json', JSON.stringify({result,count:result.length}));
})()
