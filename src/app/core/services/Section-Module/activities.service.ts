import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {ActivitiesModel} from '../../models/section-module/activities.model';
import {ActivitiesSerializer} from '../../Serializers/Section-Module/activities.serializer';

@Injectable({
	providedIn: 'root'
})

export class ActivitiesService extends BaseService<ActivitiesModel> {

	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/activities',
			new ActivitiesSerializer());
	}

}
