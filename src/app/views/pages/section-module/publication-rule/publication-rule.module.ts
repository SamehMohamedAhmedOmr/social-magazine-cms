import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicationRuleComponent} from './publication-rule.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
	{
		path: '',
		component: PublicationRuleComponent,
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
	declarations: [PublicationRuleComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
	]
})
export class PublicationRuleModule {
}
