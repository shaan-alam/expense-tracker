import React from "react";
import { connect } from "react-redux";
import { removeTransaction } from "../Redux/actions/ActionCreators";

function Transaction({ removeTransaction, transaction }) {
	return (
		<div
			className={`transaction ${transaction.amount > 0 ? "income" : "expense"}`}
		>
			<div className="content">
				<h2>{transaction.title}</h2>
				<h5>{transaction.amount}</h5>
			</div>
			<div className="action">
				<a
					href="#!"
					className="delete"
					onClick={() => removeTransaction(transaction._id)}
				>
					<i className="fa fa-times" aria-hidden="true"></i>
				</a>
			</div>
		</div>
	);
}

export default connect(null, { removeTransaction })(Transaction);
