import { useTheme } from '../hooks/useTheme';

import modeIcon from '../assets/mode-icon.svg';

import './ThemeSelector.css';

const themeColors = ['#58248c', '#249c6b', '#b70233'];

export default function ThemeSelector() {
	// mode is in state obj (see themeContext)
	const { changeColor, changeMode, mode } = useTheme();

	//can also put this mode changing logic in reducer fn alternatively, then changeMode fn returned would directly execute this logic
	const toggleMode = () => {
		changeMode(mode === 'dark' ? 'light' : 'dark');
	};
	console.log(mode);

	return (
		<div className="theme-selector">
			<div className="mode-toggle">
				<img
					src={modeIcon}
					alt="dark/light toggle icon"
					onClick={toggleMode}
					style={{
						filter:
							mode === 'dark' ? 'invert(100%)' : 'invert(20%)',
					}}
				/>
			</div>

			<div className="theme-buttons">
				{themeColors.map((color) => (
					<div
						key={color}
						onClick={() => changeColor(color)}
						style={{ background: color }}
					/>
				))}
			</div>
		</div>
	);
}
