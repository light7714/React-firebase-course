import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';

// styles
import styles from './Login.module.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error, isPending } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();

		login(email, password);
	};

	return (
		// when class has -, we do this (as in js - means substract)
		<form onSubmit={handleSubmit} className={styles['login-form']}>
			<h2>Login</h2>
			<label>
				<span>Email:</span>
				<input
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>Password:</span>
				<input
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			{/* <button className="btn">Login</button> */}

			{!isPending ? <button className="btn">Login</button> : null}
			{isPending ? (
				<button className="btn" disabled>
					Loading...
				</button>
			) : null}
			{error ? <p>{error}</p> : null}
		</form>
	);
}
