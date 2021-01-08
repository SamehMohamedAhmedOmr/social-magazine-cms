import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PopupGalleryComponent} from '../../../../shared/popup-gallery/popup-gallery.component';
import {MatDialog} from '@angular/material';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';

@Component({
	selector: 'kt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Input() form: FormGroup;

	@Input() dialog_title:string;

	stars:{
		value: number,
		stars : string
	}[] = [];

	gallery_type;

	@Input() old_images: GalleryItem[] = [];

	constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {

	}




}
