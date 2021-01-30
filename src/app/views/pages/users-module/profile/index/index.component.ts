import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'kt-index',
	templateUrl: './index.component.html',
	styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

	content_name: string;

	constructor(public translateService : TranslateService) {
	}

	ngOnInit() {
		this.content_name = this.translateService.instant('Components.USERS.profile');
	}

}
