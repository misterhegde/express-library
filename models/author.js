var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
					first_name:{type: String, required: true, maxlength: 100},
					family_name: {type: String, required: true, maxlength: 100},
					date_of_birth: {type: Date},
					date_of_death: {type: Date} 
					});

AuthorSchema.virtual('name').get(function(){
	var fullName = '';
	if(this.first_name && this.family_name){
	fullName = this.family_name + "," + this.first_name;
	}
	if(!this.family_name || !this.first_name){
	fullName = '';
	}
	
	return fullName;

	});
	
// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  return  moment(this.date_of_death.getYear()).format('MMMM Do, YYYY') - moment(this.date_of_birth.getYear()).format('MMMM Do, YYYY');
 
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);