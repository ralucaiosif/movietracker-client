import { Component, OnInit, ViewChild } from '@angular/core';
import { Cinema } from '../interfaces/cinema.interface';
import { Movie } from '../interfaces/movie.interface';
import { CinemasService } from '../services/cinemas.service';
import { MoviesService } from '../services/movies.service';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';

@Component({
	selector: 'app-cinema',
	templateUrl: './cinema.component.html',
	styleUrls: ['./cinema.component.scss']
})
export class CinemaComponent implements OnInit {

	constructor(
		private cinemasService: CinemasService,
		private movieService: MoviesService,
		private bottomSheet: MatBottomSheet,
	) { }

	cinemas: MatTableDataSource<Cinema>;
	movies: Movie[];
	resultsLength: Number;
	displayedColumns: string[] = ['name', 'address'];

	@ViewChild(MatPaginator) paginator: MatPaginator;

	ngOnInit() {
		this.getCinemas();
		this.getMovies();
		this.cinemasService.addMovie
			.subscribe(
				(response) => this.addMovie(response)
			);
	}

	getCinemas() {
		this.cinemasService.getCinemas()
			.subscribe(
				response => {
					this.cinemas = new MatTableDataSource<Cinema>(response);
					this.resultsLength = response.length;
					this.cinemas.paginator = this.paginator;
				}
			)
	}

	getMovies() {
		this.movieService.getMovies()
			.subscribe(
				response => this.movies = response as Movie[]
			);
	}

	addMovie(data) {
		this.cinemasService.addMovieToCinema(data);
	}

	openAddMovie() {
		this.bottomSheet.open(AddMovieComponent, {
			data: {
				cinemas: this.cinemas.data,
				movies: this.movies
			}
		});
	}

}
