import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service'

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

	showLogin: boolean = true;
	showRegister: boolean = false;
	loggedIn: boolean = this.loginService.isLoggedIn();
	registered;

	constructor(
		private loginService: LoginService,
		private router: Router,
	) { }

	ngOnInit() {
		if (this.loggedIn) {
			this.router.navigate(['/']);
		}
	}

	authenticate(user): void {
		this.loginService.authenticate(user)
			.subscribe(
				response => {
                    this.loginService.setUserData(response);
					this.router.navigate(['/']);
				}
			)
	}

	register(newUser): void {
		this.loginService.register(newUser)
			.subscribe(
				response => {
					this.registered = true;
				}
			)
	}

}
