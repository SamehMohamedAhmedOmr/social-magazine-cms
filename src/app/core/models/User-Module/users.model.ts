import {ModelBase} from '../Base/base.model';

export class UsersModel extends ModelBase {

	public name:string;
	public email: string;
	public phone: string;
	public password: string;
	public is_active: boolean;
	public addresses:[];
	public attached_address:{};


	constructor(id: number,
				name:string, email:string, phone:string,
				is_active: boolean, addresses:[],
				password:string = null,
				attached_address:any = null) {

		super(id);

		this.name = name;
		this.email = email;
		this.phone = phone;
		this.password = password;

		this.is_active = is_active;
		this.addresses = addresses;

		this.attached_address = attached_address;
	}

	public list() {
		return {
			'id': this.id,

			'name' : this.name,
			'email' : this.email,
			'phone' : this.phone,

			'is_active': this.is_active,

			'addresses' : this.addresses
		};
	}
}
