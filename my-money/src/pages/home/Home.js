import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Home.module.css';

// components
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

export default function Home() {
	const { user } = useAuthContext();
	//2nd and 3rd arg is the query (1st uid in 2nd arg is property inside the document)
	const { documents, error } = useCollection(
		'transactions',
		['uid', '==', user.uid],
		['createdAt', 'desc']
	);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				{error ? <p>{error}</p> : null}
				{documents ? (
					<TransactionList transactions={documents} />
				) : (
					<p>No transactions to show!</p>
				)}
			</div>
			<div className={styles.sidebar}>
				{/* passing user'id as prop instead of just accessing it in TransactionForm comp as we also need it in transaction list */}
				<TransactionForm uid={user.uid} />
			</div>
		</div>
	);
}
