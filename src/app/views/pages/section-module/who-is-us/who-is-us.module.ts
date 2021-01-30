import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WhoIsUsComponent} from './who-is-us.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {FormComponent} from './form/form.component';
import {RoutesName} from '../../../../core/Global/routes.name';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
	{
		path: '',
		component: WhoIsUsComponent,
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
	declarations: [WhoIsUsComponent, IndexComponent, AddComponent, EditComponent, FormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PagesModule,
        MatDividerModule,
        TranslateModule,
        CKEditorModule,
    ]
})
export class WhoIsUsModule {
}
