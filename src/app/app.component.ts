import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	isLoggedIn: Boolean;
	constructor(
		private loginService: LoginService,
		private router: Router,
	) { }
	logout() {
		this.loginService.logout();
		this.router.navigate(['/login']);
	}

	ngOnInit() {
		this.isLoggedIn = this.loginService.isLoggedIn();
	}
}
