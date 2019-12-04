import React,{useEffect,useState} from "react";
import { Container, Columns, Card, Button } from "react-bulma-components";
import { Link } from "react-router-dom";
import {flowRight as compose } from "lodash";
import Swal from "sweetalert2";
import { graphql } from "react-apollo";

import {getUsersQuery,getSingersQuery} from "../queries/queries";

import { createUserMutation ,deleteUserMutation} from "../queries/mutations";

const User = props => {


	const [firstName, setfirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [address, setaddress] = useState("");
	const [singerId, setSingerId] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");


	useEffect(()=> {
		console.log(lastName);
		console.log(firstName);
		console.log(address);
		console.log(singerId);
		console.log(username);
		console.log(password);
	
	});

	const firstNameChangeHandler = e => {
		console.log(e.target.value);
		setfirstName(e.target.value);
	};
	const lastNameChangeHandler = e => {
		console.log(e.target.value);
		setlastName(e.target.value);
	};
	const addressChangeHandler = e => {
		console.log(e.target.value);
		setaddress(e.target.value);
	};
	const usernameChangeHandler = e => {
		setUsername(e.target.value);
	};
	const passwordChangeHandler = e => {
		setPassword(e.target.value);
	};
	const singerIdChangeHandler = e => {
	setSingerId(e.target.value);

	};
	const deleteUserHandler = e => {
		console.log("delete");
	let id=e.target.id;
	
			  Swal.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to revert this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
			  if (result.value) {

			props.deleteUserMutation({
			variables: {id : id},
			refetchQueries: [{
				query: getUsersQuery
			}]
		})

			    Swal.fire(
			      'Deleted!',
			      'Your file has been deleted.',
			      'success'
			    )
			  }
			})

	};
	const addUser = e => {

		Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'User Added',
		  showConfirmButton: false,
		  timer: 2500
		})

		e.preventDefault();
		let newUser = {
			firstName: firstName,
			lastName: lastName,
			address:address,
			singerId:singerId,
			username:username,
			password:password
		};
		console.log(newUser);

		props.createUserMutation({


			variables : newUser,
			refetchQueries: [{
				query: getUsersQuery
			}]

		});
		setfirstName("");
		setlastName("");
		setaddress("");
		setUsername("");
		setPassword("");
	};
	const data = props.data;
	const userData = props.getUsersQuery.getUsers ? props.getUsersQuery.getUsers: [];
	console.log(props);


	const singerOptions=()=> {
		console.log(props);
		let singerData = props.getSingersQuery;
		if(singerData.loading){
			return<option>Loading Singers..</option>

		}else {
			return singerData.getSingers.map(singer =>{
				console.log(singer);
				return(
					<option key={singer.id} value={singer.id}>{singer.name}</option>
					)
			});
		}
	}
	return (
	<Container>
			<Columns size>

				<Columns.Column size={9}>
					<Card>
						<Card.Header>
							<Card.Header.Title>Users List</Card.Header.Title>
						</Card.Header>

						<Card.Content>
							<div className="table is-fullwidth is-bordered">
								<table className="table is-fullwidth is-bordered">
								{/*loadingMessage*/}
									<thead>
										<th>First Name</th>
										<th>Last Name</th>
										<th>Address</th>
										<th>Singers</th>
										<th>Action</th>
									</thead>
									<tbody>
									{userData.map(user =>{
										let singer =user.singer;
										return(
										<tr>
											<td>{user.firstName}</td>
											<td>{user.lastName}</td>
											<td>{user.address}</td>
											<td>{singer?singer.name : "unassigned"}</td>
											<td>
										
											
											<Link>
												<Button color="dark" fullwidth>
													Update
												</Button>
											</Link>
													<Button
													id={user.id}
													onClick={deleteUserHandler}
													color="primary"
													fullwidth
												>
													Delete
												</Button>
											</td>
										</tr>
										);
								 	})}
									</tbody>
								</table>
							</div>
						</Card.Content>
					</Card>
				</Columns.Column>
								<Columns.Column size={3}>
					<Card>
						<Card.Header>
							<Card.Header.Title>Add User</Card.Header.Title>
						</Card.Header>

						<Card.Content>
							<form onSubmit={addUser}>
								<div className="field">
									<label className="label" htmlFor="fName">
										First Name
									</label>
									<input
										id="fName"
										className="input"
										type="text"
										onChange={firstNameChangeHandler}
										value={firstName}
										
									/>
								</div>

								<div className="field">
									<label className="label" htmlFor="lName">
										Last Name
									</label>
									<input
										id="lName"
										className="input"
										type="text"
										onChange={lastNameChangeHandler}
										value={lastName}
										
										
										
									/>
								</div>

								<div className="field">
									<label className="label" htmlFor="address">
										Address
									</label>
									<input
										id="address"
										className="input"
										type="text"
										onChange={addressChangeHandler}
										value={address}
									/>
								</div>
							
									<div className="field">
									<label className="label" htmlFor="teamName">
										Singers
									</label>
									<div className="control">
										<div className="select is-fullwidth">
											<select
											onChange={singerIdChangeHandler}>
											<option disabled selected>Select singer</option>
												{singerOptions()}
											</select>
										</div>
									</div>
								</div>

								<div className="field">
									<label className="label" htmlFor="username">
									Username
									</label>
									<input
										id="username"
										className="input"
										type="text"
										onChange={usernameChangeHandler}
										value={username}
										/>
								</div>


								<label className="label" htmlFor="password">
									password
									</label>
								<input
								id="password"
								className="input"
								type="password"
								onChange={passwordChangeHandler}
								value={password}
										
									/>
								<Button
									type="submit"
									color="dark"
									fullwidth={true}
								>
									Add new user
								</Button>
							</form>
						</Card.Content>
					</Card>
				</Columns.Column>
			</Columns>
		</Container>
	);
};

export default compose(
	graphql(createUserMutation, { name: "createUserMutation"}),
	graphql(deleteUserMutation, { name: "deleteUserMutation"}),
	graphql(getUsersQuery,{ name: "getUsersQuery"}),
	graphql(getSingersQuery,{ name: "getSingersQuery"})
	)(User);

