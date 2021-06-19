import React from 'react';
import { navigate } from '@reach/router';

const Header = () => {
	return (
		<>
			<div id='header'>
				<h2 id='home' onClick={() => navigate('/')}>Sav State Movies</h2>
				<div id='searchBorder'>
					<button id='searchBtn'><i className='bi bi-search'></i></button>
					<input id='searchInput' type='text' placeholder='search' />
				</div>
			</div>
			<hr />
		</>
	);
};

export default Header;
