import React, { Dispatch, SetStateAction, useState } from 'react';
import { navigate } from '@reach/router';
import { Movie } from './Dashboard';

interface Props {
	setSearchResults: Dispatch<SetStateAction<Movie[]>>;
}

const Header: React.FC<Props> = (props: Props) => {

	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// const encodedValue = encodeURIComponent(searchTerm);
		// fetch(`https://sav-state/movies?q=${encodedValue}`, { // Use if real API
		fetch('movies.json', {
			headers: {
				Authorization: 'Bearer savstate2021'
			}
		}).then(res => {
			return res.json();
		}).then((data: { movies: Movie[]; }) => {
			// Fake implementation of search results
			const filterSearch = data.movies.filter((movie) => {
				// Basic search comparing the titles of each film with the search term
				return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
			});
			navigate('/');
			props.setSearchResults(filterSearch);
		}).catch(error => {
			console.log('Handle error: ', error);
		});
	};

	return (
		<>
			<div className='row' id='header'>
				<h2 className='col' id='home' onClick={() => navigate('/')}>Sav State Movies</h2>
				<div className='col' id='searchBorder'>
					<form onSubmit={handleSubmit} style={{ justifyContent: 'center' }}>
						<div className="row formRow">
							<button className='col searchBtn' type='submit'>
								<i className='bi bi-search' />
							</button>
							<input className='col-8' id='searchInput' type='text' placeholder='search' value={searchTerm} onChange={handleChange} />
							<button className='col searchBtn' type='button' value='clear' onClick={() => {
								setSearchTerm('');
								props.setSearchResults([]);
							}} >
								<i className='bi bi-x' />
							</button>
						</div>
					</form>
				</div>
			</div>
			<hr />
		</>
	);
};

export default Header;
