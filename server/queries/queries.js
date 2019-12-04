const {ApolloServer, gql} = require("apollo-server-express");
const { GraphQLDateTime } = require("graphql-iso-date");
// const bcrypt = require("bcrypt");
//mongoose models
const Date = require("../models/Date");	 
const Singer = require("../models/Singer");	 
const User = require("../models/User");


//CRUD
// type Query == Retrieve/ Read
// type Mutation == Create/ Update/Delete
//resolver for date schema to be able to handle date data types
const CustomScalarResolver = {
	Date : GraphQLDateTime
};


const typeDefs = gql`
	#this is a comment
	#the type Query is the root of all GraphQL queries
	#this is used for executing "GET" requests

	scalar Date

	type DateType{
		id : ID
		name: String
		createdAt : Date
		updatedAt : Date
		
		

	}

	type SingerType{
		id: ID
		name: String
		description: String
		dateId: String
		createdAt : Date
		updatedAt : Date
		date: DateType

	}

	type UserType{
		id: ID!
		firstName: String
		lastName: String
		address: String
		singerId: String
		username: String
	    password : String
		createdAt : Date
		updatedAt : Date
		singer: SingerType
		
	}
	

	type Query {
		#create a query called hello that will expect a 
		#string data type 
		hello : String
		getDates : [DateType]
		getSingers : [SingerType]
		getUsers: [UserType]

		getDate(id: ID!) : DateType  
		getSinger(id: ID) : SingerType
		getUser(id: ID) : UserType
		
	}

	#CUD functionality
	#we are mutating the server/database
	type Mutation {

		createDate(name: String

		) : DateType


		createSinger(
		name: String
		 description: String
		 dateId: String
		 ) : SingerType

		 createUser(
		 firstName: String
		 lastName: String
		 singerId: String
		 address: String
		 username: String
		 password: String
		 ) :UserType


		 updateDate(
		 	id : ID
		 	name: String
		 	
		 ) : DateType


		  updateSinger(
		 	id: ID
		 	name: String
			description: String
			dateId: String
		 ) : SingerType

		 updateUser(
		 	id:ID
		 	firstName: String
		 	lastName: String
		 	singerId: String
		 	address: String
		 	username: String
		 	password: String
		 ) : UserType


		 deleteDate(id: String): Boolean

		 deleteSinger(id: String): Boolean

		 deleteUser(id: String): Boolean

		 logInMember(
			username : String,
			password: String
		): UserType
	}
`;	 

