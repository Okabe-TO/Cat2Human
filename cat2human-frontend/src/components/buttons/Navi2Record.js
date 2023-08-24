import { useNavigate } from 'react-router-dom';
function Navi2Record() {
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

export default Navi2Record;