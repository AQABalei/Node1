let express = require("express");
let knex = require("knex");

let app = express();

app.get('/api/artists', function(request, response) {

	let filter = request.query.filter;
	console.log(filter);
	let connection = knex({
		client: 'sqlite3',
		connection: {
			filename: 'chinook.db'
		}
	});
	if(filter === undefined || filter === null || filter === ''){
		connection
		.select('ArtistId AS id', 'Name AS name')
		.from('artists')
		.then((artists) => {
			response.json(artists);
		});
	}
	else{
		connection
		.select('ArtistId AS id', 'Name AS name')
		.from('artists')
		.where('Name', 'like', '%' + filter + '%')
		.then((artists) => {
			response.json(artists);
		});
	}
});

app.listen(8000);