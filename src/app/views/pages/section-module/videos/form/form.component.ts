import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
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