const resolvers = {
	//what are we going to do when the query is executed
	Query : {
		hello : () => "my first query",
  		
  		getDates : () => {
  			return Date.find({})
  		},
  		getSingers : () => {
  			return Singer.find({})
  		},
  		getUsers: () => {
  			return User.find({})
  		},

  		getUser: (_,args) => {
  			console.log("nagexecute ka ng getMember query")
  			console.log(args)
  			return User.findById(args.id)

  		},
  		getDate: (parent,args) => {
  			console.log(args)
  			console.log("hoy nag getTeam query ka")
  			// return Team.findById(args.id)
  			return Date.findOne({_id : args.id })
  		},
  		getSinger: (parent,args) => {
  			return Singer.findById(args.id)
  			// return Task.findOne({_id : args.id })
  		}


	},

	Mutation : {
		createDate : (_,args) => {
			console.log(args)
			let newDate = Date({
				name : args.name
				
			})
			console.log(newDate)
			return newDate.save()
		},

		createSinger : (_,args) => {
			console.log(args)
			let newSinger = Singer({
				name : args.name,
				description : args.description,
				dateId: args.dateId
			})
			console.log(newSinger)
			return newSinger.save()
		},

		createUser : (_,args) => {
			console.log(args)
			let newUser = User({
				firstName : args.firstName,
				lastName : args.lastName,
				address : args.address,
				singerId : args.singerId,
				username: args.username,
				//bycript.hashSync( plain password, # of salt rounds )
				password: args.password
				 // bcrypt.hashSync(args.password, 10)
			})
			console.log(newUser)
			return newUser.save()
		},


		updateDate: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
			 name : args.name
			
			}
			// findOneAndUpdate(condition, updates)

			return Date.findOneAndUpdate(condition,updates)
	
		},

		updateSinger: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = {
				name : args.name ,
				description : args.description,
				 dateId : args.dateId}


				return Singer.findOneAndUpdate(condition,updates)
			},
			// findOneAndUpdate(condition, updates)
				


			updateUser: (_, args) => { 
			// findOneAndUpdate(condition, update, callback dunction)
			let condition = {_id: args.id };
			let updates = { 
				firstName : args.firstName,
				lastName: args.lastName,
				address: args.address,
				singerId: args.singerId,
				username: args.username,
				password: args.password

			}


				return User.findOneAndUpdate(condition,updates)
			

		},


		
		deleteUser : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return User.findByIdAndDelete(condition)
			.then ((user, err)=>{
				console.log(err);
				console.log(user);
				if (err || !user){
					console.log("delete failed. no user found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

		deleteSinger : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Singer.findByIdAndDelete(condition)
			.then ((singer, err)=>{
				console.log(err);
				console.log(singer);
				if (err || !singer){
					console.log("delete failed. no user found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

		deleteDate : (_, args)=>{
			console.log(args.id);
			let condition = args.id;

			return Date.findByIdAndDelete(condition)
			.then ((date, err)=>{
				console.log(err);
				console.log(date);
				if (err || !date){
					console.log("delete failed. no date found");
					return false;
				}
				console.log("deleted");
				return true;
			});

		},

		// logInMember : (parent, args) => {
		// 	console.log("Try to login...");
		// 	console.log(args);

		// 	//returns the member in our member collection
		// 	// with the same value as args.firstName
		// 	return Member.findOne({username : args.username })
		// 	.then(member => {
		// 		console.log(member.password)

		// 		if(member == null) {
		// 			console.log("member not null");
		// 			return null;

		// 			console.log(member.password);
		// 			console.log(args.password);

		// 		}
		// 		// if(member.password === args.password){
		// 		// 	console.log("succesful login");
		// 		// }

		// 		// compare the hash version of args.password 
		// 		// with member.password(already hashed)
		// 		// sync : bcrypt.compareSync(plains_pass, hashed_pass)

		// 		let hashedPassword = bcrypt.compareSync(
		// 			args.password,
		// 			member.password
		// 			);
		// 		console.log(hashedPassword);

		// 		if(!hashedPassword){
		// 			console.log("wrong password")
		// 			return null;
		// 		}

		// 		else {
		// 			console.log(member);
		// 			return member;
		// 		}


		// 	});
		// }

	},

	// custom type resolver
	//custom Team type resolver
	// TeamType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	tasks : (parent, args) => {
	// 		// console.log("getting the task assigned for this team")
	// 		console.log(parent.id)
	// 			return Task.find({ teamId : parent.id })
	// 	}
	// 	// items : (parent, args) => {
	// 	// 	// console.log("getting the task assigned for this team")
	// 	// 	console.log(parent.id)
	// 	// 		return Items.find({ teamId : parent.id })
	// 	// }

	// },

	// DateType : {
	// 	// declare a resolver for the tasks field inside TeamType
	// 	singer : (parent, args) => {
	// 		// console.log("getting the team assigned for this team")
	// 		// console.log(parent.id)
			
	// 			return Date.findOne({ _id : parent.Id })

	// 	}
	// },



	SingerType : {
		// declare a resolver for the tasks field inside TeamType
		date : (parent, args) => {
			console.log("getting the date assigned for this singer")
			console.log(parent.id)
			
				return Date.findOne({ _id : parent.dateId })

		}
	},

		UserType : {
		// declare a resolver for the tasks field inside TeamType
		singer : (parent, args) => {
			console.log("getting the singer assigned for this user")
			console.log(parent.id)
			
				return Singer.findOne({ _id : parent.singerId })

		}
	}


}




//create an instance of the apollo server
//In the most basic sense, the ApolloServer can be started
//by passing schema type defiitions(typeDefs) and the
//resolvers responsible for fetching the data for the declared
//requests/queries

const server = new ApolloServer({
	typeDefs,
	resolvers
})

module.exports = server;