import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdvisoryBodyComponent} from './advisory-body.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {RoutesName} from '../../../../core/Global/routes.name';

const routes: Routes = [
	{
		path: '',
		component: AdvisoryBodyComponent,
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
			// {path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [AdvisoryBodyComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
	]
})
export class AdvisoryBodyModule {
}
