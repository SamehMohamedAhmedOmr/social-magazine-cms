import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {BaseService} from '../../../../core/services/Base/base.service';
import {ModelBase} from '../../../../core/models/Base/base.model';
import {IndexInterface} from '../../Base-Interface/Index.Interface';
import {PaginateParams} from '../../../../core/models/paginateParams.interface';

@Component({
	selector: 'kt-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

	@Input() dataSource;
	@Input() isLoadingResults;
	@Input() currentService : BaseService<ModelBase> = null;
	@Input() currentComponent:IndexInterface = null;
	@Input() headerParams: PaginateParams;
	@Input() content_name;
	@Input() displayedColumns;
	@Input() resultsLength;
	@Input() pageIndex;

	constructor() {
	}

	ngOnInit() {
	}

	displayContent(text){
		return (text.length > 70) ? text.substring(0, 70) + ' ......' : text;
	}

	// pagination data tables
	public pagination (event?:PageEvent) {
		this.pageIndex = event.pageIndex;
		this.headerParams.next_page_index = this.pageIndex;
		this.currentComponent.get(this.headerParams);
	}

}
