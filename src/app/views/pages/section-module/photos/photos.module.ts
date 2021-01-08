import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhotosComponent} from './photos.component';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {FormComponent} from './form/form.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {GalleryModule} from '@ngx-gallery/core';
import {RoutesName} from '../../../../core/Global/routes.name';

const routes: Routes = [
	{
		path: '',
		component: PhotosComponent,
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
	declarations: [PhotosComponent, IndexComponent, AddComponent, EditComponent, FormComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
		GalleryModule,
	]
})
export class PhotosModule {
}
