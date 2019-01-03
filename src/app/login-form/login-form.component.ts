import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
	loginForm: FormGroup;
	loggedIn: boolean = this.loginService.isLoggedIn();
	@Output() onAuthenticate = new EventEmitter();

	constructor(
		private formBuilder: FormBuilder,
		private loginService: LoginService,
	) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	get form() {
		return this.loginForm.controls;
	}

	authenticate(): void {
		this.onAuthenticate.emit({
			username: this.form.username.value,
			password: this.form.password.value
		});
	}

}
