import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MagazineRefereesComponent} from './magazine-referees.component';
import {RouterModule, Routes} from '@angular/router';
import {PagesModule} from '../../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {RoutesName} from '../../../../../core/Global/routes.name';
import {IndexComponent} from './index/index.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
	{
		path: '',
		component: MagazineRefereesComponent,
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
	declarations: [MagazineRefereesComponent, IndexComponent, AddComponent, EditComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
	]
})
export class MagazineRefereesModule {
}