import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';


import {TranslateService, TranslationChangeEvent} from '@ngx-translate/core';
import {InitializeComponentInterface} from '../../shared/Base-Interface/Initialize.Component.Interface';
import {Router} from '@angular/router';
import {HelperService} from '../../../core/services/helper.service';

@Component({
	selector: 'kt-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy, InitializeComponentInterface {

	navigationSubscription;

	isLoadingResults: boolean = true;


	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Number';
	showYAxisLabel = true;
	autoScale: true;
	yAxisLabel = 'Color Value';
	timeline = true;
	// colors
	colorScheme = {
		domain: [
			'#e74c3c',
			'#27ae60',
			'#f1c40f',
			'#8e44ad'
		]
	};

	orders_counts: any[] = [];
	orders_prices: any[] = [];


	pending_cart_item_count:number = 0;
	pending_carts_count:number = 0;
	new_customers:string = '0';


	constructor(
				private translate: TranslateService,
				private router: Router,
				private helper: HelperService,
				private cdr: ChangeDetectorRef) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	// onInit get Data from api
	ngOnInit() {
		this.initialiseComponent();
	}

	initialiseComponent() {
		// this.get();
	}

	// call api to get Banner Data from the server
	// get() {
	// 	this.isLoadingResults = true;
	// 	this.service.get().subscribe(
	// 		(resp) => {
	// 			this.isLoadingResults = false;
	// 			this.prepareOrderStatistics(resp);
	// 			this.pending_cart_item_count = resp.carts.pending_cart_item_count;
	// 			this.pending_carts_count = resp.carts.pending_carts_count;
	// 			this.new_customers = resp.new_customers_last_month;
	//
	// 			this.cdr.markForCheck();
	// 		}, error => {
	// 			this.isLoadingResults = false;
	// 			this.cdr.markForCheck();
	// 		});
	// }

	prepareOrderStatistics(statistics){
		let orders_statistics = statistics.orders;

		this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
			this.translate.setDefaultLang(event.lang);

			this.prepareOrdersObject(orders_statistics);


		});

		this.prepareOrdersObject(orders_statistics);

	}

	prepareOrdersObject(orders_statistics){

		this.orders_counts = [
			{
				'name': this.translate.instant('STATISTICS.ORDERS.canceled_orders'),
				'value': orders_statistics.canceled_orders_count
			},
			{
				'name': this.translate.instant('STATISTICS.ORDERS.delivered_orders'),
				'value': orders_statistics.delivered_orders_count,
			},
			{
				'name': this.translate.instant('STATISTICS.ORDERS.pending_orders'),
				'value': orders_statistics.pending_orders_count,
			},
		];

		this.orders_prices = [
			{
				'name': this.translate.instant('STATISTICS.ORDERS.canceled_orders'),
				'value': orders_statistics.canceled_orders_total_price
			},
			{
				'name': this.translate.instant('STATISTICS.ORDERS.delivered_orders'),
				'value': orders_statistics.delivered_orders_total_price,
			},
			{
				'name': this.translate.instant('STATISTICS.ORDERS.pending_orders'),
				'value': orders_statistics.pending_orders_total_price,
			},
		];
	}

	onSelect(event) {

	}

	ngOnDestroy(): void {

		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
	}
}
