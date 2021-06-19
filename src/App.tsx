import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './components/Dashboard';
import Details from './components/Details';
import './App.css';

function App() {
	return (
		<div className='App'>
			<Router>
				<Dashboard path='/' />
				<Details path='/:id' />
			</Router>
		</div>
	);
}

export default App;
