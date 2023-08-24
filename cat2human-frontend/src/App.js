import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Hedder';
import Footer from './components/Footer';
import './components/header-footer.css';
import RecordPage from './pages/RecordPage';
import NotFound from './pages/NotFound';


function App() {
	return (
		<Router>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/record" element={<RecordPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
