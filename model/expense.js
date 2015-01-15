var db = require('../db')
var Schema = db.Schema

var Expense = db.model('Expense', {
	description: {type: String, required: true},
	amount: {type: String, required: true},
	event: {type: Schema.Types.ObjectId, required: true},
	//spender: {type: Schema.Types.ObjectId, required: true},
	creator: {type: Schema.Types.ObjectId, required: true},
	created: {type: Date, required: true},
	spenders:[{id:Schema.Types.ObjectId,
	           share: String}],
	sharers: [{id:Schema.Types.ObjectId,
		         share: String}]
	//participants: [Schema.Types.ObjectId]
})
module.exports = Expense
