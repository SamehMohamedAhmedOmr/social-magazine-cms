import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MagazineInformationComponent} from './magazine-information.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule, MatStepperModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {EditComponent} from './edit/edit.component';
import {FormComponent} from './form/form.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

const routes: Routes = [
	{
		path: '',
		component: MagazineInformationComponent,
		children: [
			{
				path: '',
				component: EditComponent
			},
		]
	}
];

@NgModule({
	declarations: [MagazineInformationComponent, EditComponent , FormComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        PagesModule,
        MatDividerModule,
        TranslateModule,
        MatStepperModule,
        CKEditorModule,
    ]
})
export class MagazineInformationModule {
}
