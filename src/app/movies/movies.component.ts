import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { LoginService } from '../services/login.service';
import { Movie } from '../interfaces/movie.interface';
import { User } from '../interfaces/user.interface';
import { MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

	constructor(
		private moviesService: MoviesService,
		private loginService: LoginService
	) { }

	movies: MatTableDataSource<Movie>;
	user: User;
	page: number = 1;  // page should start from 1st page
	displayedMoviesColumns: string[] = ['number', 'title', 'genre', 'score', 'actions']; // columns to be rendered in the table
	isLoadingResults = false;
	resultsLength = 0;

	@ViewChild(MatPaginator) paginator: MatPaginator; // injects matt paginator in controller

	ngOnInit() {
		this.user = this.loginService.getUser();
		this.getMovies();
	}

	private getMovies(): void {
		this.isLoadingResults = true;
		this.moviesService.getMovies()
			.subscribe(
				(response) => {
					if (response && response.length > 0) {
						this.movies = new MatTableDataSource(response as Movie[]);
						this.resultsLength = response.length;
						this.movies.paginator = this.paginator;
					} else {
						this.resultsLength = 0;
					}
				},
				error => {
					this.isLoadingResults = false;
				}, () => {
					this.isLoadingResults = false;
				}
			)
	}

	public addFavorite(movieID) {
		this.moviesService.addFavorite(this.user.id, movieID)
			.subscribe(
				() => console.log('done ...')
			)
	}


}
