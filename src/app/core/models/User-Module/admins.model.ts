import {ModelBase} from '../Base/base.model';

export class AdminsModel extends ModelBase {

	public name:string;
	public email: string;
	public password: string;
	public is_active: boolean;

	public countries:[];
	public roles:[];
	public warehouses:[];

	public countries_length : number;
	public roles_length : number;

	constructor(id: number,
				name:string, email:string, is_active: boolean,
				countries:[], warehouses:[], roles:[],
				password:string = null) {

		super(id);

		this.name = name;
		this.email = email;
		this.is_active = is_active;

		this.password = password;


		this.countries = countries;
		this.warehouses = warehouses;
		this.roles = roles;

		this.roles_length = roles.length;
		this.countries_length = countries.length;
	}

	public list() {
		return {
			'id': this.id,

			'name' : this.name,
			'email' : this.email,

			'is_active': this.is_active,

			'roles_length' : this.roles_length,
			'countries_length' : this.countries_length,

		};
	}
}
