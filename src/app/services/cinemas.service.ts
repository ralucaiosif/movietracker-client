import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cinema } from '../interfaces/cinema.interface';

@Injectable({
	providedIn: 'root'
})
export class CinemasService {

	addMovie = new EventEmitter();

	getCinemas(): Observable<Cinema[]> {
		// return this.http.get<Cinema[]>('http://5c1ce5d885f9df0013fb8a94.mockapi.io/rea/cinema');
		return this.http.get<Cinema[]>(`/api/cinemas/all`);
	};

	addMovieToCinema(data) {
		return this.http.post('/api/user-movies/add-movie', data);
	}

	constructor(
		private http: HttpClient
	) { }
}
