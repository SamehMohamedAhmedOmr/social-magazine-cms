// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
import {MaterialPreviewModule} from "../partials/content/general/material-preview/material-preview.module";
// Pages
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSliderModule} from "@angular/material/slider";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {FormsComponent} from './Templates/forms/forms.component';
import {DataTablesComponent} from './Templates/data-tables/data-tables.component';
import {AnalyticsComponent} from './Templates/analytics/analytics.component';
import {GALLERY_CONFIG, GalleryModule} from '@ngx-gallery/core';
import {CustomDatePipe} from '../../core/models/Base/custom.datepipe';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PartialsModule,
		MaterialPreviewModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDatepickerModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatTableModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		NgxChartsModule,
		SharedModule,
		RouterModule,
		GalleryModule,
	],
	exports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PartialsModule,
		MaterialPreviewModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatRadioModule,
		MatDatepickerModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatTableModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,
		MatSortModule,
		NgxChartsModule,
		SharedModule,
		CustomDatePipe,
	],
	providers: [
		{
			provide: GALLERY_CONFIG,
			useValue: {
				dots: true,
				imageSize: 'contain'
			}
		}
	],
	declarations: [FormsComponent, DataTablesComponent, AnalyticsComponent, CustomDatePipe]
})
export class PagesModule {
}
