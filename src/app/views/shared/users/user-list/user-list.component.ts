import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {IndexInterface} from '../../Base-Interface/Index.Interface';
import {PaginateParams} from '../../../../core/models/paginateParams.interface';
import {UsersService} from '../../../../core/services/User-Module/users.service';
import {AuthNoticeService} from '../../../../core/services/auth-notice.service';
import {TranslateService} from '@ngx-translate/core';
import {HelperService} from '../../../../core/services/helper.service';
import {UsersTypesService} from '../../../../core/services/User-Module/users-types.service';

@Component({
	selector: 'kt-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

	@Input() dataSource;
	@Input() isLoadingResults;
	@Input() currentService : UsersService;
	@Input() currentComponent:IndexInterface = null;
	@Input() headerParams: PaginateParams;
	@Input() content_name;
	@Input() displayedColumns;
	@Input() resultsLength;
	@Input() pageIndex;
	@Input() current_type = 0;

	// user_types: [] = [];

	@Output() pageIndexEvent = new EventEmitter<number>();

	constructor(private authNoticeService: AuthNoticeService,
				public translateService : TranslateService,
				private usersTypesService: UsersTypesService,
				private cdr: ChangeDetectorRef,
				private helper: HelperService) {
	}

	ngOnInit() {
	}


	displayContent(text){
		return (text.length > 70) ? text.substring(0, 70) + ' ......' : text;
	}

	changeUserType(item, new_type_id, type){
		console.log('here', item, new_type_id, type);
		this.currentService.changeUserType(item.id, new_type_id).subscribe(res => {
			this.authNoticeService.setNotice(this.translateService.instant('Components.USERS.change_type',
				{name: type}),
				'success');
			this.currentComponent.get(this.headerParams);
		}, handler => {
			this.authNoticeService.setNotice(this.helper.showingErrors(handler.error), 'danger');
		});
	}

	// pagination data tables
	public pagination (event?:PageEvent) {
		this.pageIndex = event.pageIndex;
		this.pageIndexEvent.emit(event.pageIndex)
		this.headerParams.next_page_index = this.pageIndex;
		this.currentComponent.get(this.headerParams);
	}


	getTargetTypeName(user_type){
		return (user_type) ?  'ادمن' : 'مشرف';
	}

	getTargetTypeKey(user_type){
		return (user_type) ? 0 : 1;
	}

}
