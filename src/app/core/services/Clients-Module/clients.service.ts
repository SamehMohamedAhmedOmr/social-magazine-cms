import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ClientsSerializer} from '../../Serializers/Clients-Module/clients.serializer';
import {ClientsModel} from '../../models/Clients-Module/clients.model';


@Injectable({
	providedIn: 'root'
})

export class ClientsService {
	private http: HttpClient;
	public url:string;
	public endpoint:string;
	public serializer:ClientsSerializer;

	constructor(Http: HttpClient) {
		this.http = Http;
		this.url = environment.url();
		this.endpoint = 'projects';
		this.serializer = new ClientsSerializer();
	}


	public get(id: number): Observable<ClientsModel> {
		return this.http
			.get(`${this.url}${this.endpoint}/${id}`,{
				headers: {
					'Accept-Language': 'all',
				}
			})
			.pipe(map((data: any) => this.serializer.fromJson(data) as ClientsModel));
	}

	public show(id: number): Observable<ClientsModel> {
		return this.http
			.get(`${this.url}${this.endpoint}/${id}`)
			.pipe(map((data: any) => this.serializer.fromJson(data) as ClientsModel));
	}

	public list(paginationParams): Observable<[]> {
		let params = {};
		if (paginationParams) {
			if(paginationParams.search_key) { params['name'] = paginationParams.search_key; }
			if(paginationParams.active) { params['active'] = paginationParams.active; }
			if(paginationParams.per_page) { params['perPage'] = paginationParams.per_page; }
			if(paginationParams.sort_order) { params['sortBy'] = paginationParams.sort_order; }
			if(paginationParams.next_page_index) { params['page'] = paginationParams.next_page_index + 1; }
			params['is_pagination'] = 1;
		}
		return this.http.get (`${this.url}${this.endpoint}` , {
			params: params
		}).pipe(map((data: any) => this.serializer.fromJsonList(data) as []));
	}

	public create(item: ClientsModel): Observable<ClientsModel> {
		return this.http
			.post<ClientsModel>(`${this.url}install`, this.serializer.toJson(item))
			.pipe(map(data => this.serializer.fromJson(data) as ClientsModel));
	}

	public update(id:number, item: ClientsModel): Observable<ClientsModel> {
		return this.http
			.post<ClientsModel>(`${this.url}${this.endpoint}/${id}`+'?_method=PATCH',
				this.serializer.toJsonUpdate(item))
			.pipe(map(data => this.serializer.fromJson(data) as ClientsModel));
	}

	public changeStatus(id:number, status): Observable<ClientsModel> {
		return this.http
			.post<ClientsModel>(`${this.url}${this.endpoint}/${id}`+'?_method=PATCH',
				this.serializer.status(status))
			.pipe(map(data => this.serializer.fromJson(data) as ClientsModel));
	}

	public updateFormData(id: number,item : any): Observable<any> {
		return this.http
			.post<ClientsModel>(`${this.url}${this.endpoint}/${id}`+'?_method=PATCH',
				this.serializer.toFormData(item))
			.pipe(map(data => this.serializer.fromJson(data) as ClientsModel));
	}

	public prepareObject(languages) {
		let titles = {};
		let descriptions = {};
		let messages = {};

		let object_languages = [];
		languages.forEach((object, index) => {
			let lang = (object.controls['lang'].value == 'English') ? 'en' : 'ar';
			let title = object.controls['title'].value;
			let description = object.controls['description'].value;
			let message = object.controls['message'].value;

			if (title){
				titles[lang] = title;
			}

			if (description){
				descriptions[lang] = description;
			}

			if (message){
				messages[lang] = message;
			}

		});

		object_languages['titles'] = titles;
		object_languages['descriptions'] = descriptions;
		object_languages['messages'] = messages;

		return object_languages;
	}
}
