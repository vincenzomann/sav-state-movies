import React from 'react';
import { Router } from '@reach/router';
import Dashboard from './components/Dashboard';
import Details from './components/Details';

function App() {
  return (
    <div className='App'>
			<Router>
				<Dashboard path='/movies'/>
				<Details path='/movies/:id'/>
			</Router>
    </div>
  );
}

export default App;
