import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {ProfileModel} from '../../models/User-Module/profile.model';
import {ProfileSerializer} from '../../Serializers/User-Module/profile.serializer';

@Injectable({
	providedIn: 'root'
})

export class ProfileService extends BaseService<ProfileModel> {

	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/profile',
			new ProfileSerializer());
	}

}
