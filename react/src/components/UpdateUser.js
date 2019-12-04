import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Section, Heading, Card, Columns, Container } from "react-bulma-components";

import {flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import Swal from "sweetalert2";
//mutations
import { updateUserMutation} from "../queries/mutations";

//queries
import { getDatesQuery, getUsersQuery, getUserQuery } from "../queries/queries";

const UpdateMember = props => {
	console.log(props);


	let id = props.match.params.id;

	useEffect(()=>{
		console.log("firstName: " + firstName);
		console.log("lastName: " + lastName);
		console.log("position: " + position);
		console.log("team: " + teamId);

	})

	const member = props.getMemberQuery.getMember ? props.getMemberQuery.getMember : {};
	console.log(member.teamId);
	//hooks
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	
	if (!props.getUserQuery.loading) {
		const setDefaultValues = () => {

			setFirstName(member.firstName);
			setLastName(member.lastName);
			setPosition(member.position);
		};

		if (teamId === "") {
			setDefaultValues();
			console.log("teamId value after setDefault: " + teamId);
		}
	}


	// let member = props.getMembersQuery.getMember ? props.getMembersQuery.getMember :[];
	// console.log(member.id);

	const firstNameChangeHandler = e => {
		setFirstName(e.target.value);


	};

	const lastNameChangeHandler = e => {
		setLastName(e.target.value);
	};

	const positionChangeHandler = e => {
		setPosition(e.target.value);
	};
	const teamChangeHandler = e => {
		setTeamId(e.target.value);
	};

	const formSubmitHandler = e => {
		

		e.preventDefault();
		let updatedMember = {
			id:id,
			firstName: firstName,
			lastName: lastName,
			position:position,
			teamId: teamId
		};
		console.log(updatedMember);

		props.updateMemberMutation({

			variables : updatedMember
		

		});

		Swal.fire({
			title: "member Updated",
			text: "member has been updated",
			type: "success",
			html: 
			'<a href="/" class="button is-success">Go back to members </a>',
			showCancelButton: false,			  
			showConfirmButton: false,			  
		});



		
	};



	const teamOptions=()=> {
	console.log(props);
	let teamData = props.getTeamsQuery;
	if(teamData.loading){
		return<option>Loading Teams..</option>

	}else {
		return teamData.getTeams.map(team =>{
			console.log(team);
			return(
					<option
						key={team.id}
						value={team.id}
						selected={team.id === teamId ? true : false}
					>
						{team.name}
					</option>
				)
		});
	}
}
	return(
		<Container><Columns>
			<Columns.Column size="half" offset="one-quarter">
			<Heading>Update Member</Heading>
			<Card>
				<Card.Header.Title>
					Member Details
				</Card.Header.Title>
				<Card.Content>
					<form onSubmit={formSubmitHandler}>
						<label className="label" htmlFor="firstName">
						Firstname
						</label>
						<input type="text"
						 onChange={firstNameChangeHandler}
						 value={firstName}
						
						 className="input" />

						 <label className="label" htmlFor="firstName">
						Lastname
						</label>
						<input type="text"
						 onChange={lastNameChangeHandler}
						 value={lastName}
						  className="input" />

						  <label className="label" htmlFor="firstName">
						Position
						</label>
						<input type="text"
						 onChange={positionChangeHandler}
						value={position}
						 className="input" />

						 <label className="label" htmlFor="firstName">
						Team Name
						</label>
						<div className="select is-fullwidth">
						<select onChange={teamChangeHandler}>{teamOptions()}</select>
						</div>
						<button type="submit" className="button is-success is-fullwidth	">
						Update Member
						</button>
						<Link to ="/">
						<button type="button"
						className="button is-danger is-fullwidth">Cancel</button>
						</Link>

					</form>
				</Card.Content>
			</Card>
			 </Columns.Column>
		</Columns></Container>
		);
};


export default compose(
	graphql(getUsersQuery, { name: "getUsersQuery" }),
	graphql(updateUserMutation, { name: "updateUserMutation" }),
	graphql(getUserQuery, {
		options: props => {
			// retrieve the wildcard id param
			console.log(props.match.params.id);
			return {
				variables: {
					id: props.match.params.id
				}
			};
		},
		name: "getUsersQuery"
	})
)(UpdateUser);
