import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import Genre from './Genre';

interface Props extends RouteComponentProps {

}

export interface Movie {
	backdrop: string,
	cast: string[],
	classification: string,
	director: string,
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

const Dashboard: React.FC<Props> = () => {

	const [movies, setMovies] = useState<Movie[]>([]);
	const [genres, setGenres] = useState<string[]>([]);

	useEffect(() => {
		// fetch('https://sav-state/movies', {
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
		<div id="genres">
			{genres.length ?
				genres.map((genre) => (
					<Genre key={genre} genre={genre} movies={movies} />
				))
				:
				<div>Loading...</div>
			}
		</div>
	);
};

export default Dashboard;
