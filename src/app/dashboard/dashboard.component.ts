import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie.interface';
import { User } from '../interfaces/user.interface';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';
import { MatSnackBar } from '@angular/material';
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
		private bottomSheet: MatBottomSheet,
		private snackBar: MatSnackBar
	) { }

	user: User;
	favorites: MatTableDataSource<Movie>; // observable for data table
	suggestions: MatTableDataSource<Movie>; // observable for data table
	page: number = 1;  // page should start from 1st page
	displayedFavoritesColumns: string[] = ['number', 'title', 'genre', 'score', 'actions']; // columns to be rendered in the table
	displayedSuggestionsColumns: string[] = ['number', 'title', 'genre', 'score']; // columns to be rendered in the table

	favoritesResultsLength = 0; // init number of results
	suggestionsResultsLength = 0; // init number of results
	isLoadingResults = false;

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {
		this.user = this.loginService.getUser();
		this.getFavorites();
		this.getSuggestions();
	}

	private getFavorites(): void {
		this.isLoadingResults = true;
		this.moviesService.getFavorites(this.user.id)
			.subscribe(
				(response: Movie[]) => {
					if (response && response.length >= 1) {
						this.favoritesResultsLength = response.length;
						this.favorites = new MatTableDataSource<Movie>(response);
						this.favorites.paginator = this.paginator;
					} else {
						this.favoritesResultsLength = 0;
					}
				},
				error => {
					this.isLoadingResults = false;
				}, () => {
					this.isLoadingResults = false;
				}
			)
	}

	private getSuggestions(): void {
		this.moviesService.getSuggestions(this.user.id)
			.subscribe(
				(response: Movie[]) => {
					this.suggestionsResultsLength = response.length;
					this.suggestions = new MatTableDataSource<Movie>(response);
					this.suggestions.paginator = this.paginator;
				})
	}

	public showDetails(movie: Movie): void {
		this.bottomSheet.open(MovieDetailsComponent, {
			data: movie
		});
	}

	public remove(movieId: String): void {
		this.moviesService.remove(this.user.id, movieId)
			.subscribe(
				() => {
					this.getFavorites();
					this.snackBar.open('Movie was removed from your favorites!', 'Close', {
						duration: 2000
					});
				}, error => {
					this.snackBar.open('Movie was note removed from your favorites! An error occured.', 'Close', {
						duration: 2000
					});
				}
			);
	}

}
