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

	@Input() images:[] = [];

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
		if (this.images.length){
			this.generateSlider(this.images);
		}
	}


	attach(items, selectedImages) {
		this.dialog.closeAll();
		if (items.length){
			this.generateSlider(selectedImages);
			this.form.controls['images'].setValue(items);
			this.cdr.markForCheck();
		}
	}

	private generateSlider(productImages){
		let slider = [];
		productImages.forEach((image) => {
			let imageItem = new ImageItem({ src: image.image, thumb: image.thumbnail });
			slider.push(imageItem);
		});
		this.old_images = slider;
		console.log(this.old_images);
		this.cdr.markForCheck();
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
				multiple_images:true,
			}
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

}
