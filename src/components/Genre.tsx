import React, { useState } from 'react';
import { Movie } from './Dashboard';
import { navigate } from '@reach/router';
import MovieCard from './MovieCard';

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
			<div className='row'>
				{genreMovies.map((movie) => (
					<MovieCard movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Genre;
