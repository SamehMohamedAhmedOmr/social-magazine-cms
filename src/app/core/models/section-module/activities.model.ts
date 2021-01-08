import {ModelBase} from '../Base/base.model';

export class ActivitiesModel extends ModelBase {

	public content:string;
	public title:string;
	public slug:string;
	public images:[];
	public is_active:boolean;

	constructor(id: number) {
		super(id);
	}

	public list() {
		return {
			'id': this.id,
			'title' : this.title,
			'slug' : this.slug,
			'content' : this.content,
			'images' : this.images,
			'is_active' : this.is_active,
		};
	}


}
