import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Movie } from './Dashboard';
import Header from './Header';

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

	const displayStars = (movie: Movie) => {
		const starRating = Math.round(movie.imdb_rating) / 2;
		const fullStars = Math.floor(starRating);
		const halfStar = starRating % 1 === 0.5;
		// Create array that will have the classNames for which star icon to display: fill, half, empty
		let starIcons = [];
		// Fill the start of the array with how many full stars the movie has
		for (let i = 0; i < fullStars; i++) {
			starIcons.push('bi bi-star-fill');
		}
		// Add a half star icon if required
		halfStar && starIcons.push('bi bi-star-half');
		// Fill the remaining indexes with empty star icons if the array length is less than 5
		while (starIcons.length < 5) {
			starIcons.push('bi bi-star');
		}
		return starIcons.map((className) => (
			<i className={className} />
		));
	};

	return (
		<>
			<Header />
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
									<div className="row" id='topInfo'>
										<div className="col">
											<p>{movie.title} ({movie.imdb_rating})</p>
											<p>{movie.released_on.substr(0, 4)} | {movie.length} | {typeof (movie.director) === 'string' ? movie.director : movie.director.join(', ')}</p>
											<p>Cast: {movie.cast.join(', ')}</p>
										</div>
										<div className="col" id='stars'>{displayStars(movie)}</div>
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
		</>
	);
};

export default Dashboard;
