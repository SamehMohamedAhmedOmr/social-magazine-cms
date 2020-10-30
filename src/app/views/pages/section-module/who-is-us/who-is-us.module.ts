import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhoIsUsComponent} from './who-is-us.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
	{
		path: '',
		component: WhoIsUsComponent,
		children: [
			// {
			// 	path: '',
			// 	component: IndexComponent
			// },
			// {
			// 	path: 'add',
			// 	component: AddComponent
			// },
			// {
			// 	path: ':id',
			// 	component: EditComponent
			// },
			// {
			// 	path: 'details/:id',
			// 	component: ShowComponent
			// },
			// {path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [WhoIsUsComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
	]
})
export class WhoIsUsModule {
}
