import React from "react";
import { connect } from "react-redux";

const calculateIncome = (transactions) => {
	const income = transactions.filter((transaction) => transaction.amount > 0);

	let sum = 0;
	income.forEach((a) => (sum += a.amount));

	return sum;
};

const calculateExpense = (transactions) => {
	const income = transactions.filter((transaction) => transaction.amount < 0);

	let sum = 0;
	income.forEach((a) => (sum += a.amount));

	return sum;
};

function IncomeExpense({ transactions }) {
	const income = calculateIncome(transactions);
	const expense = calculateExpense(transactions);
	const netIncome = income + expense;

	return (
		<div class="overviews">
			<h1>Overviews</h1>

			<div class="overviews-flex">
				<div class="overview">
					<h6>Income</h6>
					<h2>${income}</h2>
				</div>
				<div class="overview">
					<h6>Expense</h6>
					<h2>${expense}</h2>
				</div>
				<div class="overview">
					<h6>Net</h6>
					<h2>${netIncome}</h2>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		transactions: state.transactions.transactions,
	};
};

export default connect(mapStateToProps)(IncomeExpense);
