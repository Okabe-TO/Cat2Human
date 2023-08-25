import React, { useState, useRef, useEffect } from 'react';
import RecordButton from '../components/buttons/RecordButton';

function RecordPage() {
	/** 状態変数 */
	// 録音中かどうかの状態を管理する
	const [recording, setRecording] = useState(false);
	// 録音した音声のURLを管理する
	const [audioURL, setAudioURL] = useState("");
	// MediaRecorderのインスタンスを参照として保持する
	const mediaRecorderRef = useRef(null);
	// エラーメッセージを管理する状態変数
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		return () => {
			if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
				mediaRecorderRef.current.stop();
			}
		};
	}, []);

	/** 録音処理 */
	const startRecording = async () => {
		try {
			// マイクへのアクセスを要求
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			// MediaRecorderのインスタンスを作成
			const mediaRecorder = new MediaRecorder(stream);
			mediaRecorderRef.current = mediaRecorder;

			// エラーイベントのリスニング
        mediaRecorder.onerror = (event) => {
            setErrorMessage(`録音中にエラーが発生しました: ${event.error.name}`);
        };

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
			if(mediaRecorder.state === 'inactive') {
				mediaRecorder.start();
				setRecording(true);
			} else {
				setErrorMessage('録音はすでに開始されています。');
			}
		} catch(error) {
			// エラーメッセージをセット
			if(error.name === 'NotAllowedError') {
				setErrorMessage('マイクのアクセスが拒否されました。');
			} else {
				setErrorMessage('マイクが利用できません。');
			}
		}
	};

	/** 録音停止処理 */
	const stopRecording = () => {
		if (mediaRecorderRef.current) {
			if(mediaRecorderRef.current.state === 'recording') {
				mediaRecorderRef.current.stop();
				setRecording(false);
			} else {
				setErrorMessage('録音は現在開始されていません。');
			}
		}
	};

	return (
		<div className='App'>
			{/** エラーメッセージがある場合に表示 */}
			{errorMessage && <p className="error">{errorMessage}</p>}

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
