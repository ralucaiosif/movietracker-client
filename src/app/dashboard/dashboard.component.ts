import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

	constructor(
		private loginService: LoginService,
	) { }

	user;

	ngOnInit() {
		this.user = this.loginService.getUser();
	}

}
