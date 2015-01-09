var db = require('../db')

var Participant = db.model('Participant', {
	name: {type: String, required: true},
	phone: {type: String, required: true},
	countrycode: {type: String, required: true}
})

module.exports = Participant