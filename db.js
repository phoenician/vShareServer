var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/vsharedb', function(){
	console.log('connected to vsharedb on mongo')
}) 
module.exports = mongoose
