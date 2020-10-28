import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {InitializeComponentInterface} from '../../../shared/Base-Interface/Initialize.Component.Interface';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthNoticeService} from '../../../../core/services/auth-notice.service';
import {HelperService} from '../../../../core/services/helper.service';
import {ClientsService} from '../../../../core/services/Clients-Module/clients.service';
import {ClientsModel} from '../../../../core/models/Clients-Module/clients.model';

@Component({
	selector: 'kt-show',
	templateUrl: './show.component.html',
	styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	navigationSubscription;
	isValidationError:boolean = false;

	isLoadingResults: boolean = true;

	id = null;

	imgURL:any = null;

	project: ClientsModel;

	constructor(private service : ClientsService,
				private route: ActivatedRoute,
				private router:Router,
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
			this.service.show(this.id).subscribe(
				(data) => {
					this.project = data;
					this.imgURL = data.image;
					this.isLoadingResults = false;
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
