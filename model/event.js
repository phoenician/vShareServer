var db = require('../db')
var Schema = db.Schema
	
var Event = db.model('Event', {
	name: {type: String, required: true},
	created: {type: Date, required: true},
	participants: [Schema.Types.ObjectId]
})
module.exports = Event