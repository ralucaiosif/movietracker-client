import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material-module';
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemaComponent } from './cinema/cinema.component';
import { AddMovieComponent } from './cinema/add-movie/add-movie.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginFormComponent,
		LoginComponent,
		DashboardComponent,
		RegisterComponent,
		MovieDetailsComponent,
		MoviesComponent,
		CinemaComponent,
		AddMovieComponent,
		UnauthorizedComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		NgxPaginationModule
	],
	entryComponents: [MovieDetailsComponent, AddMovieComponent],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
