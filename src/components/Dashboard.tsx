import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Genre from './Genre';
import MovieCard from './MovieCard';
export interface Movie {
	backdrop: string,
	cast: string[],
	classification: string,
	director: string | string[],
	genres: string[],
	id: string,
	imdb_rating: number,
	length: string,
	overview: string,
	poster: string,
	released_on: string,
	slug: string,
	title: string;
}
interface Props extends RouteComponentProps {
	searchResults: Movie[];
}

const Dashboard: React.FC<Props> = ({ searchResults }) => {

	const [movies, setMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<string[]>([]);

	useEffect(() => {
		// fetch('https://sav-state/movies', { // Use if real API
		fetch('movies.json', {
			headers: {
				Authorization: 'Bearer savstate2021'
			}
		}).then(res => {
			return res.json();
		}).then((data: { movies: Movie[]; }) => {
			// store the movies in local state
			setMovies(data.movies);
			// create a set of the movie genres
			let genres: string[] = [];
			data.movies.forEach((movie) => {
				movie.genres.forEach((genre) => {
					!genres.includes(genre) && genres.push(genre);
				});
			});
			setGenres(genres.sort());
		}).catch(error => {
			console.log('Handle error: ', error);
		});
	}, []);

	return (
		<>
			<div id='search'>
				{searchResults.length ? (
					<div className='row search'>
						<h3>Search Results</h3>
						{searchResults.map((movie) => {
							console.log(movie);
							return <MovieCard movie={movie} />;
						})}
					</div>
				) : (
					<>
						{genres.length ?
							genres.map((genre) => (
								<Genre key={genre} genre={genre} movies={movies} />
							))
							:
							<div>Loading...</div>
						}
					</>
				)}
			</div>
		</>
	);
};

export default Dashboard;
