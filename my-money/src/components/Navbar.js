import { NavLink, Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

//styles
import styles from './Navbar.module.css';

export default function Navbar() {
	const { logout } = useLogout();
	const { user } = useAuthContext();

	return (
		<nav className={styles.navbar}>
			<ul>
				<li className={styles.title}><Link to="/">OurMoney</Link></li>

				{user ? (
					<>
						<li>Hey {user.displayName}!</li>
						<li>
							<button className="btn" onClick={logout}>
								Logout
							</button>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/login">Login</NavLink>
						</li>
						<li>
							<NavLink to="/signup">Signup</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}
