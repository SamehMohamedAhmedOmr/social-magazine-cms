import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import {
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTooltipModule, MatButtonModule, MatDatepickerModule, MatCheckboxModule, MatIconModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ApiLoaderComponent } from './api-loader/api-loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { GalleryComponent } from './gallery/gallery.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {AuthNoticeComponent} from './auth-notice/auth-notice.component';
import {SuccessModalComponent} from './success-model/success-modal.component';
import { NextPreviousListComponent } from './next-previous-list/next-previous-list.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import { PopupGalleryComponent } from './popup-gallery/popup-gallery.component';
import {GlobalNoticeComponent} from './global-notice/global-notice.component';
import { SoonComponent } from './soon/soon.component';
import { NoRecordFoundComponent } from './no-record-found/no-record-found.component';
import { FormErrorComponent } from './form-error/form-error.component';
import { ListOptionsComponent } from './list-options/list-options.component';



@NgModule({
    declarations: [
		AuthNoticeComponent,GlobalNoticeComponent,
    	FilterComponent, ApiLoaderComponent,
		DeleteModalComponent, GalleryComponent,
		SuccessModalComponent, NextPreviousListComponent, PopupGalleryComponent,
		SoonComponent, NoRecordFoundComponent, FormErrorComponent, ListOptionsComponent,
	],
    imports: [
        CommonModule,
        MatSelectModule,
        RouterModule,
        FormsModule,
        MatDividerModule,
        MatRadioModule,
        MatInputModule,
        MatProgressSpinnerModule,
        TranslateModule,
        MatDialogModule,
        ReactiveFormsModule,
        DragDropModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatButtonModule,
        MatDatepickerModule,
        NgxMatSelectSearchModule,
        MatCheckboxModule,
        MatIconModule,
    ],
    entryComponents: [
        DeleteModalComponent,
		SuccessModalComponent,
		PopupGalleryComponent,
    ],
	exports: [
		FilterComponent,
		ApiLoaderComponent,
		DeleteModalComponent,
		SuccessModalComponent,
		GalleryComponent,
		AuthNoticeComponent,
		GlobalNoticeComponent,
		NextPreviousListComponent,
		SoonComponent,
		NoRecordFoundComponent,
		FormErrorComponent,
		ListOptionsComponent,
	]
})
export class SharedModule { }
