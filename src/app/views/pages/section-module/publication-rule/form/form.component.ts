import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {CkEditorUploadImageModel} from '../../../../../core/models/Base/ckEditor.upload.Image.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'kt-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

	@Input() form: FormGroup;

	Editor = DecoupledEditor;
	config = {};

	constructor(private translate: TranslateService) {
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
