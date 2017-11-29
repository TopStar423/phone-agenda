import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import Footer from './components/partials/footer/Footer';
import Header from './components/partials/header/Header';
import './App.css';

const App = () => (
	<Router>
		<div className="app">
			<Header />
			<Routes />
			<Footer />
		</div>
	</Router>
);

export default App;
