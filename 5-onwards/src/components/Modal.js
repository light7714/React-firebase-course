//type rfc to create a react functional component (vscode ext: react snippets), type _rfc for new version
// import React from 'react'  for older versions
import ReactDOM from 'react-dom';
import './Modal.css';

// export default function Modal({ children, handleClose }) {
//     //to make it more reusable, only props arent going to help, as we might want diff code
//     //we will use children prop, all the children ele inside the Modal (see wherever the modal comp is used) are inserted at props.children. So this is the way to directly insert dynamic code
// 	return (
// 		<div className="modal-backdrop">
// 			<div className="modal">
// 				{/* <h2>10% Off Coupon Code!!</h2>
// 				<p>Use the code NINJA10 at the checkout.</p> */}
//                 {children}
//                 {/* when btn is clicked, we need to change the state of showModal variable inside the parent(eg. App) comp, as that var is not defined here
//                 so we'll pass a function handleClose() in parent comp as a prop here */}
//                 <button onClick={handleClose}>Close</button>
// 			</div>
// 		</div>
// 	);
// }

export default function Modal({ children, handleClose, isSalesModal }) {
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
				<button
					onClick={handleClose}
					className={isSalesModal ? 'sales-btn' : ''}
				>
					Close
				</button>
			</div>
		</div>,
		document.body
	);
}
