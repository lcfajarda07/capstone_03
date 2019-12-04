import {gql} from "apollo-boost";
const getDatesQuery = gql`
{
  getDates{
      id
      name
     

  }
}
`;
export { getDatesQuery };

const getSingersQuery = gql`
{
  getSingers{
      id
      name
      description
      dateId
      date{
      	id
      	name
      }
     

  }
}
`;
export { getSingersQuery };


const getUsersQuery = gql`
{
  getUsers{
      id
      firstName
      lastName
      address
      singerId
      username
      password
         singer{
        id
        name
      }
     
     

  }
}
`;
export { getUsersQuery };


const getSingerQuery = gql`
query($id : ID!){
  getSinger(id: $id){
      id
      name
      description
      dateId

   
    
    }
  }
`;

export { getSingerQuery };