import {ModelBase} from '../Base/base.model';

export class UsersModel extends ModelBase {

	public first_name:string;
	public family_name:string;
	public email:string;
	public alternative_email:string;
	public password:string;
	public is_active:boolean;

	public gender:{
		id: number,
		name: string,
		key: string
	};

	public title:{
		id: number,
		name: string,
		key: string
	};
	public educational_level:{
		id: number,
		name: string,
		key: string
	};
	public educational_degree:{
		id: number,
		name: string,
		image: string,
		country_code: string
	};
	public country:{
		id: number,
		name: string,
		key: string
	};

	public educational_field:string;
	public university:string;
	public faculty:string;
	public phone_number:string;
	public fax_number:string;
	public address:string;
	public types:{
		id: number,
		name: string,
		key: string
	}[];

	public account_type_id:number;

	constructor(id: number) {
		super(id);
	}

	public list() {
		return {
			'id': this.id,
			'first_name' : this.first_name,
			'family_name' : this.family_name,
			'email' : this.email,
			'alternative_email' : this.alternative_email,
			'is_active' : this.is_active,

			'gender' : (this.gender.name) ? this.gender.name : null,
			'country' : (this.country.name) ? this.country.name : null,
			'title' : (this.title.name) ? this.title.name : null,
			'educational_level' : (this.educational_level.name) ? this.educational_level.name : null,
			'educational_degree' : (this.educational_degree.name) ? this.educational_degree.name : null,

			'educational_field' : this.educational_field,
			'university' : this.university,
			'faculty' : this.faculty,
			'phone_number' : this.phone_number,
			'fax_number' : this.fax_number,
			'address' : this.address,
			'types' : this.types,
			'account_type_id' : this.account_type_id,
		};
	}
}
