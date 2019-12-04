import React, { useState } from "react";
import { Navbar } from "react-bulma-components";
import { Link } from "react-router-dom";

const NavBar = props => {
	// const [open, setOpen] = useState(false);
	// let customLink = "";

	// if (!props.username) {
	// 	customLink = customLink = <Link className="navbar-item">Hi Guest</Link>;
	// } else {
	// 	customLink = (
	// 		<Link className="navbar-item"> Hi, </Link>
	// 	);
	// }
	return (
		<Navbar id="nav" color="black" >
			<Navbar.Brand>
				<Link to="/" className="navbar-item">
					<strong>LCF Book Event Singers Online</strong>
				</Link>

				<Navbar.Burger/>
			</Navbar.Brand>

			<Navbar.Menu>
				<Navbar.Container position="end">
					<Link className="navbar-item" to="/user">
						users
					</Link>
					<Link className="navbar-item" to="/singer">
						Singers
					</Link>
					<Link className="navbar-item" to="/date">
						Dates
					</Link>
					<Link className="navbar-item" to="/login">
						Login
					</Link>

				
				</Navbar.Container>
			</Navbar.Menu>
		</Navbar>
	);
};
export default NavBar;
