var mongoose = require('mongoose')
db_name = 'vsharedb'
//default for local development
mongodb_connection_string = 'mongodb://127.0.0.1/' + db_name;
//take advantage of openshift env vars when available:
if(process.env.OPENSHIFT_MONGODB_DB_URL){
	mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}

mongoose.connect(mongodb_connection_string, function(){
	console.log('connected to mongodb using url: ' + mongodb_connection_string)
})
module.exports = mongoose
