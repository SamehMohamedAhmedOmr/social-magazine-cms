import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {InitializeComponentInterface} from '../../../shared/Base-Interface/Initialize.Component.Interface';
import {FormErrorService} from '../../../../core/services/FormError.service';
import {AuthNoticeService} from '../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../core/services/helper.service';
import {PopupGalleryComponent} from '../../../shared/popup-gallery/popup-gallery.component';
import {Base64ImageHelperService} from '../../../../core/services/Helpers/base64.image.helper.service';
import {ClientsService} from '../../../../core/services/Clients-Module/clients.service';
import {ClientsModel} from '../../../../core/models/Clients-Module/clients.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'kt-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	navigationSubscription;
	isValidationError:boolean = false;

	isLoadingResults: boolean = true;
	id = null;
	form: FormGroup;

	imgURL:any = null;

	gallery_type:string = null;
	gallery_name:string = null;
	images:[] = [];

	constructor(private fb: FormBuilder ,
				private service : ClientsService,
				private base64ImageHelperService: Base64ImageHelperService,
				private formErrorService: FormErrorService,
				private route: ActivatedRoute,
				private router:Router,
				public dialog: MatDialog,
				private datePipe: DatePipe,
				private cdr: ChangeDetectorRef,
				private authNoticeService: AuthNoticeService,
				private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	ngOnInit() {
		this.initialiseComponent();
	}

	initialiseComponent() {
		this.isLoadingResults = true;
		this.get();
	}

	/**
	 * get Data
	 *
	 */
	private get() {
		this.isLoadingResults = true;
		this.route.params.subscribe((resp) => {
			this.id = resp['id'];
			// call api to get banner
			this.service.get(this.id).subscribe(
				(data) => {
					this.initializeForm(data);
					this.imgURL = data.image;
					this.cdr.markForCheck();
				} , error => {
					this.authNoticeService.setNotice('Client Not Found or not exists anymore', 'danger');
					this.isLoadingResults = false;
					this.isValidationError = true;
					this.cdr.markForCheck();
				}
			)
		});
	}

	private initializeForm (data) {
		this.form = this.fb.group({
			image: [''] ,
			expiration_date: [data.expiration_date, Validators.required],
			languages: this.fb.array(
				this.createLanguages(data)
			)
		});
		this.isLoadingResults = false;
		this.cdr.markForCheck();
	}

	private createLanguages(data) {
		let container = [];
		let available_languages = ['English', 'العربية'];
		for (let available_language of available_languages) {
			let lang = (available_language == 'English') ? 'en' : 'ar';


			let title = (data.title) ? this.getLangData(data.title, lang) : '';
			let description = (data.description) ?  this.getLangData(data.description, lang) : '';
			let message = (data.message) ? this.getLangData(data.message, lang) : '';

			container.push(this.fb.group({
				description: [description] ,
				title: [title] ,
				message: [message] ,
				lang: [available_language , Validators.required]
			}));
		}
		return container;
	}

	private getLangData(object, lang){
		let target_value = null;
		if (object){
			if (object[lang]){
				target_value = object[lang];
			}
		}
		return target_value;
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to validators name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		return this.formErrorService.isControlHasError(this.form,controlName,validationType);

	}

	isLanguageHasError(index , controlName: string, validationType: string): boolean {
		return this.formErrorService.isLanguageHasError(this.form, index, controlName, validationType)
	}


	updateForm () {
		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		// @ts-ignore
		let lang_objects = this.form.get('languages').controls;

		lang_objects = this.service.prepareObject(lang_objects);

		let expiration_date = this.transformDate(controls['expiration_date'].value);

		let project = new ClientsModel(this.id);
		project.messages = lang_objects['messages'];
		project.descriptions = lang_objects['descriptions'];
		project.titles = lang_objects['titles'];
		project.image = this.form.controls['image'].value;
		project.expiration_date = expiration_date;


		// call service to store Banner
		this.isLoadingResults = true;
		this.service.update(this.id , project).subscribe(resp => {
			this.isLoadingResults = false;
			this.authNoticeService.setNotice('Client Updated Successfully', 'success');
			this.cdr.markForCheck();
			this.router.navigate(['../'], { relativeTo: this.route }).then();
		} , handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
			this.isLoadingResults = false;
			this.isValidationError = true;
			this.cdr.markForCheck();
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.isLoadingResults = false;

		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}

		if (this.isValidationError){
			this.authNoticeService.setNotice(null);
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
		// @ts-ignore
		this.images = [];
		this.gallery_name = 'Company';
		this.openGalleryDialog();
	}

	openGalleryDialog() {
		const dialogRef = this.dialog.open(PopupGalleryComponent, {
			width: '100vw',
			panelClass: 'full-screen-modal',
			data: {
				title: "Add " + this.gallery_name + " Image",
				gallery_type: 'COMPANIES',
				selectedImages: this.images,
				galleryInterface: this,
				multiple_images:false,
			}
		});
		dialogRef.afterClosed().subscribe(result => {
		});
	}

	// set image to form data
	onFileSelect(event) {
		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = (_event) => {
				this.imgURL = reader.result;
				this.getImage(this.imgURL);
				this.cdr.markForCheck();
			}
		}
	}

	getImage(imageUrl: string) {
		this.base64ImageHelperService.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
			this.form.controls['image'].setValue(base64Data);
		});
	}

	transformDate(date) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}
}
