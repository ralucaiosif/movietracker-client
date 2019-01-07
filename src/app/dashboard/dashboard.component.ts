import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie.interface';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

import { MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

	constructor(
		private loginService: LoginService,
		private moviesService: MoviesService,
		private bottomSheet: MatBottomSheet
	) { }

	user: string;
	favorites;
	page: number = 1;
	displayedColumns: string[] = ['number', 'title', 'genre', 'score'];

	resultsLength = 0;
	isLoadingResults = false;
	isRateLimitReached = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {
		this.user = this.loginService.getUser();
		this.getFavorites();
	}

	getFavorites() {
		this.isLoadingResults = true;
		this.moviesService.getFavorites(this.user.id)
			.subscribe(
				response => {
					if (response && response.length >= 1) {
						this.resultsLength = response.length;
						this.favorites = new MatTableDataSource<Movie>(response as Movie[]);
						this.favorites.paginator = this.paginator;
					} else {
						this.resultsLength = 0;
					}
				},
				error => {
					console.log(error);
					this.isLoadingResults = false;
				}, () => {
					this.isLoadingResults = false;
				}
			)
	}

	showDetails(movie) {
		this.bottomSheet.open(MovieDetailsComponent, {
			data: movie
		});
	}

}
