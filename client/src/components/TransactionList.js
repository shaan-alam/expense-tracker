import React from "react";
import Transaction from "./Transaction";
import { Segment, Dimmer, Loader, Message } from "semantic-ui-react";
import { connect } from "react-redux";

function TransactionList({ isLoading, transactions }) {
	if (isLoading === false && transactions.length === 0) { 
		return (
			<Message negative>
				<Message.Header>Empty!!</Message.Header>
				<p>No Transactions!!</p>
			</Message>
		);
	}

	if (isLoading) {
		return (
			<Segment style={{ height: "20vh" }}>
				<Dimmer active inverted>
					<Loader indeterminate>Preparing Files</Loader>
				</Dimmer>
			</Segment>
		);
	}

	return (
		<div class="transactions">
			<h1>Transactions</h1>

			<div class="transactions-block">
				{transactions.map((transaction) => (
					<Transaction transaction={transaction} key={transaction._id} />
				))}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		transactions: state.transactions.transactions,
		isLoading: state.transactions.isLoading,
	};
};

export default connect(mapStateToProps)(TransactionList);
