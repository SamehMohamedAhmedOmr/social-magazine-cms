import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {AdminSerializer} from '../../Serializers/User-Module/admin.serializer';
import {AdminsModel} from '../../models/User-Module/admins.model';

@Injectable({
	providedIn: 'root'
})

export class AdminsService extends BaseService<AdminsModel> {
	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/admins',
			new AdminSerializer());
	}

}
