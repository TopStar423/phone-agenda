import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Routes from './Routes';
import Footer from './components/partials/footer/Footer';
import DevLinks from './components/dev-links/DevLinks';
import './App.css';

const App = () => (
	<Router>
		<div className="app">
			<Routes />
			<Footer />
		</div>
	</Router>
);

export default App;
