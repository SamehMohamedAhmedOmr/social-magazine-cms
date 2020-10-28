import {ModelBase} from '../Base/base.model';

export class AddressesModel extends ModelBase {

	public title:string;
	public district: any;
	public district_id: number;
	public district_name:string;
	public country:any;
	public country_id: number;
	public street:string;
	public nearest_landmark:string;
	public address_phone:string;
	public building_no:string;
	public floor_no:string;
	public apartment_no:string;
	public is_active:boolean;
	public user_id:number;


	constructor(id: number,
				title:string,
				district:any, district_id:number, district_name:string,
				country:any, country_id:number,
				street: string, nearest_landmark:string,
				address_phone:string,
				building_no:string, floor_no:string,
				apartment_no:string,
				is_active:boolean,
				user_id:number) {

		super(id);

		this.title = title;

		this.district = district;
		this.district_id = district_id;
		this.district_name = district_name;

		this.country = country;
		this.country_id = country_id;

		this.street = street;
		this.nearest_landmark = nearest_landmark;

		this.address_phone = address_phone;
		this.building_no = building_no;
		this.floor_no = floor_no;
		this.apartment_no = apartment_no;

		this.is_active = is_active;
		this.user_id = user_id;
	}

	public list() {
		return {
			'id': this.id,

			'title' : this.title,

			'district' : this.district,
			'district_id' : this.district_id,
			'district_name' : this.district_name,

			'country': this.country,
			'country_id': this.country_id,

			'street' : this.street,
			'nearest_landmark' : this.nearest_landmark,
			'address_phone' : this.address_phone,
			'building_no' : this.building_no,
			'floor_no' : this.floor_no,
			'apartment_no' : this.apartment_no,

			'is_active' : this.is_active,

			'user_id' : this.user_id,
		};
	}
}
