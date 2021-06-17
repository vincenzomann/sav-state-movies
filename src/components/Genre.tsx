import React, { useState } from 'react';
import { Movie } from './Dashboard';
import { navigate } from '@reach/router';

interface Props {
	genre: string;
	movies: Movie[];
}

const Genre: React.FC<Props> = ({ genre, movies }) => {

	const genreMovies = movies.filter((movie) => {
		return movie.genres.includes(genre);
	});

	return (
		<div className='row genreRow'>
			<h4>{genre}</h4>
			<div className="row">
				{genreMovies.map((movie) => (
					<div key={movie.id} className="card" onClick={() => navigate(`/${movie.id}`)}>
						<div className="card-body" style={{ backgroundImage: `url('${movie.backdrop}')` }}>
							<div className="card-content">
								<h5 className="card-title">{movie.title}</h5>
								<h6 className="card-subtitle mb-2">imdb: {movie.imdb_rating}</h6>
								<h6 className="card-subtitle mb-2">{movie.length}</h6>
								<p className="card-text">{movie.cast.join(', ')}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Genre;
