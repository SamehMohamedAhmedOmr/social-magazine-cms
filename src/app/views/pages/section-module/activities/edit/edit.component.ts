import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthNoticeService} from '../../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../../core/services/helper.service';
import {FormErrorService} from '../../../../../core/services/FormError.service';
import {InitializeComponentInterface} from '../../../../shared/Base-Interface/Initialize.Component.Interface';
import {TranslateService} from '@ngx-translate/core';
import {ActivitiesService} from '../../../../../core/services/Section-Module/activities.service';
import {ActivitiesModel} from '../../../../../core/models/section-module/activities.model';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	page_name:string;
	content_name: string;
	dialog_title: string;

	navigationSubscription;
	isValidationError:boolean = false;

	isLoadingResults: any = true;
	form: FormGroup;
	model: ActivitiesModel;

	id = null;
	is_result:boolean;

	images:[] = [];

	constructor(private formBuilder: FormBuilder ,
				private service: ActivitiesService,
				private formErrorService: FormErrorService,
				private route: ActivatedRoute,
				private router:Router,
				private cdr: ChangeDetectorRef,
				private authNoticeService: AuthNoticeService,
				public translateService : TranslateService,
				private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	ngOnInit() {
		this.initialiseComponent();
		this.page_name = this.translateService.instant('Components.ACTIVITIES.name');
		this.content_name = this.translateService.instant('Components.ACTIVITIES.single');
		this.dialog_title = this.translateService.instant('Components.ACTIVITIES.add_image');
	}

	initialiseComponent() {
		this.isLoadingResults = false;
		this.is_result = false;
		this.get();
	}


	private get() {
		this.isLoadingResults = true;
		this.route.params.subscribe((resp) => {
			this.id = resp['id'];
			// call api to get shipping rule
			this.service.get(this.id).subscribe(
				(data) => {
					this.is_result = true;
					this.model = data;
					// @ts-ignore
					this.images = this.model.images;
					this.cdr.markForCheck();
					this.initializeForm();
				} , error => {
					this.authNoticeService.setNotice(this.translateService.instant('COMMON.Item_not_found',
						{name : this.content_name}),
						'danger');
					this.isLoadingResults = false;
					this.isValidationError = true;
					this.cdr.markForCheck();
				}
			)
		});
	}

	/**
	 * Initiate the form
	 *
	 */
	initializeForm() {
		this.form = this.formBuilder.group({
			title:		[this.model.title +'', Validators.required] ,
			content:	[this.model.content +'', Validators.required] ,
			images:		[''] ,
			is_active: 	[this.model.is_active + '', Validators.required],
		});

		this.isLoadingResults = false;
		this.cdr.markForCheck();

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

	updateForm () {
		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		this.model.title = controls['title'].value;
		this.model.content = controls['content'].value;
		this.model.images = (controls['images'].value) ?  controls['images'].value : [];

		this.model.is_active = controls['is_active'].value;

		// call service to store shipping rule
		this.isLoadingResults = true;
		this.service.update(this.model.id,this.model).subscribe(resp => {
			this.isLoadingResults = false;
			this.authNoticeService.setNotice(this.translateService.instant('COMMON.Edited_successfully',
				{name : this.content_name}),
				'success');
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

}
