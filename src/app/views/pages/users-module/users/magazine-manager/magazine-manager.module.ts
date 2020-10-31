import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MagazineManagerComponent} from './magazine-manager.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {RoutesName} from '../../../../../core/Global/routes.name';

const routes: Routes = [
	{
		path: '',
		component: MagazineManagerComponent,
		children: [
			// {
			// 	path: '',
			// 	component: IndexComponent
			// },
			// {
			// path: RoutesName.add(),
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
			//{path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [MagazineManagerComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
	]
})
export class MagazineManagerModule {
}
