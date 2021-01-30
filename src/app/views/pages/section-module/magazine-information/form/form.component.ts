import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
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

	Editor = DecoupledEditor;
	config_vision = {};
	config_mission = {};

	constructor(private translate: TranslateService) {
		this.initializeConfig();
	}

	ngOnInit() {
	}

	initializeConfig(){

		this.config_vision = {
			language : (localStorage.getItem('cms_lang') == 'en') ? 'en-au' : 'ar',
			placeholder : this.translate.instant('Components.MAGAZINE_INFORMATION.columns.vision')
		};

		this.config_mission = {
			language : (localStorage.getItem('cms_lang') == 'en') ? 'en-au' : 'ar',
			placeholder : this.translate.instant('Components.MAGAZINE_INFORMATION.columns.mission')
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
