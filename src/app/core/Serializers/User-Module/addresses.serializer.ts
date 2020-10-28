import {BaseSerializer} from '../Base/Base.serializer';
import {Serializer} from '../Base/Serializer';
import {AddressesModel} from '../../models/User-Module/addresses.model';


export class AddressesSerializer extends BaseSerializer implements Serializer {

	fromJson(json: any): AddressesModel {
		return this.adapt(json.body);
	}

	fromJsonList(json: any): [] {
		return this.adaptList(json.body, json.pagination);
	}

	toJson(model: AddressesModel): any {
		return {
			'id' : model.id,

			'user_id' : model.user_id,

			'street' : model.street,
			'title' : model.title,

			'district_id' : model.district_id,

			'nearest_landmark' : model.nearest_landmark,
			'address_phone' : model.address_phone,
			'building_no' : model.building_no,
			'floor_no' : model.floor_no,
			'apartment_no' : model.apartment_no,
		};
	}

	toFormData(object: any): FormData {
		return null;
	}

	public adapt(item: any): AddressesModel {

		let district_id = (item.district) ? item.district.id : '';
		let district_name = (item.district) ? item.district.name : '';

		let country_id = (item.country) ? item.country.id : '';

		return new AddressesModel(
			item.id,
			item.title,
			item.district,

			district_id,
			district_name,

			item.country,
			country_id,

			item.street,
			item.nearest_landmark,
			item.address_phone,
			item.building_no,
			item.floor_no,
			item.apartment_no,
			item.is_active,
			item.user_id
		);
	}

	status(status): any {

		return {
			'is_active' : status,
		};
	}

}
