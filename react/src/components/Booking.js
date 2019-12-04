import React,{useState} from "react";
import logo from "./../logo.svg";
import { Table,Section,Container,Media,Heading,Content,Image, Columns, Card, Button } from "react-bulma-components";
import { getSingerQuery,getDatesQuery} from "../queries/queries";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";


const Booking = props => {
  console.log(props);
	const data = props.data;
	const singer = props.getSingerQuery.getSinger ? props.getSingerQuery.getSinger: [];
	const dateData = props.getDatesQuery.getDates ? props.getDatesQuery.getDates: [];

    const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  if (!props.getSingerQuery.loading) {
    const setDefaultValues = () => {
   
      setDescription(singer.description);
      setName(singer.name);
    
    };

    if (name === "") {
      setDefaultValues();
      console.log("teamId value after setDefault: " );
    }
  }
	return (

<div>
<Columns>
<Columns.Column>
   <Card id="projbook">
      <Card.Image size="4by3" src="http://bulma.io/images/placeholders/1280x960.png" />

        
      <Card.Content>
        <Media>
         <h3><strong>{singer.name}</strong></h3>
       
        </Media>
        <Content>

          {singer.description}
         
        </Content>
       
    
      
  
      </Card.Content>
    </Card>
    </Columns.Column>

    <Columns.Column>
    <div>
    <h1>Available Dates</h1>
    </div>

    <Table className="table is-bordered">
        <thead>
       </thead>
    <tbody>
      {dateData.map(date =>{
                    return(
        <tr class="hover">
            <td>{date.name}</td>
            
       </tr>
       );
    })}
    </tbody>
    </Table>
    </Columns.Column>
</Columns>
</div>
		);
};

export default compose(
  graphql(getDatesQuery,{ name: "getDatesQuery"}),
	graphql(getSingerQuery, {
    options: props => {
      // retrieve the wildcard id param
      console.log(props.match.params.id);
      return {
        variables: {
          id: props.match.params.id
        }
      };
    },
    name: "getSingerQuery"
  })
	)(Booking);

