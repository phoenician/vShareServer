var db = require('../db')
var Schema = db.Schema
	
var Summary = db.model('Summary', {
	event: {type: Schema.Types.ObjectId, required: true},
	updated: {type: Date, required: true},
	participant: {type: Schema.Types.ObjectId, required: true}, 
	balance: {type: Number, required: true}
})
module.exports = Summary