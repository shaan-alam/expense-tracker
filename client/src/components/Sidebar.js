import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { logout } from "../Redux/actions/AuthActions";

function Sidebar({ sidebarIsOpen, setSidebarIsOpen, logout, history }) {
	// logout function
	function handleLogout(e) {

		e.preventDefault();

		// logout
		logout();

		// redirect to login page
		history.push("/");
	}

	return (
		<aside className={`${sidebarIsOpen ? "active" : ""}`}>
			<div>
				<a href="#!" class="bars-close" onClick={() => setSidebarIsOpen(false)}>
					<i class="fa fa-times" aria-hidden="true"></i>
				</a>
				<ul>
					<p>Menu</p>
					<li>
						<Link to="/home">
							<i class="fa fa-home" aria-hidden="true"></i>
						</Link>
					</li>					
					<li>
						<a href="#!">
							<i class="fa fa-cog" aria-hidden="true"></i>
						</a>
					</li>
					<li>
						<Link to="/" onClick={handleLogout}>
							<i class="fa fa-sign-out" aria-hidden="true"></i>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
}

export default withRouter(connect(null, { logout })(Sidebar));
