import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {AddressesModel} from '../../models/User-Module/addresses.model';
import {AddressesSerializer} from '../../Serializers/User-Module/addresses.serializer';
import {PaginateParams} from '../../models/paginateParams.interface';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})

export class AddressesService extends BaseService<AddressesModel> {
	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/addresses',
			new AddressesSerializer());
	}

	public list(paginationParams : PaginateParams, user_id = null): Observable<[]> {
		let params = {};
		if (paginationParams) {
			if(paginationParams.search_key) { params['search_key'] = paginationParams.search_key; }
			if(paginationParams.active) { params['is_active'] = paginationParams.active; }
			if(paginationParams.per_page) { params['per_page'] = paginationParams.per_page; }
			if(paginationParams.sort_order) { params['sort_order'] = paginationParams.sort_order; }
			if(paginationParams.next_page_index) { params['page'] = paginationParams.next_page_index + 1; }
			params['is_pagination'] = 1;
			params['user_id'] = user_id;
		}
		return this.http.get (`${this.url}${this.endpoint}` , {
			params: params
		}).pipe(map((data: any) => this.serializer.fromJsonList(data) as []));
	}

}
