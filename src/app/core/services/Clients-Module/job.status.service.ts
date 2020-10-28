import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JobStatusModel} from '../../models/Clients-Module/job.status.model';
import {JobStatusSerializer} from '../../Serializers/Clients-Module/job.status.serializer';

@Injectable({
	providedIn: 'root'
})

export class JobStatusService {

	private http:HttpClient;
	private url:string;
	private endpoint:string;
	private serializer:JobStatusSerializer;


	constructor(Http: HttpClient) {
		this.http = Http;
		this.url = environment.url();
		this.endpoint = 'jobStatuses';
		this.serializer = new JobStatusSerializer();
	}

	public get(id: number): Observable<JobStatusModel> {
		return this.http
			.get(`${this.url}${this.endpoint}/${id}`)
			.pipe(map((data: any) => this.serializer.fromJson(data) as JobStatusModel));
	}

}
