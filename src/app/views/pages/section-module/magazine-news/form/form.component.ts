import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PopupGalleryComponent} from '../../../../shared/popup-gallery/popup-gallery.component';
import {MatDialog} from '@angular/material';
import {GalleryItem, ImageItem} from '@ngx-gallery/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {TranslateService} from '@ngx-translate/core';
import {CkEditorUploadImageModel} from '../../../../../core/models/Base/ckEditor.upload.Image.model';

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

	Editor = DecoupledEditor;
	config = {};

	constructor(public dialog: MatDialog,
				private translate: TranslateService,
				private cdr: ChangeDetectorRef) {
		this.initializeConfig();
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

	initializeConfig(){
		this.config = {
			language : (localStorage.getItem('cms_lang') == 'en') ? 'en-au' : 'ar',
			placeholder : this.translate.instant('COMMON.content')
		};
	}

	onReady( editor ) {
		editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
			return new CkEditorUploadImageModel(loader);
		};

		editor.ui.getEditableElement().parentElement.insertBefore(
			editor.ui.view.toolbar.element,
			editor.ui.getEditableElement()
		);
	}

}
