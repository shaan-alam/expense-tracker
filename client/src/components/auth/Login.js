import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../Redux/actions/AuthActions";
import { withRouter, Link } from "react-router-dom";
import { clearError } from "../../Redux/actions/ErrorActions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Circles from "../../assets/img/second.svg";
import SemiCircle from "../../assets/img/first.svg";
import Dialoges from "../../assets/img/third.svg";
import Logo from "../../assets/img/logo.svg";
import Alert from "../Alert";


const Login = ({ history, login, errors, clearError }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleFormSubmission = (e) => {
		e.preventDefault();

		const config = { email, password };

		// redirect and clear errors
		const redirect = () => {
			// redirect
			history.push("/home");

			clearError();
		};

		// login the user
		login(config, redirect);
	};

	return (
		<section className="auth-section">
			<div className="auth-area">
				<div className="main">
					<header>
						<img src={Logo} alt="Logo" />
						<h1>Expense Tracker</h1>
					</header>
					<form action="">
						<div className="form-group">
							<input
								type="text"
								placeholder="Email"
								className="form-control"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<input
								type="password"
								placeholder="Password"
								className="form-control"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="form-group">
							<button className="btn-primary" onClick={handleFormSubmission}>
								LOGIN
							</button>
						</div>
						<small>
							Not a member yet? <Link to="/register">Create and account</Link>
						</small>
					</form>

					{errors.text && <Alert text={errors.text} />}
				</div>

				<p className="footer">
					Made with{" "}
					<span role="img" aria-label="emoji">
						{" "}
						❤️{" "}
					</span>
					by Shaan Alam
				</p>
			</div>

			<div className="hero">
				<img src={SemiCircle} alt="" />
				<img src={Circles} alt="" />
				<img src={Dialoges} alt="" />
			</div>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		errors: state.errors,
	};
};

export default withRouter(
	connect(mapStateToProps, { login, clearError })(Login)
);
