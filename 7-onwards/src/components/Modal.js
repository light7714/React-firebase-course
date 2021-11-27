import ReactDOM from 'react-dom';
import './Modal.css';

export default function Modal({ children, isSalesModal }) {
	//making a portal: Way to take a comp and render it somewhere in DOM outside the scope of the parent ele.
	//1st arg is the JSX template, 2nd is where we wanna put this template (can use query selector method..)
	//rn its putting it into end of body
	return ReactDOM.createPortal(
		<div className="modal-backdrop">
			{/*inline styles: border-color is now borderColor is jsx */}
			<div
				className="modal"
				style={{
					border: '4px solid',
					borderColor: isSalesModal ? '#ff4500' : '#555',
					textAlign: 'center',
				}}
			>
				{children}
			</div>
		</div>,
		document.body
	);
}
