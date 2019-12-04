import {gql} from "apollo-boost";


const createUserMutation = gql`

mutation(
	$firstName : String
	$lastName : String
	$address : String
  $singerId : String
  $username : String
	$password: String
	) {
  createUser (
  	firstName : $firstName 
    lastName : $lastName
  	address : $address
    singerId: $singerId
  	username: $username
  	password : $password
  	){
    firstName
    lastName
    address
    singerId
    username
    password
  }
}
`;
export {createUserMutation};

const createDateMutation = gql`

mutation(
  $name : String

  
  ) {
  createDate (
    name : $name
    
    ){
    name
  }
}
`;
export {createDateMutation};

const createSingerMutation = gql`

mutation(
  $name : String
  $description : String
  $dateId : String

  
  ) {
  createSinger (
    name : $name
    description : $description
    dateId : $dateId
    
    ){
    name
    description
    dateId
  }
}
`;
export {createSingerMutation};

const deleteUserMutation = gql`

mutation(
  $id : String
  ) {
  deleteUser(
    id : $id
  
    )
}
`;
export {deleteUserMutation};

const deleteDateMutation = gql`
mutation(
$id : String
){
  deleteDate(

  id : $id

  )
}
`;
export {deleteDateMutation};

const deleteSingerMutation = gql`
mutation(
$id : String
){
  deleteSinger(

  id : $id

  )
}
`;
export {deleteSingerMutation};

const updateUserMutation =gql`
mutation($id : ID
 $firstName : String
 $lastName: String
 $address: String
 $username: String
 $password: String
 ){
  updateMember(
  id: $id
  firstName: $firstName
  lastName: $lastName
  address: $address
  username: $username
  password: $password
  ){
    id
    firstName
    lastName
    address
    username
    password
  }
 }

`;
export {updateUserMutation};