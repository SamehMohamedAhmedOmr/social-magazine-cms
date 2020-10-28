import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../pages.module';
import {MatDividerModule, MatProgressBarModule, MatStepperModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import {ClientsComponent} from './clients.component';


const routes: Routes = [
	{
		path: '',
		component: ClientsComponent,
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'add',
				component: AddComponent
			},
			{
				path: ':id',
				component: EditComponent
			},
			{
				path: 'details/:id',
				component: ShowComponent
			},
			{path: '**', redirectTo: '', pathMatch: ''},
		]
	}
];

@NgModule({
	declarations: [ClientsComponent, IndexComponent, AddComponent, EditComponent, ShowComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
		MatStepperModule,
		MatProgressBarModule,
	]
})
export class ClientsModule {
}
