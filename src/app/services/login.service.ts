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
	hasExpectedRole(role, expectedRole): Boolean {
		if (expectedRole.indexOf(role) === -1) {
			return false;
		}
		return true;
	}
	register(newUser) {
		return this.http.post('/api/users/register', newUser);
	}
}
