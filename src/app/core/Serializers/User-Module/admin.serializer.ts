import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {AdminsModel} from '../../models/User-Module/admins.model';


export class AdminSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): AdminsModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: AdminsModel): any {
		if (model.password){
			return {
				'id' : model.id,
				'email' : model.email,
				'is_active' : model.is_active,
				'name' : model.name,
				'password' : model.password,

				'countries' : model.countries,
				'roles' : model.roles,
				'warehouses' : model.warehouses,
			};
		}
		return {
			'id' : model.id,
			'email' : model.email,
			'is_active' : model.is_active,
			'name' : model.name,
			'countries' : model.countries,
			'roles' : model.roles,
			'warehouses' : model.warehouses,
		};
	}

	toFormData(object: any): FormData {
		return null;
	}

	public adapt(item: any): AdminsModel {
		return new AdminsModel(
			item.id,
			item.name,
			item.email,
			item.is_active,
			item.countries,
			item.warehouses,
			item.roles,
		);
	}

	status(status): any {

		return {
			'is_active' : status,
		};
	}

}
