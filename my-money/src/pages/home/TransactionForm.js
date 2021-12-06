import { useState, useEffect } from 'react';
import { useFirestore } from '../../hooks/useFirestore';

export default function TransactionForm({ uid }) {
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const { addDocument, response } = useFirestore('transactions');

	const handleSubmit = (e) => {
		e.preventDefault();

		//uid is id of user currently logged in
		addDocument({
			uid: uid,
			name: name,
			amount: amount,
		});
		//cant clear form here, as async code above
	};

	//clear form
	useEffect(() => {
		if (response.success) {
			setName('');
			setAmount('');
		}
	}, [response.success]);

	return (
		<>
			<h3>Add a Transaction</h3>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Transaction name:</span>
					<input
						type="text"
						required
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
				</label>
				<label>
					<span>Amount(₹):</span>
					{/* user can only enter number, but when a string version of it will be stored in our number variable */}
					<input
						type="number"
						required
						onChange={(e) => setAmount(e.target.value)}
						value={amount}
					/>
				</label>
				<button>Add Transaction</button>
			</form>
		</>
	);
}
