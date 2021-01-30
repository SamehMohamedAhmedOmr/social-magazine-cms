import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../../../core/services/helper.service';
import {FormErrorService} from '../../../../../../core/services/FormError.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InitializeComponentInterface} from '../../../../../shared/Base-Interface/Initialize.Component.Interface';
import {TranslateService} from '@ngx-translate/core';
import {UsersService} from '../../../../../../core/services/User-Module/users.service';
import {UsersModel} from '../../../../../../core/models/User-Module/users.model';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	page_name:string;
	content_name: string;

	navigationSubscription;
	isValidationError:boolean = false;

	isLoadingResults: any = true;
	form: FormGroup;

	educational_form: FormGroup;

	constructor(private fb: FormBuilder ,
				private service: UsersService,
				private formErrorService: FormErrorService,
				private route: ActivatedRoute,
				private router:Router,
				public translateService : TranslateService,
				private authNoticeService: AuthNoticeService,
				private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	ngOnInit() {
		this.initialiseComponent();
		this.page_name = this.translateService.instant('Components.USERS.MAGAZINE_EDITOR_MANAGER');
		this.content_name = this.translateService.instant('Components.USERS.MAGAZINE_EDITOR_MANAGER_SINGLE');
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
			// Basic Data
			first_name:['', Validators.required] ,
			family_name:['', Validators.required] ,
			email:['', Validators.required] ,
			password:['', Validators.required] ,
			gender:['', Validators.required] ,
			account_type_id:[1] ,
			phone:['', Validators.required] ,
			country:['', Validators.required] ,


			// Additional Data
			alternative_email:[''] ,
			address:[''] ,
		});

		this.educational_form = this.fb.group({
			// Educational Data
			educational_degree:['', Validators.required] ,
			educational_level:['', Validators.required] ,
			title:['', Validators.required] ,
		});
	}


	clearForm() {
		this.form.reset();
		this.educational_form.reset();
	}

	submitForm () {
		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		const controls_educational_form = this.educational_form.controls;
		/** showing Errors  */
		if (this.educational_form.invalid) {
			return this.formErrorService.markAsTouched(controls_educational_form);
		}

		const model = new UsersModel(null);

		model.initialLists();

		model.first_name = controls['first_name'].value;
		model.family_name = controls['family_name'].value;
		model.email = controls['email'].value;
		model.password = controls['password'].value;
		model.gender.id = controls['gender'].value;
		model.account_type_id = controls['account_type_id'].value;
		model.phone_number = controls['phone'].value;
		model.country.id = controls['country'].value;

		model.alternative_email = controls['alternative_email'].value;
		model.address = controls['address'].value;

		model.title.id = controls_educational_form['title'].value;
		model.educational_degree.id = controls_educational_form['educational_degree'].value;
		model.educational_level.id = controls_educational_form['educational_level'].value;

		// call service to store Banner
		this.isLoadingResults = true;
		this.service.create(model).subscribe(resp => {
			this.form.reset();
			this.isLoadingResults = false;
			this.authNoticeService.setNotice(this.translateService.instant('COMMON.Added_successfully',
				{name : this.content_name}),
				'success');
			this.router.navigate(['../'], { relativeTo: this.route }).then();
		} , handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
			this.isLoadingResults = false;
			this.isValidationError = true;
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
