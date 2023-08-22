import { useEffect } from 'react';
import Recorder from 'recorder-js';
import StopRecordingButton from '../components/buttons/StopRecordingButton';

function Record() {
	useEffect(() => {
		// ページ読み込み時に実行される処理をここに書く

		// recorder.jsのインスタンスを作成
		const audioContext = new (window.AudioContext || window.webkitAudioContext)();
		const recorder = new Recorder(audioContext);
		
	}, []);

	return (
		<div className="App">
			<p>
				record
			</p>
			<StopRecordingButton />
		</div>
	);
}

export default Record;