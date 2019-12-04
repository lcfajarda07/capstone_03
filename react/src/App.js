

import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "react-bulma-components/dist/react-bulma-components.min.css";
import { Button, Box } from "react-bulma-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost"; //siya maglilink sa backend
import {ApolloProvider} from "react-apollo";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

//components
import User from "./components/User";
import Singer from "./components/Singer";
import Date from "./components/Date";
import NavBar from "./components/Navbar";
import Index from "./components/Index";
import Booking from "./components/Booking";






//create an istance to all our GraphQL components
const client = new ApolloClient({uri: " http://localhost:5000/graphql"});

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <NavBar/>
      <Switch>
         <Route exact path="/user" component={User} />
         <Route exact path="/" component={Index} />
         <Route exact path="/singer" component={Singer} />
         <Route exact path="/date" component={Date} />
         <Route exact path="/booking/:id" component={Booking} />
      <User/>
      </Switch>
    </BrowserRouter>
    </ApolloProvider>
  );
}
export default App;
