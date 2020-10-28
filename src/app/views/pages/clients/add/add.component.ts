import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {InitializeComponentInterface} from '../../../shared/Base-Interface/Initialize.Component.Interface';
import {AuthNoticeService} from '../../../../core/services/auth-notice.service';
import {FormErrorService} from '../../../../core/services/FormError.service';
import {HelperService} from '../../../../core/services/helper.service';
import {PopupGalleryComponent} from '../../../shared/popup-gallery/popup-gallery.component';
import {JobStatusService} from '../../../../core/services/Clients-Module/job.status.service';
import {ClientsService} from '../../../../core/services/Clients-Module/clients.service';
import {ClientsModel} from '../../../../core/models/Clients-Module/clients.model';
import {DatePipe} from '@angular/common';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	navigationSubscription;
	isValidationError: boolean = false;

	isLoadingResults: any = true;
	run_job: boolean = false;
	installation_progress: number = 0;

	form: FormGroup;

	imgURL: any = null;

	gallery_type:string = null;
	gallery_name:string = null;
	images:[] = [];

	delay = ms => new Promise(res => setTimeout(res, ms));

	constructor(private fb: FormBuilder,
				private service: ClientsService,
				private jobStatusService : JobStatusService,
				private formErrorService: FormErrorService,
				private authNoticeService: AuthNoticeService,
				private datePipe: DatePipe,
				private route: ActivatedRoute,
				public dialog: MatDialog,
				private router: Router,
				private cdr: ChangeDetectorRef,
				private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	ngOnInit() {
		this.initialiseComponent();
	}

	initialiseComponent() {
		this.isLoadingResults = false;
		this.initForm();
	}

	/**
	 * Initiate the form
	 *
	 */
	private initForm() {
		this.form = this.fb.group({
			app_name: ['', Validators.required],
			admin_email : ['', Validators.required],
			admin_password : ['', Validators.required],
			expiration_date: ['', Validators.required],
		});
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to validators name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		return this.formErrorService.isControlHasError(this.form, controlName, validationType);
	}

	clearForm() {
		this.form.reset();
		this.initForm();
	}

	submitForm() {
		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		// call service to store Banner
		this.isLoadingResults = true;

		let expiration_date = this.transformDate(controls['expiration_date'].value);

		let project = new ClientsModel(null);
		project.name = controls['app_name'].value;
		project.admin_email = controls['admin_email'].value;
		project.admin_password = controls['admin_password'].value;
		project.expiration_date = expiration_date;


		this.service.create(project).subscribe(resp => {
			this.clearForm();
			let job_id = resp.id;
			this.run_job = true;
			this.isLoadingResults = false;
			this.cdr.markForCheck();
			this.runJobStatus(job_id);
		}, handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
			this.isLoadingResults = false;
			this.isValidationError = true;
		});
	}


	runJobStatus(id){
		this.jobStatusService.get(id).subscribe(async resp => {
			this.installation_progress = resp.progress_percentage;
			this.cdr.markForCheck();
			if (resp.status == 'failed'){
				this.authNoticeService.setNotice('Client Install Failed', 'danger');
				this.isLoadingResults = false;
				this.isValidationError = true;
			}
			else if (resp.status == 'finished'){
				this.isLoadingResults = false;
				this.authNoticeService.setNotice('Client Added Successfully', 'success');
				this.router.navigate(['../details/'+ resp.project.id], {relativeTo: this.route}).then();
			}
			else{
				await this.delay(5000);
				this.runJobStatus(id);
			}
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

	transformDate(date) {
		return this.datePipe.transform(date, 'yyyy-MM-dd');
	}

}
