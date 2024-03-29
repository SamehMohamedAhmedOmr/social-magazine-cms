import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {AuthNoticeService} from '../../../../core/services/auth-notice.service';
import {IndexInterface} from '../../../shared/Base-Interface/Index.Interface';
import {InitializeComponentInterface} from '../../../shared/Base-Interface/Initialize.Component.Interface';
import {PaginateParams} from '../../../../core/models/paginateParams.interface';
import {GlobalConfig} from '../../../../core/Global/global.config';
import {HelperService} from '../../../../core/services/helper.service';
import {ClientsService} from '../../../../core/services/Clients-Module/clients.service';

declare var $: any;

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy, IndexInterface, InitializeComponentInterface {

	navigationSubscription;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	//Data table variables
	dataSource;
	displayedColumns: string[] = ['id', 'name', 'admin_email' , 'image', 'expiration_date' ,'is_active' , 'options'];
	isLoadingResults: boolean = true;
	deletedItem = null;
	// pagination variables
	resultsLength = 0;
	pageIndex = 0;
	//filter variables
	headerParams: PaginateParams = {
		active: 1,
		per_page: GlobalConfig.pagination_per_page,
		search_key: null,
		sort_key: null,
		sort_order: null,
		next_page_index: 0,
	};


	constructor(private cdr: ChangeDetectorRef,
				private authNoticeService: AuthNoticeService,
				public service: ClientsService,
				public dialog: MatDialog,
				private router: Router,
				private helper: HelperService) {
		this.navigationSubscription = this.helper.routingSubscribe(this);
	}

	// onInit get Data from api
	ngOnInit() {
		this.initialiseComponent();
	}

	initialiseComponent() {
		this.get(this.headerParams);
	}


	// call api to get Banner Data from the server
	get(headerParams: PaginateParams) {
		this.headerParams = headerParams;
		this.isLoadingResults = true;
		this.service.list(headerParams).subscribe(
			(resp) => {
				this.dataSource = new MatTableDataSource(resp);
				this.dataSource.sort = this.sort;
				this.isLoadingResults = false;
				this.resultsLength = (resp['pagination'] ? resp['pagination'].total : 0);
				this.cdr.markForCheck();
			}, error => {
				this.dataSource = new MatTableDataSource([]);
				this.dataSource.sort = this.sort;
				this.isLoadingResults = false;
				this.cdr.markForCheck();
			});
	}

	// pagination data tables
	public pagination(event?: PageEvent) {
		this.pageIndex = event.pageIndex;
		this.headerParams.next_page_index = this.pageIndex;
		this.get(this.headerParams);
	}

	changeStatus(item){

		let is_active = !item.is_active;

		this.service.changeStatus(item.id, is_active).subscribe(res => {
			this.authNoticeService.setNotice('Status changed successfully', 'success');
			this.get(this.headerParams);
		}, handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
		});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		this.authNoticeService.setNotice(null);
		this.isLoadingResults = false;
		if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}

	}
}
