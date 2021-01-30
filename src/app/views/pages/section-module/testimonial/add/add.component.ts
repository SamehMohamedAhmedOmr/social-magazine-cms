import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthNoticeService} from '../../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../../core/services/helper.service';
import {FormErrorService} from '../../../../../core/services/FormError.service';
import {ActivatedRoute, Router} from '@angular/router';
import {InitializeComponentInterface} from '../../../../shared/Base-Interface/Initialize.Component.Interface';
import {TranslateService} from '@ngx-translate/core';
import {TestimonialService} from '../../../../../core/services/Section-Module/testimonial.service';
import {TestimonialModel} from '../../../../../core/models/section-module/testimonial.model';

@Component({
	selector: 'kt-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	page_name:string;
	content_name: string;
	dialog_title: string;

	navigationSubscription;
	isValidationError:boolean = false;

	isLoadingResults: any = true;
	form: FormGroup;
	constructor(private fb: FormBuilder ,
				private service: TestimonialService,
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
		this.page_name = this.translateService.instant('Components.TESTIMONIAL.name');
		this.content_name = this.translateService.instant('Components.TESTIMONIAL.single');

		this.dialog_title = this.translateService.instant('Components.TESTIMONIAL.add_image');
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
			name:['', Validators.required] ,
			content:['', Validators.required] ,
			stars:['', Validators.required] ,
			image:['', Validators.required] ,
			is_active: 		['1', Validators.required],
		});
	}


	clearForm() {
		this.form.reset();
	}

	submitForm () {
		const controls = this.form.controls;
		/** showing Errors  */
		if (this.form.invalid) {
			return this.formErrorService.markAsTouched(controls);
		}

		const model = new TestimonialModel(null);
		model.is_active = controls['is_active'].value;
		model.name = controls['name'].value;
		model.content = controls['content'].value;
		model.image_id = controls['image'].value;
		model.stars = controls['stars'].value;

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
