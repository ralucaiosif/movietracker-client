import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
	selector: 'app-movie-details',
	templateUrl: './movie-details.component.html',
	styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {

	constructor(
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any
	) { }

}
