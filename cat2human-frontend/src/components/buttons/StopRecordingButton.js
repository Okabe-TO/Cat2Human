import { useState } from "react";
function StopRecordingButton() {
	const [isVisible, setIsVisible] = useState(true);
	const handleClick = () => {
		setIsVisible(false);
	};
	return (
		<>
			{/** isVisibleがtrueの時だけボタン表示 */}
			{isVisible && (
				<button className="standard-button" onClick={handleClick}>
					Stop Recording
				</button>
			)}
		</>
	);
}

export default StopRecordingButton;
