import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Message, Radio, Grid, Header, Form, Button } from "semantic-ui-react";
import { v4 } from "uuid";
import { addTransaction } from "../Redux/actions/ActionCreators";

const Error = () => (
	<Message negative>
		<Message.Header>Please Enter all the details!!</Message.Header>
	</Message>
);

function FormTransaction({ addTransaction }) {
	const [amount, setAmount] = useState(0);
	const [title, setTitle] = useState("");
	const [amountType, setAmountType] = useState("Income");

	const [error, setError] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 6000);
  }, [error, setError])

	function handleRadio(e, { value }) {
		setAmountType(value);

		if (value === "Income") {
			setAmount(Math.abs(amount));
		} else {
			setAmount(Math.abs(amount) * -1);
		}
	}

	function handleAddTransaction(e) {
		if (title === "") {
			setError(true);
		} else {
			setError(false);
			const transaction = {
				_id: v4(),
				title,
				amount,
			};

			addTransaction(transaction);
		}

		setAmount(0);
		setTitle("");
		setAmountType("Income");
	}

	return (
		<>
			<Header as="h2" color="blue">
				Add Transaction
			</Header>
			<Form>
				<Form.Field>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<label htmlFor="title">Amount</label>
					<input
						type="number"
						value={amount}
						onChange={(e) => setAmount(+e.target.value)}
					/>
				</Form.Field>
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

				{error && <Error />}

				<Button
					primary
					fluid
					style={{ marginTop: "2rem" }}
					onClick={handleAddTransaction}
				>
					Add Transaction
				</Button>
			</Form>
		</>
	);
}

export default connect(null, { addTransaction })(FormTransaction);
