import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemaComponent } from './cinema/cinema.component'

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: '', component: DashboardComponent },
	{ path: 'movies', component: MoviesComponent },
	{ path: 'cinema', component: CinemaComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
