import React, { useState, useEffect } from "react";
import TopHeader from "./TopHeader";
import IncomeExpense from "./IncomeExpense";
import TransactionList from "./TransactionList";
import BGFrame from "../assets/img/bg-framer.svg";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import { getTransactions } from "../Redux/actions/ActionCreators";

const Home = ({ transactions, getTransactions }) => {
	const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

	useEffect(() => {
		getTransactions();
	}, []);

	return (
		<>
			<img src={BGFrame} alt="" class="bg-frame"></img>
			<a href="#!" className="bars" onClick={() => setSidebarIsOpen(true)}>
				<i class="fa fa-bars" aria-hidden="true"></i>
			</a>
			<Sidebar
				sidebarIsOpen={sidebarIsOpen}
				setSidebarIsOpen={setSidebarIsOpen}
			/>
			<div className="container">
				<TopHeader />
				{transactions.length !== 0 && <IncomeExpense />}
				<TransactionList />
			</div>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		transactions: state.transactions.transactions,
	};
};

export default connect(mapStateToProps, { getTransactions })(Home);
