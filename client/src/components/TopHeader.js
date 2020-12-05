import React, { useState } from "react";
import Logo from "../assets/img/logo.svg";
import Modal from "./Modal";

export default function TopHeader() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<header>
				<img src={Logo} alt="Logo" />
				<h1 class="main-heading">Expense Tracker</h1>
			</header>
			<a href="#!" onClick={() => setIsModalOpen(true)}>
				New Transaction
			</a>
			<Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</>
	);
}
