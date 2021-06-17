import React from 'react';
import { Router, navigate } from '@reach/router';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import './App.css';

function App() {

	return (
		<div className='App'>
			<div id='header'>
				<h2>Sav State Movies</h2>
				<div id='searchBorder'>
					<button id='searchBtn'><i className='bi bi-search'></i></button>
					<input id='searchInput' type='text' placeholder='search' />
				</div>
			</div>
			<hr />
			<Router>
				<Dashboard path='/' />
				<Details path='/:id' />
			</Router>
		</div>
	);
}

export default App;
