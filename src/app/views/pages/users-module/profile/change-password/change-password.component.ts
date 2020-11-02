import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormErrorService} from '../../../../../core/services/FormError.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthNoticeService} from '../../../../../core/services/auth-notice.service';
import {TranslateService} from '@ngx-translate/core';
import {HelperService} from '../../../../../core/services/helper.service';
import {ResetPasswordService} from '../../../../../core/services/User-Module/reset.password.service';
import {InitializeComponentInterface} from '../../../../shared/Base-Interface/Initialize.Component.Interface';
import {ResetPasswordModel} from '../../../../../core/models/User-Module/reset.password.model';

@Component({
	selector: 'kt-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit,  OnDestroy, InitializeComponentInterface {

	isLoadingResults: any = true;
	form: FormGroup;
	navigationSubscription;
	isValidationError:boolean = false;

	constructor(private formBuilder: FormBuilder ,
				private service: ResetPasswordService,
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
	}

	initialiseComponent() {
		this.isLoadingResults = false;
		this.initializeForm();
	}

	initializeForm() {
		this.form = this.formBuilder.group({
			// Basic Data
			old_password:['', Validators.required] ,
			new_password:['', Validators.required] ,
		});

		this.isLoadingResults = false;
		this.cdr.markForCheck();
	}

	updateForm () {
		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}


		let model = new ResetPasswordModel(null);
		model.new_password = controls['new_password'].value;
		model.old_password = controls['old_password'].value;



		this.isLoadingResults = true;
		this.service.create(model).subscribe(resp => {
			this.isLoadingResults = false;
			this.authNoticeService.setNotice(this.translateService.instant('COMMON.Edited_successfully',
				{name : this.translateService.instant('COMMON.password') }),
				'success');
			this.cdr.markForCheck();
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
