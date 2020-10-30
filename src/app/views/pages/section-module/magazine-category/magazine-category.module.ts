import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MagazineCategoryComponent} from './magazine-category.component';
import {RouterModule} from '@angular/router';
import {PagesModule} from '../../pages.module';
import {MatDividerModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
	declarations: [MagazineCategoryComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		PagesModule,
		MatDividerModule,
		TranslateModule,
	]
})
export class MagazineCategoryModule {
}
