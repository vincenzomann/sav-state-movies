import React from 'react';
import { navigate } from '@reach/router';
import { Movie } from './Dashboard';

interface Props {
	movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
	return (
		<div key={movie.id} className='card' onClick={() => navigate(`/${movie.id}`)}>
			<div className='card-body' style={{ backgroundImage: `url('${movie.backdrop}')` }}>
				<div className='card-content'>
					<h5 className='card-title'>{movie.title}</h5>
					<h6 className='card-subtitle mb-2'>imdb: {movie.imdb_rating}</h6>
					<h6 className='card-subtitle mb-2'>{movie.length}</h6>
					<p className='card-text'>{movie.cast.join(', ')}</p>
				</div>
			</div>
		</div>
	);
};

export default MovieCard;
