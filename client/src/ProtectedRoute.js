import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }) {
	return isAuthenticated ? (
		<Component {...rest} />
	) : (
		<Redirect to={{ pathname: "/" }} />
	);
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
	};
};

export default connect(mapStateToProps)(ProtectedRoute);
