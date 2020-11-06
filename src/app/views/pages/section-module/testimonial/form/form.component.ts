import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PopupGalleryComponent} from '../../../../shared/popup-gallery/popup-gallery.component';
import {MatDialog} from '@angular/material';

@Component({
	selector: 'kt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Input() form: FormGroup;

	@Input() images:[] = [];

	@Input() dialog_title:string;

	stars:{
		value: number,
		stars : string
	}[] = [];

	gallery_type;

	@Input() imgURL: any = null;

	constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.initializeStars();
	}


	initializeStars(){
		this.stars.push(this.prepareObject(1,'⭐'));
		this.stars.push(this.prepareObject(2,'⭐⭐'));
		this.stars.push(this.prepareObject(3,'⭐⭐⭐'));
		this.stars.push(this.prepareObject(4,'⭐⭐⭐⭐'));
		this.stars.push(this.prepareObject(5,'⭐⭐⭐⭐⭐'));
	}

	prepareObject(value, stars){
		return {
			value: value,
			stars : stars
		}
	}

	attach(items, selectedImages) {
		this.dialog.closeAll();
		if (items.length){
			this.imgURL = (selectedImages[0]) ? selectedImages[0].image : null;
			this.form.controls['image'].setValue(items[0]);
			this.cdr.markForCheck();
		}
	}

	showGallery(type) {
		this.gallery_type = type;
		this.openGalleryDialog();
	}

	openGalleryDialog() {
		const dialogRef = this.dialog.open(PopupGalleryComponent, {
			width: '100vw',
			panelClass: 'full-screen-modal',
			data: {
				title: this.dialog_title,
				gallery_type: this.gallery_type,
				selectedImages: this.images,
				galleryInterface: this,
				multiple_images:false,
			}
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

}
