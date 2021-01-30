import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicationRuleComponent} from './publication-rule.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {EditComponent} from './edit/edit.component';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {FormComponent} from './form/form.component';
import {RoutesName} from '../../../../core/Global/routes.name';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
	{
		path: '',
		component: PublicationRuleComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: RoutesName.add(),
				component: AddComponent
			},
			{
				path: ':id',
				component: EditComponent
			},
			// {
			// 	path: 'details/:id',
			// 	component: ShowComponent
			// },
			{path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [PublicationRuleComponent, IndexComponent, AddComponent, EditComponent, FormComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
		CKEditorModule,
	]
})
export class PublicationRuleModule {
}
