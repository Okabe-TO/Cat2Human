import { useNavigate } from 'react-router-dom';
function RecordButton() {
	const navigate = useNavigate();
	const handleRecordClick = () => {
		navigate('/record');
	}
	return(
		<button className="standard-button" onClick={handleRecordClick}>
			Record!!
		</button>
	);
}

export default RecordButton;