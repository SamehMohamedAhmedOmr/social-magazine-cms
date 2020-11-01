import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {InitializeComponentInterface} from '../../../../../shared/Base-Interface/Initialize.Component.Interface';
import {AdvisoryBodyModel} from '../../../../../../core/models/section-module/advisory.body.model';
import {FormErrorService} from '../../../../../../core/services/FormError.service';
import {AuthNoticeService} from '../../../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../../../core/services/helper.service';
import {UsersService} from '../../../../../../core/services/User-Module/users.service';
import {UsersModel} from '../../../../../../core/models/User-Module/users.model';


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
	educational_form: FormGroup;

	model: UsersModel;

	id = null;
	is_result:boolean;

	constructor(private formBuilder: FormBuilder ,
				private service: UsersService,
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
		this.page_name = this.translateService.instant('Components.USERS.REFEREES');
		this.content_name = this.translateService.instant('Components.USERS.REFEREES_SINGLE');
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

		let gender =  (this.model.gender) ? this.model.gender.id : null;
		let country =  (this.model.country) ? this.model.country.id : null;
		let educational_degree =  (this.model.educational_degree) ? this.model.educational_degree.id : null;
		let educational_level =  (this.model.educational_level) ? this.model.educational_level.id : null;
		let title =  (this.model.title) ? this.model.title.id : null;

		this.form = this.formBuilder.group({
			// Basic Data
			first_name:[this.model.first_name, Validators.required] ,
			family_name:[this.model.family_name, Validators.required] ,
			email:[this.model.email, Validators.required] ,
			gender:[gender, Validators.required] ,
			phone:[this.model.phone_number, Validators.required] ,
			country:[country, Validators.required] ,


			// Additional Data
			fax_number:[this.model.fax_number] ,
			alternative_email:[this.model.alternative_email] ,
			address:[this.model.address] ,
		});

		this.educational_form = this.formBuilder.group({
			// Educational Data
			educational_degree:[educational_degree, Validators.required] ,
			educational_level:[educational_level, Validators.required] ,
			title:[title, Validators.required] ,
			educational_field:[this.model.educational_field] ,
			university:[this.model.university] ,
			faculty:[this.model.faculty] ,
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

		const controls_educational_form = this.educational_form.controls;
		/** showing Errors  */
		if (this.educational_form.invalid) {
			return this.formErrorService.markAsTouched(controls_educational_form);
		}

		this.model.initialLists();


		this.model.first_name = controls['first_name'].value;
		this.model.family_name = controls['family_name'].value;
		this.model.email = controls['email'].value;
		this.model.gender.id = controls['gender'].value;
		this.model.phone_number = controls['phone'].value;
		this.model.country.id = controls['country'].value;

		this.model.fax_number = controls['fax_number'].value;
		this.model.alternative_email = controls['alternative_email'].value;
		this.model.address = controls['address'].value;

		this.model.title.id = controls_educational_form['title'].value;
		this.model.educational_degree.id = controls_educational_form['educational_degree'].value;
		this.model.educational_level.id = controls_educational_form['educational_level'].value;
		this.model.educational_field = controls_educational_form['educational_field'].value;
		this.model.university = controls_educational_form['university'].value;
		this.model.faculty = controls_educational_form['faculty'].value;

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
