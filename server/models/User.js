const mongoose = require("mongoose")
const Schema = mongoose.Schema  //use mongoose's Schema as our basis

//Actual Schema
const userSchema = new Schema({
	name:{
		type: String,
		
	},

	firstName:{
		type: String
		
	},
	lastName :{
		type: String
		
	 },
	 address:{
		type: String
		
	},
	singerId:{
	type: String
		
	},
	 username:{
		type: String
		
	},password:{
		type: String
		
		}
	},
	{
		timestamps: true
})

//export the model as a module
module.exports = mongoose.model("User", userSchema);
//this creates a model called "task" using the schema "singerSchema" and exports it to be used by index.js

