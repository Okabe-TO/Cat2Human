import RecordButton from '../components/buttons/RecordButton';

function Home() {
	return (
		<div className="App">
			<p className="Home-Contents">
				Record Cat's Voice
			</p>

			<RecordButton />
		</div>
	);
}

export default Home;