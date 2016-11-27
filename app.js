//import decisiontree

var express = require('express')
var app = express()

var botflow = require('./botflow.json');


function getFirstMessage() {
	return botflow.messages[0];
}

var items = [
	{id:1, name:"abc"},
	{id:2, name:"xyz"}
]

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
//app.use(bodyParser.urlencoded({
//    extended: true
//}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
//app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/items', function (req, res) {
  res.send(JSON.stringify(items))
})

app.get('/actions', function (req, res) {
  console.log('Called Actions...')
  res.send("Hey")
})

app.post('/actions', function (req, res) {
  console.log('Called Actions...')
  res.send("Hey")
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
  //botflow = JSON.parse('botflow.json');
  console.log(JSON.stringify(getFirstMessage()));
})