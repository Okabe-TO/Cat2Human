import React, { useState, useRef } from 'react';
import RecordButton from '../components/buttons/RecordButton';

function RecordPage() {
	// 録音中かどうかの状態を管理する
	const [recording, setRecording] = useState(false);
	// 録音した音声のURLを管理する
	const [audioURL, setAudioURL] = useState("");
	// MediaRecorderのインスタンスを参照として保持する
	const mediaRecorderRef = useRef(null);

	const startRecording = async () => {
		// マイクへのアクセスを要求
		const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
		// MediaRecorderのインスタンスを作成
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;

		// 録音データを保持するための配列
		const audioChunks = [];
		// データが利用可能になったときのイベントハンドラ
		mediaRecorder.ondataavailable = (event) => {
			audioChunks.push(event.data);
		};

		// 録音が停止したときのイベントハンドラ
		mediaRecorder.onstop = () => {
			// 録音データをBlobとして保存
			const audioBlob = new Blob(audioChunks);
			// BlobからURLを生成
			const url = URL.createObjectURL(audioBlob);
			// 状態にURLをセット
			setAudioURL(url);
		};

		// 録音を開始
		mediaRecorder.start();
		setRecording(true);
	};

	const stopRecording = () => {
		// 録音を停止
		if (mediaRecorderRef.current) {
			mediaRecorderRef.current.stop();
			setRecording(false);
		}
	};

	return (
		<div className='App'>
			{/** 録音中に 'Now Recording'を表示 */}
			{recording && <p>Now Recording!</p>}
			{/** 録音ボタン */}
			<RecordButton
				recording={recording}
				startRecording={startRecording}
				stopRecording={stopRecording}
			/>

			{/* 録音した音声を再生するオーディオコントロール 1回以上録音された時表示*/<br></br>}
			{audioURL && <audio src={audioURL} controls />}

			{/** 録音が問題なければ遷移する */}
			
		</div>
	);
}

export default RecordPage;
