function RecordButton({ recording, startRecording, stopRecording }) {
	if (recording) {
		return <button onClick={stopRecording}>Stop Recording</button>;
	} else {
		return <button onClick={startRecording}>Start Recording</button>;
	}
}

export default RecordButton;
