import React,{ useState,useEffect } from "react";
import { Container, Columns, Card, Button } from "react-bulma-components";
import { Link } from "react-router-dom";
import {flowRight as compose } from "lodash";
import { graphql } from "react-apollo";
import { createSingerMutation, deleteSingerMutation } from "../queries/mutations";
import { getSingersQuery ,getDatesQuery} from "../queries/queries";
import Swal from "sweetalert2";


const Singer = props => {
	console.log(props);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [dateId, setDateId] = useState("");


	const nameChangeHandler = e => {
		setName(e.target.value);
	};

	const descriptionChangeHandler = e => {
	setDescription(e.target.value);

	};

	const dateIdChangeHandler = e => {
	setDateId(e.target.value);

	};

	const deleteSingerHandler = e => {
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

			props.deleteSingerMutation({
			variables: {id : id},
			refetchQueries: [{
				query: getSingersQuery
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
	useEffect(()=> {
		console.log(name);
		console.log(description);
		console.log(dateId);

	});

	const data = props.data;
	const singerData = props.getSingersQuery.getSingers ? props.getSingersQuery.getSingers: [];
	


	const dateOptions=()=> {
		console.log(props);
		let dateData = props.getDatesQuery;
		if(dateData.loading){
			return<option>Loading Dates..</option>

		}else {
			return dateData.getDates.map(date =>{
				console.log(date);
				return(
					<option key={date.id} value={date.id}>{date.name}</option>
					)
			});
		}
	}



	const addSinger = e => {

		Swal.fire({
		  position: 'top-end',
		  icon: 'success',
		  title: 'Singer Added',
		  showConfirmButton: false,
		  timer: 2500
		})

		e.preventDefault();
		let newSinger = {
			name: name,
			description: description,
			dateId:dateId
		};
		console.log(newSinger);

		props.createSingerMutation({


			variables : newSinger,
			refetchQueries: [{
				query: getSingersQuery
			}]

		});
		setName("");
		setDescription("");
		setDateId("");
	};
	return (
	<Container>
			<Columns size>
			
				<Columns.Column size={9}>
					<Card>
						<Card.Header>
							<Card.Header.Title>Singers List</Card.Header.Title>
						</Card.Header>

						<Card.Content>
							<div className="table is-fullwidth is-bordered">
								<table className="table is-fullwidth is-bordered">
								{/*loadingMessage*/}
									<thead>
										<th>Name</th>
										<th>Description</th>
										<th>Available Date</th>
										<th>Action</th>

									</thead>
									<tbody>
									{singerData.map(singer =>{
										let date =singer.date;
										return(
										<tr>
											<td>{singer.name}</td>
											<td>{singer.description}</td>
											<td>{date? date.name : "unassigned"}</td>
											<td>
											<Link>
												<Button color="dark" fullwidth>
													Update
												</Button>
											</Link>
												<Button
													id={singer.id}
													onClick={deleteSingerHandler}
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
							<Card.Header.Title>Add Singer</Card.Header.Title>
						</Card.Header>

						<Card.Content>
							<form onSubmit={addSinger}>
	-							<div className="field">
									<label className="label" htmlFor="name">
										Name
									</label>
									<input
										id="name"
										className="input"
										type="text"
										onChange={nameChangeHandler}
										value={name}
										
									/>
								</div>

								<div className="field">
									<label className="label" htmlFor="description">
										Description
									</label>
									<input
										id="description"
										className="input"
										type="text"
										onChange={descriptionChangeHandler}
										value={description}
										
										
									/>
								</div>

									<div className="field">
									<label className="label" htmlFor="teamName">
										Dates
									</label>
									<div className="control">
										<div className="select is-fullwidth">
											<select
											onChange={dateIdChangeHandler}>
											<option disabled selected>Select dates</option>
												{dateOptions()}
											</select>
										</div>
									</div>
								</div>

								<Button
									type="submit"
									color="dark"
									fullwidth={true}
								>
									Add new member
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
	graphql(createSingerMutation, { name: "createSingerMutation"}),
	graphql(deleteSingerMutation, { name: "deleteSingerMutation"}),
	graphql(getSingersQuery,{ name: "getSingersQuery"}),
	graphql(getDatesQuery,{ name: "getDatesQuery"})
	)(Singer);


