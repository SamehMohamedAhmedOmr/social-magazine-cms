import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthNoticeService} from '../../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../../core/services/helper.service';
import {FormErrorService} from '../../../../../core/services/FormError.service';
import {InitializeComponentInterface} from '../../../../shared/Base-Interface/Initialize.Component.Interface';
import {TranslateService} from '@ngx-translate/core';
import {MagazineInformationService} from '../../../../../core/services/Section-Module/magazine.information.service';
import {MagazineInformationModel} from '../../../../../core/models/section-module/magazine.information.model';

@Component({
	selector: 'kt-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	page_name:string;
	content_name: string;

	navigationSubscription;
	isValidationError:boolean = false;

	isLoadingResults: any = true;
	form: FormGroup;
	model: MagazineInformationModel;

	is_result:boolean;

	constructor(private formBuilder: FormBuilder ,
				private service: MagazineInformationService,
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
		this.page_name = this.translateService.instant('Components.MAGAZINE_INFORMATION.name');
		this.content_name = this.translateService.instant('Components.MAGAZINE_INFORMATION.name');
	}

	initialiseComponent() {
		this.isLoadingResults = false;
		this.is_result = false;
		this.get();
	}


	private get() {
		this.isLoadingResults = true;
		this.service.get().subscribe(
			(data) => {
				this.is_result = true;
				this.model = data;
				this.initializeForm();
			} , error => {
				this.authNoticeService.setNotice(this.translateService.instant('COMMON.Item_not_found',
					{name : this.content_name}),
					'danger');
				this.isLoadingResults = false;
				this.isValidationError = true;
				this.cdr.markForCheck();
			}
		);
	}

	/**
	 * Initiate the form
	 *
	 */
	initializeForm() {
		this.form = this.formBuilder.group({
			title:		[this.model.title] ,
			vision:		[this.model.vision] ,
			mission: 	[this.model.mission],
			address: 	[this.model.address],
			phone: 	[this.model.phone],
			fax_number: 	[this.model.fax_number],
			email: 	[this.model.email],
			postal_code: 	[this.model.postal_code],
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

		this.model.vision = controls['vision'].value;
		this.model.mission = controls['mission'].value;
		this.model.address = controls['address'].value;
		this.model.phone = controls['phone'].value;
		this.model.fax_number = controls['fax_number'].value;
		this.model.email = controls['email'].value;
		this.model.postal_code = controls['postal_code'].value;

		// call service to store shipping rule
		this.isLoadingResults = true;
		this.service.create(this.model).subscribe(resp => {
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
