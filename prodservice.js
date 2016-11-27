//import decisiontree

var express = require('express')
var app = express()


var facilities = [
	{id:1, name:"Leo", actProd: "1000", planProd: "1000", wells: 
		[
			{ name: "W10", actProd: "200", planProd: "200" },
			{ name: "W20", actProd: "200", planProd: "200" },
			{ name: "W30", actProd: "200", planProd: "200" },
			{ name: "W40", actProd: "200", planProd: "200" },
			{ name: "W50", actProd: "200", planProd: "200" },
		]
	},
	{id:2, name:"Cancer", totalActProd: "1000", totalPlanProd: "1000", wells:
		[
			{ name: "W11", actProd: "200", planProd: "200" },
			{ name: "W21", actProd: "200", planProd: "200" },
			{ name: "W31", actProd: "200", planProd: "200" },
			{ name: "W41", actProd: "200", planProd: "200" },
			{ name: "W51", actProd: "200", planProd: "200" },
		]
	},
	{id:3, name:"Aquaris", totalActProd: "1000", totalPlanProd: "1000", wells:
		[
			{ name: "W12", actProd: "200", planProd: "200" },
			{ name: "W22", actProd: "200", planProd: "200" },
			{ name: "W32", actProd: "200", planProd: "200" },
			{ name: "W42", actProd: "200", planProd: "200" },
			{ name: "W52", actProd: "200", planProd: "200" },
		]
	}
]


app.get('/', function (req, res) {
	res.redirect('/facilities', req, res)
})

app.get('/facilities', function (req, res) {
	var facilityNames = [];
	for(i = 0; i < facilities.length; i++) {
		var name = { id: facilities[i].id, name: facilities[i].name };
		facilityNames.push(name)
	}
	res.send(JSON.stringify(facilityNames))
})

app.get('/prodHistory', function (req, res) {
	var facilityId = req.query.facilityId;
	var facilityNames = [];
	for(i = 0; i < facilities.length; i++) {
		if (facilityId == facilities[i].id ) {
			var name = { id: facilities[i].id, name: facilities[i].name };
			facilityNames.push(name)
		}
	}
	res.send(JSON.stringify(facilityNames))
})

app.get('/actions', function (req, res) {
  console.log('Called Actions...')
  res.send("Hey")
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})