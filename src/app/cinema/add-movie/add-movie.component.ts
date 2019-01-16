import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CinemasService } from '../../services/cinemas.service';

@Component({
	selector: 'app-add-movie',
	templateUrl: './add-movie.component.html',
	styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
	date;
	movie;
	cinema;
	constructor(
		@Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
		private cinemasService: CinemasService,
		private bottomSheetRef: MatBottomSheetRef<AddMovieComponent>
	) { }

	setDate(type: string, event: MatDatepickerInputEvent<Date>) {
		this.date = new Date(event.value).getTime();
	}

	addMovie() {
		this.cinemasService.addMovie.emit({
			date: this.date,
			cinemaName: this.cinema,
			movieName: this.movie
		});
		this.bottomSheetRef.dismiss();
	}

	ngOnInit() {
	}

}
