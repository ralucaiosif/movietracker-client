import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {

	getFavorites(userID: number): Observable<Movie[]> {
		//return this.http.get<Movie[]>('http://5c1ce5d885f9df0013fb8a94.mockapi.io/rea/movies');
		return this.http.get<Movie[]>(`/api/user-movies/${userID}`);
	};

	getMovies(): Observable<Movie[]> {
		//return this.http.get<Movie[]>('http://5c1ce5d885f9df0013fb8a94.mockapi.io/rea/movies');
		return this.http.get<Movie[]>(`/api/movies/all`);
	};

	addFavorite(movieID, userID) {
		return this.http.post('/api/user-movies/add-movie', {
				movieId: movieID,
				userId: userID
			});
	}

	remove(userId, movieId) {
		const httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: {
				movieId: movieId,
				userId: userId
			}
		};
		return this.http.delete('/api/user-movies', httpOptions);
	};

	getSuggestions(userId: number): Observable<Movie[]> {
		return this.http.get<Movie[]>(`/api/user-movies/${userId}/suggestions`);
	};

	constructor(
		private http: HttpClient
	) { }
}
