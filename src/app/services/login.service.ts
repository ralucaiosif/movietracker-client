import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class LoginService {

	constructor(
		private http: HttpClient
	) { }

	authenticate(user) {
		return this.http.post('/api/users/login', user);
	}
	setUserData(userData): void {
		localStorage.setItem('userData', JSON.stringify(userData));
	}
	getUser() {
		return JSON.parse(localStorage.getItem('userData'));
	}
	isLoggedIn(): boolean {
		return this.getUser() ? true : false;
	}
	register(newUser) {
		return this.http.post('/api/users/register', newUser);
	}
}
