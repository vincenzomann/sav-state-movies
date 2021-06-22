import React from 'react';
import { Movie } from './Dashboard';
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
			<div className='row' style={{ padding: '0', width: '100vw' }}>
				{genreMovies.map((movie) => (
					<MovieCard movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Genre;
