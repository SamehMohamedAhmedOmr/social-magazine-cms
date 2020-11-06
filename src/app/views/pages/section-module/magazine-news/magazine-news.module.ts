import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MagazineNewsComponent} from './magazine-news.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {RoutesName} from '../../../../core/Global/routes.name';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {FormComponent} from './form/form.component';
import {GalleryModule} from '@ngx-gallery/core';

const routes: Routes = [
	{
		path: '',
		component: MagazineNewsComponent,
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
			{path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [
		MagazineNewsComponent, IndexComponent, AddComponent, EditComponent, FormComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
		GalleryModule,
	]
})
export class MagazineNewsModule {
}
