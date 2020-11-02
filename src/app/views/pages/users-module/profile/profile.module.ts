import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule, MatTabsModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {EditComponent} from './edit/edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {FormComponent} from './change-password/form/form.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [ProfileComponent, EditComponent, ChangePasswordComponent, FormComponent, IndexComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
		MatTabsModule,
	]
})
export class ProfileModule {
}
