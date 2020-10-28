// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { FormsComponent } from './views/pages/Templates/forms/forms.component';
import { DataTablesComponent } from './views/pages/Templates/data-tables/data-tables.component';
import { AnalyticsComponent } from './views/pages/Templates/analytics/analytics.component';
import {PermissionsGuard} from './core/guards/permissions.guard';


const routes: Routes = [
	{ path: '', canActivate: [GuestGuard], loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
	{
		path: 'cms',
		component: BaseComponent,
		canActivate: [AuthGuard],
		runGuardsAndResolvers: 'always',
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},

			// Temporally Section
			{
				path: 'Forms-structure', // <= Page URL
				component: FormsComponent // <= Page component registration
			},

			{
				path: 'data-tables', // <= Page URL
				component: DataTablesComponent // <= Page component registration
			},

			{
				path: 'analytics', // <= Page URL
				component: AnalyticsComponent // <= Page component registration
			},

			// Project Module
			{
				path: 'clients', // <= Page URL ,
				// canActivate: [PermissionsGuard],
				// data: {
				// 	permissions: permissionCatalogueConfig.product_permissions,
				// },
				loadChildren: () => import('./views/pages/clients/clients.module')
					.then(m => m.ClientsModule)
			},

		]
	},

	{
		path: 'error/:type', component: ErrorPageComponent,
		data: {
			'type': 'error-v1',
			'code': 403,
			'title': '403... Access forbidden',
			'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
		}
	},
	{ path: '**', redirectTo: 'error/error-v1', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
