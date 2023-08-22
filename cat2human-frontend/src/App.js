import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Record from './pages/RecordPage';
import Header from './components/Hedder';
import Footer from './components/Footer';
import './components/header-footer.css';


function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/record" element={<Record />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
