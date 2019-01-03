import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	@Input() submitted = false;
	@Output() onRegister = new EventEmitter();

	constructor(
		private formBuilder: FormBuilder
	) { }

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', [Validators.required, Validators.maxLength(16)]],
			email: ['', Validators.email]
		});
	}

	get form() {
		return this.registerForm.controls;
	}

	register() {
		this.onRegister.emit({
			username: this.form.username.value,
			password: this.form.password.value,
			email: this.form.email.value
		})
	}

}
