import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {UsersModel} from '../../models/User-Module/users.model';


export class UsersSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): UsersModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: UsersModel): any {
		let user_object = {
			'id' : model.id,
			'phone' : model.phone,
			'email' : model.email,
			'name' : model.name,
		};

		if (model.password){
			user_object['password'] = model.password;
		}

		if (model.attached_address){
			user_object['address'] = model.attached_address;
		}

		return user_object;
	}

	toFormData(object: any): FormData {
		return null;
	}

	public adapt(item: any): UsersModel {
		return new UsersModel(
			item.id,
			item.name,
			item.email,
			item.phone,
			item.is_active,
			item.addresses
		);
	}

	status(status): any {

		return {
			'is_active' : status,
		};
	}

}
