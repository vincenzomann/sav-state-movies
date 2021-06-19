import React, { useState } from 'react';
import { Router } from '@reach/router';
import Dashboard, { Movie } from './components/Dashboard';
import Details from './components/Details';
import './App.css';
import Header from './components/Header';

function App() {

	const [searchResults, setSearchResults] = useState<Movie[]>([]);

	return (
		<div className='App'>
			<Header setSearchResults={setSearchResults} />
			<Router>
				<Dashboard path='/' searchResults={searchResults} />
				<Details path='/:id' />
			</Router>
		</div>
	);
}

export default App;
