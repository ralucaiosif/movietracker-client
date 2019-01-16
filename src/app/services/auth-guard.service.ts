import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService {

	constructor(
		private router: Router,
		private loginService: LoginService
	) { }

	canActivate(route: ActivatedRouteSnapshot): boolean {
		if (!this.loginService.isLoggedIn() ||
			!this.loginService
				.hasExpectedRole(this.loginService.getUser().role, route.data.expectedRole)) {
			this.router.navigate(['unauthorized']);
			return false;
		}
		return true;
	}
}
