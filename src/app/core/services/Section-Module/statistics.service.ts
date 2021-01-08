import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StatisticsSerializer} from '../../Serializers/Section-Module/statistics.serializer';
import {StatisticsModel} from '../../models/section-module/statistics.model';

@Injectable({
	providedIn: 'root'
})

export class StatisticsService {

	private http:HttpClient;
	private endpoint:string;
	private serializer:StatisticsSerializer;
	private url:string;

	constructor(Http: HttpClient) {
		this.http = Http;
		this.url = environment.url();
		this.endpoint = 'admins/statistics';
		this.serializer = new StatisticsSerializer();
	}

	public get(): Observable<StatisticsModel> {
		return this.http
			.get(`${this.url}${this.endpoint}`)
			.pipe(map((data: any) => this.serializer.fromJson(data) as StatisticsModel));
	}

}
