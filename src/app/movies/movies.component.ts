import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../interfaces/movie.interface';
import { MatPaginator, MatTableDataSource, MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private moviesService: MoviesService) { }

  movies:MatTableDataSource<Movie>; 
  page: number = 1;  // page should start from 1st page
  displayedMoviesColumns: string[] = ['number', 'title', 'genre', 'score']; // columns to be rendered in the table
  isLoadingResults = false;
  moviesResultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator; // injects matt paginator in controller
  
  ngOnInit() {
	this.getMovies();
  }

  private getMovies(): void {
		this.isLoadingResults = true;
		this.moviesService.getMovies()
			.subscribe(
				(response: Movie[]) => {
					if (response && response.length >= 1) {
						this.moviesResultsLength = response.length;
						this.movies = new MatTableDataSource<Movie>(response);
						this.movies.paginator = this.paginator;
					} else {
						this.moviesResultsLength = 0;
					}
				},
				error => {
					this.isLoadingResults = false;
				}, () => {
					this.isLoadingResults = false;
				}
			)
	}
	
  
  

}
