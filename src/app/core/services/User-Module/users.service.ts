import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {UsersModel} from '../../models/User-Module/users.model';
import {UsersSerializer} from '../../Serializers/User-Module/users.serializer';

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

}
