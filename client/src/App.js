
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import Footer from './components/partials/footer/Footer';
import Header from './components/partials/header/Header';
import './App.css';
import Podcasts from "./pages/Podcasts";

const App = () => (
	<Router>
		<div>
			<Header />
			<Podcasts />
			<Routes />
			<Footer />
		</div>
	</Router>
);

export default App;
