import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {UsersModel} from '../../models/User-Module/users.model';
import {UsersSerializer} from '../../Serializers/User-Module/users.serializer';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {PaginateParams} from '../../models/paginateParams.interface';

@Injectable({
	providedIn: 'root'
})

export class UsersService extends BaseService<UsersModel> {
	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/users',
			new UsersSerializer());
	}

	public getWithOrders(id: number): Observable<UsersModel> {
		let params = {
			'get_orders': '1',
		};
		return this.http
			.get(`${this.url}${this.endpoint}/${id}`,{
				params:params
			})
			.pipe(map((data: any) => this.serializer.fromJson(data) as UsersModel));
	}

	public listWithAddress(paginationParams : PaginateParams): Observable<[]> {
		let params = {};
		if (paginationParams) {
			if(paginationParams.search_key) { params['search_key'] = paginationParams.search_key; }
			if(paginationParams.active) { params['is_active'] = paginationParams.active; }
			if(paginationParams.per_page) { params['per_page'] = paginationParams.per_page; }
			if(paginationParams.sort_order) { params['sort_order'] = paginationParams.sort_order; }
			if(paginationParams.next_page_index) { params['page'] = paginationParams.next_page_index + 1; }

			params['is_pagination'] = 1;
			params['get_address'] = 1;
		}
		return this.http.get (`${this.url}${this.endpoint}` , {
			params: params
		}).pipe(map((data: any) => this.serializer.fromJsonList(data) as []));
	}

	public list(paginationParams): Observable<[]> {
		let params = {};
		if (paginationParams) {
			if(paginationParams.search_key) { params['search_key'] = paginationParams.search_key; }
			if(paginationParams.active) { params['is_active'] = paginationParams.active; }
			if(paginationParams.per_page) { params['per_page'] = paginationParams.per_page; }
			if(paginationParams.sort_order) { params['sort_order'] = paginationParams.sort_order; }
			if(paginationParams.next_page_index) { params['page'] = paginationParams.next_page_index + 1; }
			if(paginationParams.subscribed_product) { params['subscribed_product'] = paginationParams.subscribed_product}
			params['is_pagination'] = 1;
		}
		return this.http.get (`${this.url}${this.endpoint}` , {
			params: params
		}).pipe(map((data: any) => this.serializer.fromJsonList(data) as []));
	}

}
