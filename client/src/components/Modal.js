import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Grid, Radio, Form } from "semantic-ui-react";
import Alert from "./Alert";
import { connect } from "react-redux";
import { addTransaction } from "../Redux/actions/ActionCreators";

function Modal({ isModalOpen, addTransaction, setIsModalOpen }) {
	const [amount, setAmount] = useState(0);
	const [title, setTitle] = useState("");
	const [amountType, setAmountType] = useState("Income");

	const [error, setError] = useState(false);

	function handleClick(e) {
		if (e.target.classList.contains("modal-bg")) {
			// clear state
			setTitle("");
			setAmount(0);
			setError("");

			// close modal
			setIsModalOpen(false);
		}
	}

	function handleRadio(e, { value }) {
		setAmountType(value);

		if (value === "Income") {
			setAmount(Math.abs(amount));
		} else {
			setAmount(Math.abs(amount) * -1);
		}
	}

	// add transaction to DB
	function handleAddTransaction(e) {
		e.preventDefault();

		if (title === "" || amount === null) {
			// if fields are empty
			setError(true);
		} else {
			setError(false);

			// new transaction
			const transaction = {
				title,
				amount,
			};

			// add transaction
			addTransaction(transaction);
		}

		// clear modal state and close modal
		setAmount(0);
		setTitle("");
		setAmountType("Income");
		setIsModalOpen(false);
	}

	return ReactDOM.createPortal(
		<div
			className={`modal-bg ${isModalOpen ? "active" : ""}`}
			onClick={handleClick}
		>
			<div className="modal-content">
				<a
					href="#!"
					onClick={() => setIsModalOpen(false)}
					className="close-modal"
				>
					<i class="fa fa-times" aria-hidden="true"></i>
				</a>
				<h1>New Transaction</h1>
				<form action="">
					<div className="form-group">
						<input
							type="text"
							placeholder="Title"
							className="form-control"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<input
							type="number"
							placeholder="amount"
							className="form-control"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
					</div>
					<Grid columns="2" textAlign="center">
						<Grid.Column>
							<Form.Field>
								<Radio
									label="Income"
									name="Income"
									value="Income"
									checked={amountType === "Income"}
									onChange={handleRadio}
								/>
							</Form.Field>
						</Grid.Column>
						<Grid.Column>
							<Form.Field>
								<Radio
									label="Expense"
									name="Expense"
									value="Expense"
									checked={amountType === "Expense"}
									onChange={handleRadio}
								/>
							</Form.Field>
						</Grid.Column>
					</Grid>
					<div className="form-group">
						<button
							onClick={handleAddTransaction}
							className="btn-primary btn-block"
						>
							Add
						</button>
					</div>
					{error && <Alert text="Please enter all the fields!" />}
				</form>
			</div>
		</div>,
		document.querySelector("#modal")
	);
}

export default connect(null, { addTransaction })(Modal);
