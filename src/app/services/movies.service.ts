import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/movie.interface';

@Injectable({
	providedIn: 'root'
})
export class MoviesService {

	getFavorites(userID) {
		return this.http.get('http://5c1ce5d885f9df0013fb8a94.mockapi.io/rea/movies');
		// return this.http.get(`/api/user-movies/${userID}`);
	}

	constructor(
		private http: HttpClient
	) { }
}
