import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Movie } from './Dashboard';

interface Props extends RouteComponentProps {

}

const Dashboard: React.FC<Props> = () => {

	const [movie, setMovie] = useState<Movie>();

	// Fresh fetch instead of passing props in case user goes directly to the url
	useEffect(() => {
		// fetch('https://sav-state/movies', {
		fetch('movies.json', {
			headers: {
				Authorization: 'Bearer savstate2021'
			}
		}).then(res => {
			return res.json();
		}).then((data: { movies: Movie[]; }) => {
			// console.log(data);
			// grab the movie matching the url param which is the movie ID
			const movie = data.movies.find((movie) => {
				return movie.id === window.location.pathname.split('/')[1];
			});
			setMovie(movie);
		}).catch(error => {
			// The url param is not a valid movie ID
			console.log('Handle error: ', error);
		});
	}, []);

	return (
		<div className="details">
			{
				movie ? (
					<div className='row justify-content-around'>
						<div className="col-12 col-md-4">
							<div className="card poster">
								<img src={movie.poster} alt="poster" />
							</div>
						</div>
						<div className="col-12 col-md-8">
							<div className="card movieDetails">
								<div className="row">
									<div className="col">
										<p>{movie.title} ({movie.imdb_rating})</p>
										<p>{movie.released_on} | {movie.length} | {movie.director}</p>
										{/* <p>{movie.released_on} | {movie.length} | {typeof (movie.director) === 'string' ? movie.director : movie.director.join(', ')}</p> */}
										<p>Cast: {movie.cast.join(', ')}</p>
									</div>
									<div className="col">****</div>
								</div>
								<div className="row">
									<p>Description</p>
									<p>{movie.overview}</p>
								</div>
							</div>
						</div>
					</div>
				) : (
					<p>Loading...</p>
				)
			}
		</div>
	);
};

export default Dashboard;
