import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemaComponent } from './cinema/cinema.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'unauthorized',
		component: UnauthorizedComponent
	},
	{
		path: '',
		component: DashboardComponent,
		canActivate: [AuthGuard],
		data: {
			expectedRole: 'user'
		}
	},
	{
		path: 'movies',
		component: MoviesComponent,
		canActivate: [AuthGuard],
		data: {
			expectedRole: 'user'
		}
	},
	{
		path: 'cinema',
		component: CinemaComponent,
		canActivate: [AuthGuard],
		data: {
			expectedRole: 'admin'
		}
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
