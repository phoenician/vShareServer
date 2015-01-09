var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var Event = require('./model/event')
var Participant = require('./model/participant') 
var Expense = require('./model/expense') 
var Summary = require('./model/summary')
var app = express()

app.use(bodyParser.json())	

app.get('/api/summary/:eventid', function(req, res, next){
	var id = req.params.eventid
	console.log("ID sent is " + id)
	Summary.find({"event":mongoose.Types.ObjectId(id)}, function(err, summaries){
      	  if (err){
      	  	return next(err)
      	  }
	  res.contentType('application/json')
	  console.log(summaries)
	  console.log(JSON.stringify(summaries))
	  res.send(JSON.stringify(summaries))
	})
})


app.get('/api/event/:userid', function(req, res, next){
	var id = req.params.userid
	console.log("ID sent is " + id)
	Event.find({"participants":mongoose.Types.ObjectId(id)}, function(err, events){
      	  if (err){
      	  	return next(err)
      	  }
	  res.contentType('application/json')
	  console.log(events)
	  console.log(JSON.stringify(events))
	  res.send(JSON.stringify(events))
	})
})

app.get('/api/expense/:eventid', function(req, res, next){
	var id = req.params.eventid
	console.log("event ID sent is " + id)
	Expense.find({"event":mongoose.Types.ObjectId(id)}, function(err, events){
      	  if (err){
      	  	return next(err)
      	  }
	  res.contentType('application/json')
	  console.log(events)
	  console.log(JSON.stringify(events))
	  res.send(JSON.stringify(events))
	})
})

app.get('/api/user/:countrycode/:phone', function (req, res, next) {
	console.log('get user request received!')
	var code = req.params.countrycode
	var phone = req.params.phone
	console.log(code +"-" + phone)
	Participant.find({"countrycode":code, "phone":phone}, '_id', function(err, participant){
            	  if (err){
            	  	return next(err)
            	  }
		  res.contentType('application/json')
		  console.log(JSON.stringify(participant))
		  res.send(JSON.stringify(participant))
	})
})

app.post('/api/user/add', function (req, res, next) {
  console.log('add user request received!')
  console.log(req.body.name)
  var user = new Participant({
	  name: req.body.name,
	  phone: req.body.phone,
	  countrycode: req.body.countrycode
  })
  user.save(function(err, event){
	  if (err){
	  	return next(err)
	  }
	  res.send({
		  "userid":user.id
	  })
  })
})

app.post('/api/event/add', function (req, res, next) {
  console.log('add event request received!')
  console.log(req.body.name)
  var event = new Event({
	  name:req.body.name,
	  created: new Date(),
	  participants: req.body.participants
  })
  event.save(function(err, event){
	  if (err){
	  	return next(err)
	  }
	  res.send({
		  "eventid":event.id
	  })
  })
})

app.post('/api/expense/add', function (req, res, next) {
  console.log('add expense request received!')
  console.log(req.body.description)
  var participantids = req.body.participants	
  var eventid = req.body.event	
  var desc = req.body.description
  var expense = new Expense({
	  description: desc,
	  amount: req.body.amount,
	  event: eventid,
	  spender: req.body.spender,
	  creator: req.body.creator,
	  created: new Date(),
	  participants: participantids
  })
  expense.save(function(err, event){
	  if (err){
	  	return next(err)
	  }
	  else{
		  console.log('updating summary for event id: ' + eventid + 'with expense: ' + desc)
		  for (i = 0; i <  participantids.length; i++){
			var p = participantids[i]
			var condition = { event: req.body.event, participant: p }
			var update = { $inc: { balance: req.body.amount}, $currentDate: { updated: {$type: "date"}}}
			Summary.update(condition, update, {upsert: true}, updateSummaryCallback)
		  }//increase the liability of participants
		  var condition = { event: req.body.event, participant: req.body.spender }
		  var update = { $inc: { balance: req.body.amount*(-1)}, $currentDate: { updated: {$type: "date"}}}
		  Summary.update(condition, update, {upsert: true}, updateSummaryCallback)
		  res.send({
			  "expenseid":expense.id
		  })
	  }
  })
})

function updateSummaryCallback (err, numAffected) {
  // numAffected is the number of updated documents
	console.log('the number of updated documents is ' + numAffected)
}

app.listen(3000, function () {
  console.log('Server listening on', 3000)
})
