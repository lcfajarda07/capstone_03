const express =require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect(
	"mongodb+srv://lcfajarda:FLxFKGWK9l0RyCvx@myfirstmongodb-5hvah.mongodb.net/capstone_3?retryWrites=true&w=majority", {
	useNewUrlParser:true
})

mongoose.connection.once("open", ()=>{
	console.log("Now connected to the Mongodb server")
})
const server = require("./queries/queries")

server.applyMiddleware({ app })

//server initialization


app.listen(5000, ()=> {
	console.log(`🚀  Server ready at http://localhost:5000${server.graphqlPath}`);
})

