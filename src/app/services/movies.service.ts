import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {

	getFavorites(userID: number): Observable<Movie[]> {
		return this.http.get<Movie[]>('http://5c1ce5d885f9df0013fb8a94.mockapi.io/rea/movies');
	};

	remove(userId, movieId) {
		return this.http.post('someendpoint', {
			movieId, userId
		})
	};

	constructor(
		private http: HttpClient
	) { }
}
