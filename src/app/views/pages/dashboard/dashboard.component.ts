import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';


import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {InitializeComponentInterface} from '../../shared/Base-Interface/Initialize.Component.Interface';
import {Router} from '@angular/router';
import {HelperService} from '../../../core/services/helper.service';
import {StatisticsService} from '../../../core/services/Section-Module/statistics.service';
import {StatisticsModel} from '../../../core/models/section-module/statistics.model';
import {SectionIconsName} from '../../../core/Global/section.icons.name';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	navigationSubscription;

	isLoadingResults: boolean = true;

	statistics:StatisticsModel;


	constructor(
				private translate: TranslateService,
				private router: Router,
				private service: StatisticsService,
				private helper: HelperService,
				private cdr: ChangeDetectorRef) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	// onInit get Data from api
	ngOnInit() {
		this.initialiseComponent();
	}

	initialiseComponent() {
		this.get();
	}

	get() {
		this.isLoadingResults = true;
		this.service.get().subscribe(
			(resp) => {
				this.statistics = resp;
				this.isLoadingResults = false;
				this.cdr.markForCheck();
			}, error => {
				this.isLoadingResults = false;
				this.cdr.markForCheck();
			});
	}


	onSelect(event) {

	}

	ngOnDestroy(): void {

		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}

	VIDEOS(){
		return  SectionIconsName.VIDEOS();
	}

	ACTIVITIES(){
		return  SectionIconsName.ACTIVITIES();
	}

	advisoryBody(){
		return  SectionIconsName.advisoryBody();
	}

	magazineNews(){
		return  SectionIconsName.magazineNews();
	}

	EVENTS(){
		return  SectionIconsName.EVENTS();
	}


}
