import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BaseService} from '../Base/base.service';
import {environment} from '../../../../environments/environment';
import {MagazineInformationModel} from '../../models/section-module/magazine.information.model';
import {MagazineInformationSerializer} from '../../Serializers/Section-Module/magazine.information.serializer';

@Injectable({
	providedIn: 'root'
})

export class MagazineInformationService extends BaseService<MagazineInformationModel> {

	constructor(Http: HttpClient) {
		super(
			Http,
			environment.url(),
			'admins/magazine-information',
			new MagazineInformationSerializer());
	}

}
