import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./components/Home";

import ProtectedRoute from "./ProtectedRoute";
import Register from "./components/auth/Register";


const App = () => {
	

	return (
		<>
		
			<Switch>
				<Route path="/" component={Login} exact />
				<Route path="/register" component={Register} exact />
				<ProtectedRoute path="/home" component={Home} />
			</Switch>
		</>
	);
};

export default App;
